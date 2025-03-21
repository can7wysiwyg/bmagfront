import {ApiUrl} from '../ApiUrl'


export async function fetchAllCategories() {

    try {

        const response = await fetch( `${ApiUrl}/genreroute/get_all_genres`)
        if(!response.ok) {
            console.log("there was a problem fetching fetching categories")
        }

        return await response.json()
        
    } catch (error) {
        console.log("error fetching categories", error)
    
        return { error: true, message: error.message }
        
    }

}


export async function fetchCategory(id) {

    try {

        const response = await fetch(`${ApiUrl}/genreroute/get_single_genre/${id}`)

        if(!response.ok) {
            console.log("there was a problem fetching fetching category")
        }

        return await response.json()
        
        
    } catch (error) {
        console.log("error fetching category")
    }
}