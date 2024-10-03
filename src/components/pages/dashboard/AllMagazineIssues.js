import React, { useEffect } from 'react'
import { deletingMagIssue, magShowAll } from '../../../redux/actions/magazineAction';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, OverlayTrigger, Tooltip, } from 'react-bootstrap';



export default function AllMagazineIssues() {
    const dispatch = useDispatch()
    const magIssues = useSelector((state) => state.magRdcr.magIssues)

    useEffect(() => {

        const fetchData = async() => {
  
          try {
  
            await dispatch(magShowAll())
            
          } catch (error) {
            console.error("there was a problem")
          }
  
        }
  
        fetchData()
  
  
      }, [dispatch])
  

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
    
    const dispatch = useDispatch()

    
    
    const handleDelete = async(event) => {

        event.preventDefault()

        await dispatch(deletingMagIssue(item._id))

        
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