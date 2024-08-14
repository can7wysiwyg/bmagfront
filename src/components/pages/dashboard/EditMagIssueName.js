import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { updateMagIssue } from '../../../redux/actions/magazineAction';

export default function EditMagIssueName() {
    const {id} = useParams()
    const[formData, setFormData] = useState({
   magazineIssue: ""
    })

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async(event) => {
        event.preventDefault()

        await dispatch(updateMagIssue(formData, id))


      }
    





  return (
    <>
    <Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Update Magazine Issue</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicAuthorName">
                
                <Form.Control
                  type="text"
                  name="magazineIssue"
                  value={ formData.magazineIssue }
                  onChange={handleInputChange}

                  placeholder="Magazine Issue"
                  required
                />
              </Form.Group>



            <Button type="submit">Update Magazine Issue</Button>
            </Form>
            </Col>
            </Row>
            </Container>

            <br></br>
            <br></br>
<br></br>

<br></br>

    



        
   </>
  )
}
