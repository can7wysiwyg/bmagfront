import { ADMIN_CHECK_ALL_SUBSCRIPTIONS, ADMIN_CHECK_SUBSCRIPTION_SINGLE, ADMIN_SUB_TOKEN_GENERATE, CREATE_SUBSCRIPTION_DATA, FIND_BY_TOKEN, READ_SUBSCRIBED_MAGAZINE, SUBSCRIPTION_ERROR } from "../actions/types";

export function subRdcr(state={}, action) {

    switch(action.type) {
        case CREATE_SUBSCRIPTION_DATA:
            return{...state, msg: "successful"}

        case READ_SUBSCRIBED_MAGAZINE:
            const{magazine, readerEntry} = action.payload
            return{...state, magazine, readerEntry} 

        case ADMIN_SUB_TOKEN_GENERATE:
            const { token, expiresAt, magazineId } = action.payload;

            return {...state, token, expiresAt, magazineId }    
            
        case ADMIN_CHECK_ALL_SUBSCRIPTIONS:
            return{...state, subscriptions: action.payload}

        case FIND_BY_TOKEN:
            return{...state, item: action.payload}     
            
        case ADMIN_CHECK_SUBSCRIPTION_SINGLE:
            return{...state, subscription: action.payload}    

        case SUBSCRIPTION_ERROR:
            return{...state, msg: "there was a problem"}
            
        default:
            return state    
    }
}