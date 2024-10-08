import { CREATE_SUBSCRIPTION_DATA, READ_SUBSCRIBED_MAGAZINE, SUBSCRIPTION_ERROR } from "../actions/types";

export function subRdcr(state={}, action) {

    switch(action.type) {
        case CREATE_SUBSCRIPTION_DATA:
            return{...state, msg: "successful"}

        case READ_SUBSCRIBED_MAGAZINE:
            return{...state, magazine: action.payload}    

        case SUBSCRIPTION_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    
    }
}