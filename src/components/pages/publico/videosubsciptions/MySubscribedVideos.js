import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videoSubToken } from '../../../../redux/actions/videoSubscriptionAction';
import { watchVideos } from '../../../../redux/actions/publicAction';
import Home from '../Home';



export default function MySubscribedVideos() {
    const storedTokens = JSON.parse(localStorage.getItem('videoSubscriptions')) || [];

    if(!storedTokens) {
  
      return(<>
      <Home />
      
      </>)
    }
  
console.log(storedTokens)

  return (
    <>
    <div className='text-center'>
      <h2>My Subscribed Videos</h2>
      {storedTokens.length > 0 ? (
        <ul style={{ listStyle: 'none' }}>
          {storedTokens.map((token, index) => (
            <li key={index}>
              <VideoName tokenId={token.token} /> {/* Pass the token to the component */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No active subscriptions.</p>
      )}
    </div>

    </>
  )
}



const VideoName = ({ tokenId }) => {
    const dispatch = useDispatch();
    const item = useSelector((state) => state.vidSubRdcr.item);
  
    useEffect(() => {
      const fetchItem = async () => {
        try {
          await dispatch(videoSubToken(tokenId)); // Fetch item by token
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchItem();
    }, [dispatch, tokenId]);
  
    if (!item) {
      return null; 
    }
  

    const [_, videoId] = tokenId.split('-'); 
  
    return <IssueName item={item} videoId={videoId} tokenId={tokenId} />;
  };
  
  const IssueName = ({ item, videoId, tokenId }) => {
    const videos = useSelector((state) => state.publicRdcr.videos);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          await dispatch(watchVideos()); // Fetch all magazines
        } catch (error) {
          console.error(error);
        }
      };
  
      if (!videos || videos.length === 0) {
        fetchVideos();
      }
    }, [dispatch, videos]);
  
    if (!videos || videos.length === 0) {
      return <p>Loading magazines...</p>; 
    }
  
    // Find the magazine using the magazine ID extracted from the token
    const singleVideo = videos.find((video) => video._id === videoId);
  
    if (!singleVideo) {
      return <p>No matching issue found for this magazine.</p>;
    }
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', margin: "3rem" }}>
      <video
          src={singleVideo.videoLink} 
           
          style={{ width: '300px', height: 'auto', marginRight: '10px' }} 
      />
      <a href={`/subscribed_video/${tokenId}`}>
          {singleVideo.videoName}
      </a>
  </div>
  
      
    );
  };
  