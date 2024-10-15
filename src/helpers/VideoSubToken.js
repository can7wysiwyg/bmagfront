import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function VideoSubToken() {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
      
      const storedTokens = JSON.parse(localStorage.getItem('videoSubscriptions')) || [];
      
      const currentDateTime = new Date().getTime(); 
  
      
      const validTokens = storedTokens.filter(token => {
        const tokenExpiration = new Date(token.expiresAt).getTime(); 
        return tokenExpiration > currentDateTime; 
      });
  
      
      localStorage.setItem('videoSubscriptions', JSON.stringify(validTokens));
  
      
      setHasToken(validTokens.length > 0);
    }, []);
  

  return (
    <>

{hasToken ? (
        <Link className="nav-link" to="/watch_my_subscribed_videos">SUBSCRIBED VIDEOS</Link> 
      ) : (
        ""
      )}
    
    
    </>
  )
}
