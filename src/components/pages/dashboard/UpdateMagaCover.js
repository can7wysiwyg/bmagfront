import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { magaCoverPhoto } from '../../../redux/actions/magazineAction';

export default function UpdateMagaCover() {
   const{id} = useParams()
   const[magazinePhoto, setMagazinePhoto] = useState(false)
   const[btnText, setBtnText] = useState("UPDATE PHOTO")
   const dispatch = useDispatch()

   const handleBookImageUpload = (event) => {
    const file = event.target.files[0];
    setMagazinePhoto(file);
  };


  const handleSubmit = async(event) => {

    event.preventDefault()

    let formData = new FormData()

    formData.append('magazinePhoto', magazinePhoto)

    await dispatch(magaCoverPhoto(formData, id))

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
