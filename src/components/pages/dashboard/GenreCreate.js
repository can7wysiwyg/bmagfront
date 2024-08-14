import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { genreCreate } from '../../../redux/actions/magazineAction';
import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function GenreCreate() {

    const[formData, setFormData] = useState({genreName: ""})
    const dispatch = useDispatch()
 
    const handleInputChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };
 
 
   const handleSubmit = async(event) => {
     event.preventDefault()
 
     dispatch(genreCreate(formData))
 
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
