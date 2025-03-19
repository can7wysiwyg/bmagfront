import { ApiUrl } from "../ApiUrl";

export async function fetchAllLeagues() {
    try {
        const response = await fetch(`${ApiUrl}/public_show_leagues`)

        if(!response.ok) {
            console.log("there was  a problem fetching leagues")
        }

        return await response.json()

        
    } catch (error) {
        console.log("error fetching leagues", error)
    
        return { error: true, message: error.message }
        
    }
}