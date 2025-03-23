import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function UpdateMagaCover() {
   const{id} = useParams()
   const[magazinePhoto, setMagazinePhoto] = useState(false)
   const[btnText, setBtnText] = useState("UPDATE PHOTO")
   
   const handleBookImageUpload = (event) => {
    const file = event.target.files[0];
    setMagazinePhoto(file);
  };


  const handleSubmit = async(event) => {

    event.preventDefault()

    let formData = new FormData()

    formData.append('magazinePhoto', magazinePhoto)

    await axios.put(`${ApiUrl}/adminmagaroute/update_magazine_cover_photo/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`
      }
    })
     window.location.href =`/edit_mag_issue/${id}`



  }


  const chango = () => {

    setBtnText("PHOTO IS UPDATING")

  }

 


  return (
    <>

<Container style={{  fontFamily: "sans-serif", marginTop: "2rem" }}>
    <h4 style={{textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive"}}>update magazine photo</h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>

            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookImage">
              <Form.Label>Update  magazine cover</Form.Label>
              <Form.Control
                type="file"
                onChange={handleBookImageUpload}
                required
                 accept=".png, .jpg, .jpeg, .webp"
              />
            </Form.Group>


            <Button type="submit" onClick={chango}>{btnText}</Button>




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
