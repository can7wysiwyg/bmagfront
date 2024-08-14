import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { magaPdfUpdate } from '../../../redux/actions/magazineAction';

export default function UpdateMagaPdf() {
    const {id} = useParams()
    const[magazinePdfFile, setMagazinePdfFile] = useState(false)
    const dispatch = useDispatch()

    const handleBookFileUpload = (event) => {
        const file = event.target.files[0];
        setMagazinePdfFile(file);
      };


      const handleSubmit = async(event) => {

        event.preventDefault()
    
        let formData = new FormData()
    
        formData.append('magazinePdfFile', magazinePdfFile)
    
        await dispatch(magaPdfUpdate(formData, id))
    
      }
    



  return (
    <>

<Container style={{  fontFamily: "sans-serif", marginTop: "2rem" }}>
    <h4 style={{textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive"}}>update magazine pdf file</h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>

            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookFile">
              <Form.Label>Update magazine pdf file</Form.Label>
              <Form.Control
                type="file"
                onChange={handleBookFileUpload}
                required
                accept=".pdf"
              />
            </Form.Group>




            <Button type="submit">submit</Button>




</Form>
</Col>
</Row>
</Container>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>





        </>
  )
}
