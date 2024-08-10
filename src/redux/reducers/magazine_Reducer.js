import { ARTICLE_BY_MAGAZINE_ISSUE, ARTICLES_BY_MAGAZINE_ISSUE, ARTICLES_SHOWING_ALL, DELETE_ARTICLE, EDIT_ARTICLE_AUTHOR, EDIT_ARTICLE_CONTENT, EDIT_ARTICLE_TITLE, ISSUE_SINGLE, MAGAZINE_ARTICLE_GENRE_CREATE, MAGAZINE_ARTICLE_GENRE_VIEW, MAGAZINES_ISSUES_ERROR, NEW_ISSUE_SINGLE } from "../actions/types";

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
        
        case ARTICLES_BY_MAGAZINE_ISSUE:
            return{...state, articlesByIssue: action.payload}

        case ARTICLE_BY_MAGAZINE_ISSUE:
            return{...state, articleByIssue: action.payload}
            
        case ARTICLES_SHOWING_ALL:
            return{...state, articles: action.payload}
            
        case EDIT_ARTICLE_CONTENT:
            return{...state, msg: "updated"}  
            
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