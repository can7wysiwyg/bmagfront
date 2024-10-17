import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIssueAdmin } from '../../../../redux/actions/magazineAction'
import moment from "moment/moment"

export default function NewMagIssue() {
const newIssue = useSelector((state) => state.magRdcr.newIssue)
const dispatch = useDispatch()


useEffect(() => {

    const fetchNewIssue = async() => {

        try {

            await dispatch(getIssueAdmin())
            
        } catch (error) {
            console.error("there was a problem")
        }

    }

    fetchNewIssue()



}, [dispatch])


if(!newIssue || newIssue === undefined || newIssue === null) {

    return(<>
    <h5 className='text-center mt-2'> data is loading</h5>
    
    </>)
}    if( newIssue && newIssue.length === 0) {

    return(<>
        <h5 className='text-center mt-2'> there is no new magazines.. upload  <a href='/publish_magazine'>one</a> </h5>
        
        </>)

}


  return (
    <>

    {
        Array.isArray(newIssue) ? newIssue?.map((magazine) => (

            <Magazine key={magazine._id} magazine={magazine} />


        )) : "THERE WAS A PROBLEM"
    }


    </>
  )
}


const Magazine = ({magazine}) => {
    const [fadeIn, setFadeIn] = useState(false);
    const bookDetailsRef = useRef(null);
    useEffect(() => {
        setFadeIn(true);
      }, []);

    
    return(<>
    <div
            className={`book-details ${fadeIn ? "fade-in" : ""}`}
            ref={bookDetailsRef}

            style={{ marginTop: "3rem", textAlign: "center", fontFamily: "Helvetica" }}
          >
            <h2>{magazine.magazineIssue}</h2>
            <img src={magazine.magazinePhoto} alt="Magazine Cover" style={{width: "100%", height: "100vh", objectFit: "contain"}} />
     
            
            <h4><a href={`/edit_mag_issue/${magazine._id}`}>EDIT MAGAZINE </a></h4>
            
            <p>Published On: {moment(magazine.createdAt).format("MMM D YYYY")}</p>
            
            
          </div> 

          <br></br>
          <br></br>
          <br></br>


    
    
    
    
    </>)

}