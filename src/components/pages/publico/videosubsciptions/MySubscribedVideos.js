import React, { useEffect, useState } from 'react';
import Home from '../Home';
import { fetchAllVideos, fetchVideosBySubToken } from '../../../../helpers/articlesHelpers/VideosFetch';



export default function MySubscribedVideos() {
    const storedTokens = JSON.parse(localStorage.getItem('videoSubscriptions')) || [];

    if(!storedTokens) {
  
      return(<>
      <Home />
      
      </>)
    }
  


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
    
    const [item, setItem] = useState({});
  
    useEffect(() => {
      const fetchItem = async () => {
        try {
         const subItem = await fetchVideosBySubToken(tokenId)
         if(subItem && !subItem.error) {
          setItem(subItem?.item)
         }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchItem();
    }, [tokenId]);
  
    if (!item) {
      return null; 
    }
  

    const [_, videoId] = tokenId.split('-'); 
  
    return <IssueName item={item} videoId={videoId} tokenId={tokenId} />;
  };
  
  const IssueName = ({ item, videoId, tokenId }) => {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
      const fetchVideos = async () => {
        try {
        const allvideos = await fetchAllVideos()


        if(allvideos && !allvideos.error) {
          setVideos(allvideos?.videos)
        }

        } catch (error) {
          console.error(error);
        }
      };
  
      if (!videos || videos.length === 0) {
        fetchVideos();
      }
    }, [videos]);
  
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
  