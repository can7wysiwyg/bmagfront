import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';

export default function UpdateArticlePhoto() {
    const{id} = useParams()
       const[articlePhoto, setArticlePhoto] = useState(false) 
    const[btnText, setBtnText] = useState("UPDATE ARTICLE PHOTO")

    const handleBookImageUpload = (event) => {
        const file = event.target.files[0];
        setArticlePhoto(file);
      };
    
    
      const handleSubmit = async(event) => {
    
        event.preventDefault()
    
        let formData = new FormData()
    
        formData.append('articlePhoto', articlePhoto)
    
        
            await axios.put(`${ApiUrl}/adminarticleroute/update_article_photo/${id}`, formData, {
              headers: {
                Authorization: `Bearer ${bmagtoken}`
              }
            })    
            
            
            window.location.href = `/article_single/${id}`
    
      }

      const chango = () => {

        setBtnText("ARTICLE PHOTO IS UPDATING...")
    
      }
    
    
    

  return (
    <>
    <Container style={{  fontFamily: "sans-serif", marginTop: "2rem" }}>
    <h4 style={{textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive"}}>update article photo</h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>

            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookImage">
              <Form.Label>Update  Article Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={handleBookImageUpload}
                required
                 accept=".png, .jpg, .jpeg, .webp"
              />
            </Form.Group>


            <Button type="submit" onClick={chango}>{btnText} </Button>




                </Form>
                </Col>
                </Row>
                </Container>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>




    </>
  )
}