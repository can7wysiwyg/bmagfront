import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAdmin } from "../redux/actions/adminAuthAction"


export function AdminCheck() {



const dispatch = useDispatch()
const admin = useSelector((state) => state.adminRdcr.admin)

useEffect(() => {

const fetchData = async() => {
    try {
        await dispatch(getAdmin())
        

      
        
        
        
    } catch (error) {
        console.error(error)
    }
      


}   


fetchData()



}, [dispatch])


const AuthInfo = () => {

    if(admin?.admin === 1) {

        return (<>
         <a className="nav-link" href="/dashboard">DASHBOARD</a>
        
        </>)

    }



    


} 

return(<>
{ AuthInfo() }

</>)

    
}