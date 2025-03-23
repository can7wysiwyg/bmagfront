import axios from "axios";
import { ApiUrl } from "../ApiUrl";

export async function  fetchAllVideos() {

    try {
        const response = await fetch(`${ApiUrl}/videos_all`)

        if(!response.ok) {
            console.log("there was a problem fetching videos")
        }

        return await response.json()
        
    } catch (error) {
        console.log("error fetching videos", error)
    
        return { error: true, message: error.message }
       
    }
}


export async function fetchSingleVideo(id) {
    try {

        const response = await fetch(`${ApiUrl}/video_single/${id}`)


        if(!response.ok) {
            console.log("there was a problem fetching the video")
        }

        return await response.json()
        
        
    } catch (error) {
        console.log(`there was an issue while fetching the video ${error}`)
    }
}


export async function fetchVideosByGenre(id) {
    try {
        const response = await fetch(`${ApiUrl}/videos_by_genre/${id}`)


        if(!response.ok) {
            console.log("there was a problem fetching the video")
        }

        return await response.json()
        



    } catch (error) {
        console.log(`there was an issue while fetching the videos  ${error}`)
    }
}


export async function fetchVideosBySubToken(data) {


    try {

        const response = await fetch(`${ApiUrl}/video_sub_by_token/${data}`)

        if(!response.ok) {
            console.log(`problem fetching subscribed video`)
        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was an issue while fetching the videos  ${error}`)
        
    }

}


export async function fetchWatchVideoSubscribed(token) {

    try {
        const response = await axios.post(`${ApiUrl}/watch_video_subscribed`, token)

        if(!response.ok) {
            console.log(`there was a problem fetching subscribed video`)
        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem fetching subscribed video ${error}`)
    }
}



export async function subscribeToVideo(data) {

    try {

        const response = await axios.post(`${ApiUrl}/video_subscriber_credentials_submit`, data)


        if(!response.ok) {
            console.log(`there was a problem subscribing to video`)
        }

        return await response.json()
        


        
    } catch (error) {
        console.log(`there was a problem while subscribing to video ${error}`)
    }
    
}