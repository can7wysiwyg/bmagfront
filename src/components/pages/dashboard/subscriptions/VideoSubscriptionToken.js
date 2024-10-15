import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { subscribedVideoSingle, videoSubGenToken } from '../../../../redux/actions/videoSubscriptionAction'
import { watchVideo } from '../../../../redux/actions/publicAction'



export default function VideoSubscriptionToken() {
    const {id} = useParams()
    const subscribedVideo = useSelector((state) => state.vidSubRdcr.subscribedVideo)
    const [generatedToken, setGeneratedToken] = useState(null);
    const dispatch = useDispatch() 
    
    
    useEffect(() => {
        const fetchSub = async () => {
            await dispatch(subscribedVideoSingle(id));
        };

        fetchSub();
    }, [dispatch, id]);

    

    const handleGenerateToken = async () => {
        const transactionId = subscribedVideo.transactionId; 
        const response = await dispatch(videoSubGenToken({ transactionId, videoId: subscribedVideo.videoId }));
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

    const dispatch = useDispatch()

    const video = useSelector((state) => state.publicRdcr.video)

    useEffect(() => {

        const fetchSingle = async() => {

            try {

                await dispatch(watchVideo(sub))
                
            } catch (error) {
                console.error(`there was a problem ${error}`)
            }


        }

        fetchSingle()



    }, [dispatch, sub])

    if(!video) {
        return(<>
        <h2>loading...</h2>
        </>)
    }




    return(<>
    
    {video.videoName}
    </>)

}