import { PUBLIC_ERROR, PUBLIC_GET_GENRE, PUBLIC_GET_GENRES, PUBLIC_SINGLE_MAG_ISSUE, VIDEOS_BY_GENRE, WATCH_VIDEO, WATCH_VIDEOS } from "../actions/types"

export function publicRdcr(state={}, action) {

    switch(action.type) {
        case PUBLIC_GET_GENRES:
            return {...state, categories: action.payload}

        case WATCH_VIDEOS:
            return {...state, videos: action.payload}
            
        case WATCH_VIDEO:
            return {...state, video: action.payload} 
            
            
        case VIDEOS_BY_GENRE:
            return{...state, videosByGenre: action.payload}    

        case PUBLIC_GET_GENRE:
            return{...state, category: action.payload}    

        case PUBLIC_SINGLE_MAG_ISSUE:
            return{...state, newIssue: action.payload}
        
        case PUBLIC_ERROR:
            return{...state, error: "there was a problem"}  
            
        default:
            return state



    }


}