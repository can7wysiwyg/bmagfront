import axios from "axios"
import { MAGAZINE_ARTICLE_CREATE, PUBLISH_ERROR, PUBLISH_MAG, VIDEO_UPLOAD } from "./types"
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


export function articleCreate(data) {

    return async function(dispatch) {

        try {

          const response = await axios.post(`${ApiUrl}/adminarticleroute/create_new_article`, data, {
        headers: {
            Authorization: `Bearer ${bmagtoken}`
        }

          })

        dispatch({type: MAGAZINE_ARTICLE_CREATE})
        alert(response.data.msg)
        
        window.location.href = "/articles_dashboard"

            
        } catch (error) {

            console.error(error)
            dispatch({type: PUBLISH_ERROR})
            throw error
            
            
        }
        
    }

}





export  function publishVideo(data) {

    return async function (dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/upload_video`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }

            })

            dispatch({type: VIDEO_UPLOAD})

            alert(response.data.msg)

            window.location.href = "/videos"
            
        } catch (error) {
            console.error(error)
            dispatch({type: PUBLISH_ERROR})
            throw error
            
        }
        
    }
}