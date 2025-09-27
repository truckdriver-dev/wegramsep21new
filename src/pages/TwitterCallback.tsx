import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TwitterCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing Twitter authentication...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have a JWT token in the URL or cookies
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
          // Store the token
          localStorage.setItem('wegram_jwt_token', token);
          setStatus('Authentication successful! Redirecting...');
          
          // Redirect to home page
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else {
          // Check for error in URL
          const error = urlParams.get('error');
          if (error) {
            setError(`Authentication failed: ${error}`);
            setStatus('Authentication failed.');
          } else {
            setError('No authentication token received');
            setStatus('Authentication failed.');
          }
        }
      } catch (err) {
        setError('An unexpected error occurred during authentication.');
        setStatus('Authentication failed.');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="card p-8 text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <div className="w-8 h-8 text-white font-bold text-xl">𝕏</div>
        </div>
        
        <h2 className="text-2xl font-bold text-primary mb-4">Twitter Authentication</h2>
        <p className="text-secondary mb-6">{status}</p>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg mb-6">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}
        
        <button
          onClick={() => navigate('/auth')}
          className="btn-primary px-6 py-3 rounded-full font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};
