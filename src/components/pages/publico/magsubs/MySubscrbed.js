import React, { useEffect, useState } from 'react';
import Home from '../Home';
import { fetchAllMags, UserSubdMagByToken } from '../../../../helpers/articlesHelpers/MagazinesFetch';

export default function MySubscribed() {
  const storedTokens = JSON.parse(localStorage.getItem('subscriptions')) || [];

  if(!storedTokens) {

    return(<>
    <Home />
    
    </>)
  }

  return (
    <div className='text-center'>
      <h2>My Subscribed Magazines</h2>
      {storedTokens.length > 0 ? (
        <ul style={{ listStyle: 'none' }}>
          {storedTokens.map((token, index) => (
            <li key={index}>
              <MagazineName tokenId={token.token} /> {/* Pass the token to the component */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No active subscriptions.</p>
      )}
    </div>
  );
}

const MagazineName = ({ tokenId }) => {

  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      try {
       const data = await UserSubdMagByToken(tokenId)
       if(data && !data.error) {
        setItem(data?.item)
       }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [tokenId]);

  if (!item) {
    return null; // Render nothing if item isn't ready
  }


  const [_, magazineId] = tokenId.split('-'); 

  return <IssueName item={item} magazineId={magazineId} tokenId={tokenId} />;
};

const IssueName = ({ item, magazineId, tokenId }) => {
  const [magIssues, setMagIssues] = useState([]);
  

  useEffect(() => {
    const fetchMags = async () => {
      try {
       const data = await fetchAllMags()
 
       if(data && !data.error) {
        setMagIssues(data?.magIssues)
       }

      } catch (error) {
        console.error(error);
      }
    };

    if (!magIssues || magIssues.length === 0) {
      fetchMags();
    }
  }, [magIssues]);

  if (!magIssues || magIssues.length === 0) {
    return(<>
    <div className=" text-center spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>
    
    </>) 
  }

  // Find the magazine using the magazine ID extracted from the token
  const singleIssue = magIssues.find((magazine) => magazine._id === magazineId);

  if (!singleIssue) {
    return <p>No matching issue found for this magazine.</p>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: "3rem" }}>
    <img
        src={singleIssue.magazinePhoto} 
        alt={singleIssue.magazineIssue} 
        style={{ width: '50px', height: 'auto', marginRight: '10px' }} 
    />
    <a href={`/subscribed_magazine/${tokenId}`}>
        {singleIssue.magazineIssue}
    </a>
</div>

    
  );
};
