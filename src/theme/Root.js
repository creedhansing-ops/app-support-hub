import React, { useState, useEffect } from 'react';

export default function Root({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Periksa token di localStorage saat komponen dimuat
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('support_docs_auth');
    if (token === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin@Dolphin123!') {
      localStorage.setItem('support_docs_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Kata sandi salah. Silakan coba lagi.');
    }
  };

  // Selama SSR (build static) dan render pertama di client, 
  // kita HARUS merender children agar plugin search bisa membaca kontennya.
  // Namun kita sembunyikan dengan CSS agar tidak terlihat sebelum dicek.
  if (!isMounted) {
    return <div style={{ display: 'none' }}>{children}</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>SupportDocs Hub</h1>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Masukkan kata sandi untuk mengakses dokumentasi internal.</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kata sandi"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'left' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
