import axios from "axios"
import { ADMIN_CHECK_ALL_SUBSCRIPTIONS, ADMIN_CHECK_SUBSCRIPTION_SINGLE, ADMIN_SUB_TOKEN_GENERATE, CREATE_SUBSCRIPTION_DATA, READ_SUBSCRIBED_MAGAZINE, SUBSCRIPTION_ERROR } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"


export function sendSubData(data, id) {
    return async function(dispatch) {

        try {
            
            const response =  await axios.post(`${ApiUrl}/reader_credentials_submit`, data)
            dispatch({type: CREATE_SUBSCRIPTION_DATA})
            alert(response.data.msg)

            window.location.href = `/read_magazine/${id}`


        } catch (error) {
            console.error(error)
            dispatch({type: SUBSCRIPTION_ERROR})
            throw error
            
        }

    }
}


export function readSubMaga(data) {

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/reed_magazine_subscribed`, data)

            if(response.data.msg) {
                alert(response.data.msg)

            
            }

            const magazine = response.data.magazine 

            dispatch({type: READ_SUBSCRIBED_MAGAZINE, payload: magazine})

            

            
        } catch (error) {
            console.error(error)
            dispatch({type: SUBSCRIPTION_ERROR})
            throw error
            
            
        }

    }

}


export function adminAllSubs() {
    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/admin_check_subscriptions_all`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const subscriptions = response.data.subscriptions

            dispatch({type: ADMIN_CHECK_ALL_SUBSCRIPTIONS, payload: subscriptions})
            
        } catch (error) {

            console.error(error)
            dispatch({type: SUBSCRIPTION_ERROR})
            throw error
            
            
        }

    }
}



export function adminSingleSubs(id) {
    return async function(dispatch) {

        try {

            const response = await axios.get(`${ApiUrl}/admin_check_subscription_single/${id}`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const subscription = response.data.subscription

            dispatch({type: ADMIN_CHECK_SUBSCRIPTION_SINGLE, payload: subscription})
            
        } catch (error) {

            console.error(error)
            dispatch({type: SUBSCRIPTION_ERROR})
            throw error
            
            
        }

    }
}



export function adminSubTokGen(data) {
    return async function(dispatch) {
        try {
            const response = await axios.post(`${ApiUrl}/admin_generate_token`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`,
                },
            });

            
            dispatch({
                type: ADMIN_SUB_TOKEN_GENERATE,
                payload: response.data, 
            });

            return response; 
        } catch (error) {
            console.error(error);
            dispatch({ type: SUBSCRIPTION_ERROR });
            throw error;
        }
    };
}
