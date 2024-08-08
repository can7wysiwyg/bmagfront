import { ADMIN_ERROR, ADMIN_LOGIN, ADMIN_SHOW } from "../actions/types"

export function adminRdcr(state={}, action) {

    switch(action.type) {
        case ADMIN_LOGIN:
            return {...state, authenticated: true}

        case ADMIN_SHOW:
            return{...state, admin: action.payload}    

        case ADMIN_ERROR:
            return{...state, error: "there was a problem"}  
            
        default:
            return state



    }


}