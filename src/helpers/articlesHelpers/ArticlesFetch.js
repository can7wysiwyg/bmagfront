import {ApiUrl} from '../ApiUrl'

export async function fetchArticles() {
    try {
        const response = await fetch(`${ApiUrl}/articleroute/showing_articles`)
        return await response.json()
    } catch (error) {
        console.log("error fetching articles", error)
    
        return { error: true, message: error.message }
    }
}

export async   function fetchArticle(id) {

    try {

        const response = await fetch(`${ApiUrl}/articleroute/article_single/${id}`)

        const data = await response.json()

        return data
        
    } catch (error) {
        console.log("error fetching article", error)
    }
}




export async function fetchArticlesByGenre(id) {

    try {
        const response = await fetch(`${ApiUrl}/articleroute/articles_by_genre/${id}`)

        if(!response.ok) {

        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem fetching articles by genre ${error}`)
    }
    
}