import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function EditArticleTitle() {
    const {id} = useParams()
    const[formData, setFormData] = useState({articleTitle: ""})
    
    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async(event) => {
        event.preventDefault()

       
        await axios.put(`${ApiUrl}/adminarticleroute/update_title/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${bmagtoken}`
          }
        })


        window.location.href = `/article_single/${id}`
    


      }
    


  return (
    <> 

<Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Update Article Title</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicAuthorName">
                
                <Form.Control
                  type="text"
                  name="articleTitle"
                  value={ formData.articleTitle }
                  onChange={handleInputChange}

                  placeholder="Article Title"
                  required
                />
              </Form.Group>



            <Button type="submit">Update Article Title</Button>
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
