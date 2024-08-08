import axios from "axios"
import { PUBLISH_ERROR, PUBLISH_MAG } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"

export default function publishMagazine(data) {

    return async function(dispatch) {

        try {
            const response = await axios.post(`${ApiUrl}/adminmagaroute/create_magazine`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            dispatch({type: PUBLISH_MAG})
            alert(response.data.msg)

            window.location.href = "/new_mag_issue"


            
        } catch (error) {
            console.error(error)
            dispatch({type: PUBLISH_ERROR})
            throw error
        }

    }

}