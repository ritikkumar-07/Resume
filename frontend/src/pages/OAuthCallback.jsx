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
      const hashParams = new URLSearchParams(
        window.location.hash.substring(1)
      );

      const token = hashParams.get('token');

      if (!token) {
        navigate('/login?error=oauth', {
          replace: true
        });

        return;
      }

      const result = await completeOAuthLogin(token);

      if (result.success) {
        // Remove token from browser URL
        window.history.replaceState(
          {},
          document.title,
          '/auth/callback'
        );

        navigate('/dashboard', {
          replace: true
        });
      } else {
        navigate('/login?error=oauth', {
          replace: true
        });
      }
    };

    finishLogin();
  }, [completeOAuthLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-cream-900">
          Completing sign in...
        </h2>

        <p className="text-sm text-cream-700 mt-2">
          Please wait while we securely sign you in.
        </p>
      </div>
    </div>
  );
}