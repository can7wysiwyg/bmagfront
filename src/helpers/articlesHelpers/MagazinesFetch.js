import { ApiUrl } from "../ApiUrl";

export async function fetchRecentIssue() {

    try {
        

        const response = await fetch(`${ApiUrl}/magissueroute/show_recent_issue`)

        if(!response.ok) {
            console.log("something went wrong while fetching the recent magazine issue")
        }

        return await response.json()
        
    } catch (error) {
        console.log("error fetching recent magazine issue", error)
    
        return { error: true, message: error.message }
       
        
    }

}


export async function fetchAllMags() {

    try {
        
 const response = await fetch(`${ApiUrl}/magissueroute/show_all_issues`)

 if(!response.ok) {
    console.log("there was a problem fetching magazines")
 }

 return await response.json()

    } catch (error) {

        console.log("error fetching recent magazine issue", error)
    
        return { error: true, message: error.message }
       
        
    }
    
}