import React from 'react';

export default function MySubscribed() {

  const storedTokens = JSON.parse(localStorage.getItem('subscriptions')) || [];

  return (
    <div className='text-center'>
      <h2>My Subscribed Magazines</h2>
      {storedTokens.length > 0 ? (
        <ul style={{
          listStyle: "none"  
        }}>
          {storedTokens.map((token, index) => (
            <li key={index}>
              
              <MagazineName tokenId={token.token} />
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No active subscriptions.</p>
      )}
    </div>
  );
}


const MagazineName = ({tokenId}) => {

    return(<>
    
    
    
    
    </>)

}