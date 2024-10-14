import { ADMIN_GET_VIDEO_SUBS, ADMIN_SUBSCRIBED_VIDEO_SINGLE, ADMIN_VID_SUB_GENERATE_TOKEN, SUBSCRIBE_VIDEO, VIDEO_SUB_BY_TOKEN, VIDEO_SUBSCRIBE_ERROR, WATCH_SUBSCRIBED_VIDEO } from "../actions/types";


export function vidSubRdcr(state={}, action) {
    switch(action.type) {

        case SUBSCRIBE_VIDEO:
            return{...state, msg: "success"}

        case WATCH_SUBSCRIBED_VIDEO:
            const {video, watcherEntry} = action.payload    
            return{...state, video, watcherEntry} 


        case VIDEO_SUB_BY_TOKEN:
            return{...state, item: action.payload} 
            
        case ADMIN_GET_VIDEO_SUBS:
            return{...state, subscribedVideos: action.payload}
            
        case ADMIN_SUBSCRIBED_VIDEO_SINGLE:
            return{...state, subscribedVideo: action.payload}
            
        case ADMIN_VID_SUB_GENERATE_TOKEN:
            const {token, expiresAt, videoId} = action.payload 
            return {...state, token, expiresAt, videoId}
               

        case VIDEO_SUBSCRIBE_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    

    }
}