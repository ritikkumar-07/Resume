const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { jwtVerify, createRemoteJWKSet } = require('jose');
const prisma = require('../prismaClient');

// Google OAuth Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to issue tokens and session cookies
const issueTokensAndSession = async (user, res, rememberMe = true) => {
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: rememberMe ? '30d' : '1d'
  });

  const sessionExpiresAt = new Date(
    Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
  );

  await prisma.session.create({
    data: {
      userId: user.id,
      tokenHash: await bcrypt.hash(refreshToken, 10),
      expiresAt: sessionExpiresAt
    }
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
  });

  return { accessToken, refreshToken };
};

// Helper for unified OAuth user linking and login
const handleOAuthLogin = async ({ provider, providerAccountId, email, name, avatar, res, redirectUrl }) => {
  if (!provider || !providerAccountId || !email) {
    return res.status(400).json({
      success: false,
      message: 'Incomplete OAuth account information from provider'
    });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedAccountId = String(providerAccountId).trim();

  // 1. Check if OAuth account already exists
  let oauthAccount = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId: normalizedAccountId
      }
    },
    include: {
      user: true
    }
  });

  let user;

  if (oauthAccount) {
    user = oauthAccount.user;
  } else {
    // 2. Check if user with same verified email exists
    let existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      // Safely link OAuth account to existing user
      await prisma.oAuthAccount.create({
        data: {
          userId: existingUser.id,
          provider,
          providerAccountId: normalizedAccountId
        }
      });
      user = existingUser;
    } else {
      // 3. Create a new User and OAuthAccount
      let baseUsername = normalizedEmail.split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '');
      if (!baseUsername) baseUsername = 'user';

      let username = baseUsername;
      let counter = 1;
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user = await prisma.user.create({
        data: {
          name: name || 'User',
          username,
          email: normalizedEmail,
          avatar: avatar || null,
          passwordHash: null,
          accounts: {
            create: {
              provider,
              providerAccountId: normalizedAccountId
            }
          }
        }
      });
    }
  }

  await issueTokensAndSession(user, res, true);

  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }
  });
};

const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, username, email, passwordHash }
    });

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  const { identifier, password, rememberMe } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }]
      }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.passwordHash) {
      return res.status(400).json({
        success: false,
        message: 'This account uses social login. Please continue with Google or Microsoft.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    await issueTokensAndSession(user, res, !!rememberMe);

    res.json({
      success: true,
      user: { id: user.id, name: user.name, username: user.username, email: user.email, avatar: user.avatar }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if (decoded?.id) {
          await prisma.session.updateMany({
            where: {
              userId: decoded.id,
              revokedAt: null
            },
            data: {
              revokedAt: new Date()
            }
          });
        }
      } catch (err) {
        // Token might be expired, proceed with clearing cookies
      }
    }
  } catch (error) {
    console.error('Logout session cleanup error:', error);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
};

const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, username: true, email: true, avatar: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

const googleAuth = async (req, res) => {
  const { credential, accessToken } = req.body;

  if (!credential && !accessToken) {
    return res.status(400).json({
      success: false,
      message: 'Google credential or access token is required'
    });
  }

  try {
    let googleUser = null;

    if (credential) {
      // Verify Google ID Token
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID || undefined
        });
        const payload = ticket.getPayload();
        if (payload && payload.sub && payload.email) {
          googleUser = {
            sub: payload.sub,
            email: payload.email,
            email_verified: payload.email_verified,
            name: payload.name,
            picture: payload.picture
          };
        }
      } catch (verifyErr) {
        // Fallback: Verify with Google tokeninfo endpoint
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (response.ok) {
          const payload = await response.json();
          if (payload && payload.sub && payload.email) {
            googleUser = {
              sub: payload.sub,
              email: payload.email,
              email_verified: payload.email_verified === 'true' || payload.email_verified === true,
              name: payload.name,
              picture: payload.picture
            };
          }
        }
      }
    } else if (accessToken) {
      // Verify with Google userinfo API
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (response.ok) {
        const payload = await response.json();
        if (payload && payload.sub && payload.email) {
          googleUser = {
            sub: payload.sub,
            email: payload.email,
            email_verified: payload.email_verified,
            name: payload.name,
            picture: payload.picture
          };
        }
      }
    }

    if (!googleUser || !googleUser.sub || !googleUser.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Google credential or token'
      });
    }

    if (googleUser.email_verified === false) {
      return res.status(400).json({
        success: false,
        message: 'Google email address is not verified'
      });
    }

    await handleOAuthLogin({
      provider: 'google',
      providerAccountId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      res
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during Google authentication'
    });
  }
};

const microsoftAuth = async (req, res) => {
  const { accessToken, idToken } = req.body;

  if (!accessToken && !idToken) {
    return res.status(400).json({
      success: false,
      message: 'Microsoft access token or ID token is required'
    });
  }

  try {
    let msUser = null;

    if (accessToken) {
      // Verify and fetch user info via Microsoft Graph API
      const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (graphResponse.ok) {
        const data = await graphResponse.json();
        if (data && data.id && (data.mail || data.userPrincipalName)) {
          msUser = {
            id: data.id,
            email: data.mail || data.userPrincipalName,
            name: data.displayName || 'Microsoft User'
          };
        }
      }
    }

    if (!msUser && idToken) {
      // Verify ID token using Microsoft's JWKS
      try {
        const jwksUri = 'https://login.microsoftonline.com/common/discovery/v2.0/keys';
        const JWKS = createRemoteJWKSet(new URL(jwksUri));
        const { payload } = await jwtVerify(idToken, JWKS, {
          issuer: 'https://login.microsoftonline.com/common/v2.0',
          audience: process.env.MICROSOFT_CLIENT_ID
        });

        if (payload && (payload.oid || payload.sub) && (payload.email || payload.preferred_username || payload.upn)) {
          msUser = {
            id: payload.oid || payload.sub,
            email: payload.email || payload.preferred_username || payload.upn,
            name: payload.name || 'Microsoft User'
          };
        }
      } catch (verifyErr) {
        console.error('Microsoft ID token verification error:', verifyErr);
      }
    }

    if (!msUser || !msUser.id || !msUser.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Microsoft token or unable to retrieve profile'
      });
    }

    await handleOAuthLogin({
      provider: 'microsoft',
      providerAccountId: msUser.id,
      email: msUser.email,
      name: msUser.name,
      avatar: null,
      res
    });
  } catch (error) {
    console.error('Microsoft Auth Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during Microsoft authentication'
    });
  }
};

module.exports = { register, login, logout, me, googleAuth, microsoftAuth, handleOAuthLogin };
