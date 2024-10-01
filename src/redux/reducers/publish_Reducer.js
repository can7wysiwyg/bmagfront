import { MAGAZINE_ARTICLE_CREATE, PUBLISH_ERROR, PUBLISH_MAG, VIDEO_UPLOAD } from "../actions/types";

export function publishRdcr(state={}, action) {
    switch(action.type) {

        case PUBLISH_MAG:
            return{...state, msg: "published"}

        case VIDEO_UPLOAD:
            return{...state, msg: "published"}


        case MAGAZINE_ARTICLE_CREATE:
            return{...state, msg: "published"}    

        case PUBLISH_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    


    }
} 