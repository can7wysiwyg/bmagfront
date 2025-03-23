import React, { useEffect, useRef, useState } from 'react'
import moment from "moment/moment"
import axios from 'axios'
import { ApiUrl } from '../../../../helpers/ApiUrl'
import { bmagtoken } from '../../../../helpers/Bmag'

export default function NewMagIssue() {
const [newIssue, setNewIssue] = useState([])


useEffect(() => {

    const fetchNewIssue = async() => {

        try {

          const response =  await axios.get(`${ApiUrl}/adminmagaroute/new_issue`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            
                setNewIssue(response.data.newIssue)

            
        } catch (error) {
            console.error("there was a problem")
        }

    }

    fetchNewIssue()



}, [])


if(!newIssue || newIssue === undefined || newIssue === null) {

    return(<div className='text-center' style={{margin: 23}}>
    <h5> data is loading</h5>
    
    </div>)
}    if( newIssue && newIssue.length === 0) {

    return(<div className='text-center' style={{margin: 40}}>
        <h5 className='text-center mt-2'> there is no new magazines.. upload  <a href='/publish_magazine'>one</a> </h5>
        
        </div>)

}


  return (
    <>

    {
        Array.isArray(newIssue) ? newIssue?.map((magazine) => (

            <Magazine key={magazine._id} magazine={magazine} />


        )) : <div className='text-center' style={{margin: 40}}>
        <h5 className='text-center mt-2'> try again later </h5>
        
        </div>
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