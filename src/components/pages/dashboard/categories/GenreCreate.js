import axios from 'axios';
import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function GenreCreate() {

    const[formData, setFormData] = useState({genreName: ""})
    
    const handleInputChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };
 
 
   const handleSubmit = async(event) => {
     event.preventDefault()
 
     

     await axios.post(`${ApiUrl}/admingenreroute/create_genre`, formData, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`

      }
     })

     window.location.href = "/choose_action"
 
   }
 
 
  return (
    <>
    <Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Create Article Category</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicGenreName"> 
                
                 <Form.Control
                  type="text"
                  name="genreName"
                  value={formData.genreName }
                  onChange={handleInputChange}

                  placeholder="Article Category"
                  required
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
