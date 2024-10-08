import { CREATE_SUBSCRIPTION_DATA, SUBSCRIPTION_ERROR } from "../actions/types";

export function subRdcr(state={}, action) {

    switch(action.type) {
        case CREATE_SUBSCRIPTION_DATA:
            return{...state, msg: "successful"}

        case SUBSCRIPTION_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    
    }
}