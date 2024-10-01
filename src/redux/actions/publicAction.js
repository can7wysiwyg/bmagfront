import axios from "axios"
import { PUBLIC_ERROR, PUBLIC_GET_GENRE, PUBLIC_GET_GENRES, PUBLIC_SINGLE_MAG_ISSUE, WATCH_VIDEO, WATCH_VIDEOS } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"


export function watchVideos() {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/videos_all`)

            const videos = response.data.videos

            dispatch({type: WATCH_VIDEOS, payload: videos})
            
        } catch (error) {

            console.error(error)
            dispatch({type: PUBLIC_ERROR})
            throw error
            
        }

    }
}


export function watchVideo(id) {

    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/video_single/${id}`)

            const video = response.data.video

            dispatch({type: WATCH_VIDEO, payload: video})
            
        } catch (error) {

            console.error(error)
            dispatch({type: PUBLIC_ERROR})
            throw error
            
        }

    }
}



export function publicGetGenres() {
    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/genreroute/get_all_genres`)

            const categories = response.data.categories
            
            dispatch({type: PUBLIC_GET_GENRES, payload: categories})
            
        } catch (error) {
            console.error(error)
            dispatch({type: PUBLIC_ERROR})
            throw error
        }
    }
}


export function publicGetGenre(id) {
    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/genreroute/get_single_genre/${id}`)

            const category = response.data.category
            
            dispatch({type: PUBLIC_GET_GENRE, payload: category})
            
        } catch (error) {
            console.error(error)
            dispatch({type: PUBLIC_ERROR})
            throw error
        }
    }
}




export function publicNewMagIssue() {
    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/magissueroute/show_recent_issue`)

            const newIssue = response.data.newIssue

            dispatch({type: PUBLIC_SINGLE_MAG_ISSUE, payload: newIssue})
            
        } catch (error) {

            console.error(error)
            dispatch({type: PUBLIC_ERROR})
            throw error
            
        }

    }
}