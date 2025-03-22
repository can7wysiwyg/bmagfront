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
        console.log(`there was an issue while fetching the video ${id}`)
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
        console.log(`there was an issue while fetching the videos  ${id}`)
    }
}