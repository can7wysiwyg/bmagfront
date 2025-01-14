import { ARTICLE_BY_MAGAZINE_ISSUE, ARTICLES_BY_GENRE, ARTICLES_BY_MAGAZINE_ISSUE, ARTICLES_SHOWING_ALL, DELETE_ARTICLE, DELETE_MAG_ISSUE, DELETE_VIDEO, EDIT_ARTICLE_AUTHOR, EDIT_ARTICLE_CONTENT, EDIT_ARTICLE_TITLE, ISSUE_SINGLE, MAGAZINE_ARTICLE_GENRE_CREATE, MAGAZINE_ARTICLE_GENRE_VIEW, MAGAZINE_COVER_UPDATE, MAGAZINE_PDF_UPDATE, MAGAZINE_SHOW_ALL, MAGAZINE_SHOW_SINGLE, MAGAZINES_ISSUES_ERROR, NEW_ISSUE_SINGLE, UPDATE_ARTICLE_PHOTO, UPDATE_MAG_ISSUE, UPDATE_VIDEO } from "../actions/types";

export function magRdcr(state={}, action) {

    switch(action.type) {

        case NEW_ISSUE_SINGLE:
            return{...state, newIssue: action.payload}

        case ISSUE_SINGLE:
            return{...state, singleIssue: action.payload}    

        case MAGAZINE_ARTICLE_GENRE_CREATE:
            return{...state, msg: "success"}
            
        case MAGAZINE_ARTICLE_GENRE_VIEW:
            return{...state, genres: action.payload}    

        case MAGAZINE_SHOW_ALL:
            return{...state, magIssues: action.payload}

        case DELETE_VIDEO:
            return{...state, msg: "success"}
            
        case UPDATE_VIDEO:
            return{...state, msg: "successful"}    

        case MAGAZINE_PDF_UPDATE:
            return{...state, msg: "success"}
            
        case MAGAZINE_COVER_UPDATE:
            return{...state, msg: "success"}    
            
        case MAGAZINE_SHOW_SINGLE:
            return{...state, singleIssue: action.payload}
            
        case DELETE_MAG_ISSUE:
            return{...state, msg: "success"}    

        case UPDATE_MAG_ISSUE:
            return{...state, msg: "success"}    
        
        case ARTICLES_BY_MAGAZINE_ISSUE:
            return{...state, articlesByIssue: action.payload}

        case ARTICLE_BY_MAGAZINE_ISSUE:
            return{...state, articleByIssue: action.payload}

        case ARTICLES_BY_GENRE:
            return{...state, articlesByGenre: action.payload}    
            
        case ARTICLES_SHOWING_ALL:
            return{...state, articles: action.payload}
            
        case EDIT_ARTICLE_CONTENT:
            return{...state, msg: "updated"}  

        case UPDATE_ARTICLE_PHOTO:
            return{...state, msg: "success"}    
            
        case EDIT_ARTICLE_AUTHOR:
            return{...state, msg: "updated"}   
            
        case EDIT_ARTICLE_TITLE:
            return{...state, msg: "updated"}    
        
        case DELETE_ARTICLE:
            return{...state, msg: "success"}

        case MAGAZINES_ISSUES_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    

    }

}