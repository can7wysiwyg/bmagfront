import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findByTok } from '../../../../redux/actions/subscriptionAction';
import { magShowAll } from '../../../../redux/actions/magazineAction';
import Home from '../Home';

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
  const dispatch = useDispatch();
  const item = useSelector((state) => state.subRdcr.item);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        await dispatch(findByTok(tokenId)); // Fetch item by token
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [dispatch, tokenId]);

  if (!item) {
    return null; // Render nothing if item isn't ready
  }

  // Split the token to get the magazine ID
  const [_, magazineId] = tokenId.split('-'); // Assuming token is structured as described

  return <IssueName item={item} magazineId={magazineId} tokenId={tokenId} />;
};

const IssueName = ({ item, magazineId, tokenId }) => {
  const magIssues = useSelector((state) => state.magRdcr.magIssues);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMags = async () => {
      try {
        await dispatch(magShowAll()); // Fetch all magazines
      } catch (error) {
        console.error(error);
      }
    };

    if (!magIssues || magIssues.length === 0) {
      fetchMags();
    }
  }, [dispatch, magIssues]);

  if (!magIssues || magIssues.length === 0) {
    return <p>Loading magazines...</p>; 
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
