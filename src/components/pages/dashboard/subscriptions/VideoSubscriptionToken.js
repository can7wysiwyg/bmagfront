import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ApiUrl } from '../../../../helpers/ApiUrl'
import { bmagtoken } from '../../../../helpers/Bmag'
import { fetchSingleVideo } from '../../../../helpers/articlesHelpers/VideosFetch'



export default function VideoSubscriptionToken() {
    const {id} = useParams()
    const [subscribedVideo, setSubscribedVideo] = useState({})
    const [generatedToken, setGeneratedToken] = useState(null);
    
    
    useEffect(() => {
        const fetchSub = async () => {
            
            const response = await axios.get(`${ApiUrl}/video_subscription_single/${id}`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            setSubscribedVideo(response.data.subscribedVideo)
        };

        fetchSub();
    }, [id]);

    

    const handleGenerateToken = async () => {
        const transactionId = subscribedVideo.transactionId; 
        


        const response = await axios.post(`${ApiUrl}/video_sub_generate_token`, { transactionId, videoId: subscribedVideo.videoId }, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })
        setGeneratedToken(response.data); 
            
        
               
    };

    if (!subscribedVideo) {
        return (
            <>
                <h4 className='text-center'>The subscription is loading...</h4>
            </>
        );
    }



  return (
    <>
    <div className="container mt-4">
            <h3 className='text-center'>Video Subscriber Details</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Video Name: <VideoName sub={subscribedVideo.videoId} /></h5>
                    <p className="card-text">Subscription ID: {subscribedVideo._id}</p>
                    <p className="card-text">Subscriber Name: {subscribedVideo.username}</p>
                    <p className="card-text">Subscriber Email: {subscribedVideo.email}</p>
                    <p className="card-text">Subscriber Phone Number: {subscribedVideo.phonenumber}</p>
                    
                    

                    <button onClick={handleGenerateToken} className="btn btn-primary">Generate Token</button>
                </div>
            </div>

             {generatedToken && (
                <div className="card">
                    <div className="card-body">
                        
                        <h5 className="card-title">Generated Token</h5>
                        <h6 className="card-title" >email and text user the token</h6>
                        <p className="card-text">Token: {generatedToken.token}</p>
                        <p className="card-text">Expires At: {new Date(generatedToken.expiresAt).toLocaleString()}</p>
                        <p className="card-text">Video ID: {generatedToken.videoId}</p>
                    </div>
                </div>
            )}
        </div>
     
    
    
    
    </>
  )
}


const VideoName = ({sub}) => {

    
    const [video, setVideo] = useState({})

    useEffect(() => {

        const fetchSingle = async() => {

            try {

               const data = await fetchSingleVideo(sub)

               if(data && !data.error) {
                setVideo(data?.video)
               }
                
            } catch (error) {
                console.error(`there was a problem ${error}`)
            }


        }

        fetchSingle()



    }, [sub])

    if(!video) {
        return(<>
        <h2>loading...</h2>
        </>)
    }




    return(<>
    
    {video.videoName}
    </>)

}