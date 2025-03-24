import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { ApiUrl } from '../../../../helpers/ApiUrl'
import {bmagtoken} from "../../../../helpers/Bmag"
import { fetchSingleVideo } from '../../../../helpers/articlesHelpers/VideosFetch'


export default function CheckVideoSubscriber() {
    const {id} = useParams()
        const [subscribedVideo, setSubscribedVideo] = useState({})

    useEffect(() => {

        const fetchSubscription = async() => {
            try {

            
                const response = await axios.get(`${ApiUrl}/video_subscription_single/${id}`, {
                    headers: {
                        Authorization: `Bearer ${bmagtoken}`
                    }
                })

                setSubscribedVideo(response.data.subscribedVideo)
                
            } catch (error) {
                console.error("there was a problem " + error)
            }


        }

        fetchSubscription()

    }, [id])


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