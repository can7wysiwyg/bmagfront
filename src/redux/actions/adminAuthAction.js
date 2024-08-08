import axios from "axios"
import { ADMIN_ERROR, ADMIN_LOGIN, ADMIN_SHOW } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"


export function adminLogin(data) {

    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/admin/login`, data)

            if(response.data.msg) {
                alert(response.data.msg)
    
            } else {
                localStorage.setItem("bmagtoken", response.data.bmagtoken)
                    window.location.href = "/"
    
            }


            dispatch({type: ADMIN_LOGIN})
    


            
        } catch (error) {
            console.error(error)
            dispatch({type: ADMIN_ERROR})
            throw error
        }

    }
}


export function getAdmin() {

    return async function(dispatch) {

        try {

            if(!bmagtoken || bmagtoken === undefined || bmagtoken === null) {

                return ""

            }
             
            const response = await axios.get(`${ApiUrl}/admin/admin`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            const admin = response.data.admin

            dispatch({type: ADMIN_SHOW, payload: admin})
            
        } catch (error) {
            console.error(error)
            dispatch({type: ADMIN_ERROR})
            throw error
        }

    }

}