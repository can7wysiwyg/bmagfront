import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { subscribedVideoSingle } from '../../../../redux/actions/videoSubscriptionAction'
import moment from 'moment'
import { watchVideo } from '../../../../redux/actions/publicAction'

export default function CheckVideoSubscriber() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const subscribedVideo = useSelector((state) => state.vidSubRdcr.subscribedVideo)

    useEffect(() => {

        const fetchSubscription = async() => {
            try {

                await dispatch(subscribedVideoSingle(id))
                
            } catch (error) {
                console.error("there was a problem " + error)
            }


        }

        fetchSubscription()

    }, [dispatch, id])


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
            <h3 className='text-center'>Video Subscription Details</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Video Name: <VideoName sub={subscribedVideo.videoId} /></h5>
                    <p className="card-text">Subscription ID: {subscribedVideo._id}</p>
                    <p className="card-text">Subscriber Name: {subscribedVideo.username}</p>
                    <p className="card-text">Subscriber Email: {subscribedVideo.email}</p>
                    <p className="card-text">Subscriber Phone Number: {subscribedVideo.phonenumber}</p>
                    <h3 className='card-title'>token expires on:  {moment(subscribedVideo.expiresAt).format("MMM D YYYY, hh:mm A")} </h3>
                    

                    </div>
                    </div>
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