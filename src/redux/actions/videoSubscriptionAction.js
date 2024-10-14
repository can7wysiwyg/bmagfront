import axios from "axios"
import { ADMIN_GET_VIDEO_SUBS, ADMIN_SUBSCRIBED_VIDEO_SINGLE, ADMIN_VID_SUB_GENERATE_TOKEN, SUBSCRIBE_VIDEO, VIDEO_SUB_BY_TOKEN, VIDEO_SUBSCRIBE_ERROR, WATCH_SUBSCRIBED_VIDEO } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"

export function videoSubscribe(data) {
    return async function(dispatch) {
        try {

            const response = await axios.post(`${ApiUrl}/video_subscriber_credentials_submit`, data)
            dispatch({type: SUBSCRIBE_VIDEO})
            alert(response.data.msg)
            
        } catch (error) {
            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
        }
    }
}


export function watchSubsribedVideo(data) {
    return async function(dispatch) {
        try {

            const response = await axios.post(`${ApiUrl}/watch_video_subscribed`, data)

            if(response.data.msg) {
                alert(response.data.msg)

            
            }

            
            dispatch({type: WATCH_SUBSCRIBED_VIDEO, payload: response.data})



            
        } catch (error) {

            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
            
        }
    }
}


export function videoSubToken(token) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${ApiUrl}/video_sub_by_token/${token}`)

            const item = response.data.item

            dispatch({type: VIDEO_SUB_BY_TOKEN, payload: item})
            


            
        } catch (error) {
            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
            
        }
    }
}




export function adminAllVideoSubs() {
    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/video_subscriptions_all`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const subscribedVideos = response.data.subscribedVideos

            dispatch({type: ADMIN_GET_VIDEO_SUBS, payload: subscribedVideos})
            
        } catch (error) {

            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
            
            
        }
    }
}



export function subscribedVideoSingle(id) {
    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/video_subscription_single/${id}`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const subscribedVideo = response.data.subscribedVideo

            dispatch({type: ADMIN_SUBSCRIBED_VIDEO_SINGLE, payload: subscribedVideo})
            
        } catch (error) {
            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
            
            
        }
    }
}


export function videoSubGenToken(data) {
    return async function(dispatch) {
        try {

            const response = await axios.post(`${ApiUrl}/video_sub_generate_token`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })


            dispatch({
                type: ADMIN_VID_SUB_GENERATE_TOKEN,
                payload: response.data, 
            });
            
        } catch (error) {
            console.error(error)
            dispatch({type: VIDEO_SUBSCRIBE_ERROR})
            throw error
            
            
        }
    }
}