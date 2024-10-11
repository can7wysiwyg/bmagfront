import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubTokenCheck() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if there are any tokens in localStorage
    const storedTokens = JSON.parse(localStorage.getItem('subscriptions')) || [];
    
    const currentDateTime = new Date().getTime(); // Get the current timestamp in milliseconds

    // Filter out expired tokens and store valid tokens
    const validTokens = storedTokens.filter(token => {
      const tokenExpiration = new Date(token.expiresAt).getTime(); // Convert expiresAt to timestamp
      return tokenExpiration > currentDateTime; // Keep only valid tokens
    });

    // Update localStorage with only valid tokens
    localStorage.setItem('subscriptions', JSON.stringify(validTokens));

    // Set hasToken to true if any valid tokens exist
    setHasToken(validTokens.length > 0);
  }, []);

  return (
    <div>
      {hasToken ? (
        <Link className="nav-link" to="/my_subscribed_magazines">Read Your Magazine</Link> // Replace with your actual route
      ) : (
        ""
      )}
    </div>
  );
}
