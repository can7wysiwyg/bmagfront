import React, { useEffect, useState } from 'react'
import { Table, Button, OverlayTrigger, Tooltip, } from 'react-bootstrap';
import { fetchAllMags } from '../../../../helpers/articlesHelpers/MagazinesFetch';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';



export default function AllMagazineIssues() {

    const [magIssues, setMagIssues] = useState([])

    useEffect(() => {

        const fetchData = async() => {
  
          try {
  
          const data =  await fetchAllMags()

          if(data && !data.error) {
            setMagIssues(data?.magIssues)
          }
            
          } catch (error) {
            console.error("there was a problem")
          }
  
        }
  
        fetchData()
  
  
      }, [])
  

  return (
    <div className='mb-4' style={{marginTop: "5rem", marginBottom: "5rem"}}>

<Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Magazine Issue</th>
            
          </tr>
        </thead>
        <tbody>
          {magIssues?.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.magazinePhoto} alt="magazine issue" style={{ width: '50px' }} />
              </td>
              <td>  {item.magazineIssue} </td>
              
              <td>
                <Buttons item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
<pre>


</pre>
<br></br>
<br></br>
<br></br>
<br></br>



    </div>
  )
}



const Buttons = ({item}) => {
    
    
    
    
    const handleDelete = async(event) => {

        event.preventDefault()

        
        await axios.delete(`${ApiUrl}/adminmagaroute/delete_magazine_issue/${item._id}`, {
          headers: {
            Authorization: `Bearer ${bmagtoken}`
          }
        })

        window.location.reload()

        
    }

    const deleteButtonTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>; 



    const RediButt = () => {
      window.location.href = `/edit_mag_issue/${item._id}`
    }



    

  


    return(<>
    <Button variant="primary" size="md" className="mr-2 mb-2 mb-md-0"  style={{marginRight: "1.5rem"}} onClick={RediButt}>
  Edit
</Button>

<OverlayTrigger placement="top" overlay={deleteButtonTooltip}>  
  <Button variant="danger" size="md" onClick={handleDelete} >
    Delete
  </Button>
  </OverlayTrigger> 

    
    
    
    </>)
}