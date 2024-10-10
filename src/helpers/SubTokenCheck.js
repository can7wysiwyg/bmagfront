import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SubTokenCheck() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if there are any tokens in localStorage
    const storedTokens = JSON.parse(localStorage.getItem('subscriptions')) || [];
    setHasToken(storedTokens.length > 0); // Set to true if any tokens exist
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
