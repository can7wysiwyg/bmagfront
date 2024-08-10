import { PUBLIC_ERROR, PUBLIC_GET_GENRES, PUBLIC_SINGLE_MAG_ISSUE } from "../actions/types"

export function publicRdcr(state={}, action) {

    switch(action.type) {
        case PUBLIC_GET_GENRES:
            return {...state, categories: action.payload}

        case PUBLIC_SINGLE_MAG_ISSUE:
            return{...state, newIssue: action.payload}
        
        case PUBLIC_ERROR:
            return{...state, error: "there was a problem"}  
            
        default:
            return state



    }


}