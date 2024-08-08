import { MAGAZINE_ARTICLE_GENRE_CREATE, MAGAZINE_ARTICLE_GENRE_VIEW, MAGAZINES_ISSUES_ERROR, NEW_ISSUE_SINGLE } from "../actions/types";

export function magRdcr(state={}, action) {

    switch(action.type) {

        case NEW_ISSUE_SINGLE:
            return{...state, newIssue: action.payload}

        case MAGAZINE_ARTICLE_GENRE_CREATE:
            return{...state, msg: "success"}
            
        case MAGAZINE_ARTICLE_GENRE_VIEW:
            return{...state, genres: action.payload}    

        case MAGAZINES_ISSUES_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    

    }

}