import axios from "axios"
import { MAGAZINE_ARTICLE_GENRE_CREATE, MAGAZINE_ARTICLE_GENRE_VIEW, MAGAZINES_ISSUES_ERROR, NEW_ISSUE_SINGLE } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"


export function getIssueAdmin() {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/adminmagaroute/new_issue`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const newIssue = response.data.newIssue

            dispatch({type: NEW_ISSUE_SINGLE, payload: newIssue})
              

            
        } catch (error) {
            console.error(error)
            dispatch({type: MAGAZINES_ISSUES_ERROR})
            throw error
        }
    }
}


export function genreCreate(data) {

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/admingenreroute/create_genre`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            dispatch({type: MAGAZINE_ARTICLE_GENRE_CREATE})
              alert(response.data.msg)
              window.location.href = "/article_genres_view"
            
        } catch (error) {

            console.error(error)
            dispatch({type: MAGAZINES_ISSUES_ERROR})
            throw error
            

        }

    }
}


export function genreView() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/admingenreroute/show_genres`)

            const genres = response.data.genres

            dispatch({type: MAGAZINE_ARTICLE_GENRE_VIEW, payload: genres})
              
            
        } catch (error) {

            console.error(error)
            dispatch({type: MAGAZINES_ISSUES_ERROR})
            throw error
            

        }

    }
}



