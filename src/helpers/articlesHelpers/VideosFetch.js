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