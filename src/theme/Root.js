import React from 'react';

// Default wrapper component
export default function Root({ children }) {
  // Secure Login feature has been disabled per user request.
  // To re-enable, implement the authentication UI here.
  return <>{children}</>;
}
