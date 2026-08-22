import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function OAuthCallback() {

  const navigate = useNavigate();

  const completeOAuthLogin = useAuthStore(
    (state) => state.completeOAuthLogin
  );


  useEffect(() => {

    const finishLogin = async () => {

      console.log('OAuth callback started');

      const hash = window.location.hash;

      console.log('OAuth hash:', hash);

      const hashParams = new URLSearchParams(
        hash.replace('#', '')
      );

      const token = hashParams.get('token');


      // No token received
      if (!token) {

        console.error('OAuth token not found');

        navigate('/login?error=oauth', {
          replace: true
        });

        return;
      }


      console.log('OAuth token received');


      // Save token and verify user
      const result = await completeOAuthLogin(token);


      if (result.success) {

        console.log('OAuth login successful');


        // Remove JWT token from URL
        window.history.replaceState(
          {},
          document.title,
          '/auth/callback'
        );


        // Redirect only after authentication is successful
        navigate('/dashboard', {
          replace: true
        });

      } else {

        console.error('OAuth authentication failed');

        localStorage.removeItem('accessToken');

        navigate('/login?error=oauth', {
          replace: true
        });

      }

    };


    finishLogin();

  }, [navigate, completeOAuthLogin]);


  return (

    <div className="min-h-screen flex items-center justify-center bg-cream-50">

      <div className="text-center">

        <h2 className="text-xl font-semibold text-cream-900">
          Completing Google Sign In...
        </h2>

        <p className="text-sm text-cream-700 mt-2">
          Please wait...
        </p>

      </div>

    </div>

  );
}