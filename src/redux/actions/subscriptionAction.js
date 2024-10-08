import axios from "axios"
import { CREATE_SUBSCRIPTION_DATA, SUBSCRIPTION_ERROR } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"


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