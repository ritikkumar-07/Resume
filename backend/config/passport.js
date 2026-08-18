const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google Auth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:5001/api/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value || null,
      };

      return done(null, user);
    }
  )
);

// Microsoft Auth Strategy
// passport.use(new OIDCStrategy({
//     identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
//     clientID: process.env.MICROSOFT_CLIENT_ID,
//     clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
//     responseType: 'code',
//     responseMode: 'query',
//     redirectUrl: 'http://localhost:5000/api/auth/microsoft/callback',
//     allowHttpForRedirectUrl: true,
//     scope: ['profile', 'email', 'openid']
//   },
//   (iss, sub, profile, accessToken, refreshToken, done) => {
//     const user = {
//       id: profile.oid,
//       name: profile.displayName,
//       email: profile._json.email || profile._json.preferred_username,
//       avatar: null
//     };
//     return done(null, user);
//   }
// ));