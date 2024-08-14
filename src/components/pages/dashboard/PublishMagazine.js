import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import publishMagazine from '../../../redux/actions/publishAction';

export default function PublishMagazine() {
    const[formDatta, setFormData] = useState({magazineIssue: ""})
    const[magazinePhoto, setMagazinePhoto] = useState(false)
    const[magazinePdfFile, setMagazinePdfFile] = useState(false)


    const dispatch = useDispatch()



    const handleInputChange = (e) => {
        setFormData({
          ...formDatta,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setMagazinePhoto(file);
      };

      const handleBookFileUpload = (event) => {
        const file = event.target.files[0];
        setMagazinePdfFile(file);
      };
    


      const handleSubmit = async(event) => {
   event.preventDefault()

   let formData = new FormData()

   formData.append('magazineIssue', formDatta.magazineIssue)
   formData.append('magazinePdfFile', magazinePdfFile)
   formData.append('magazinePhoto', magazinePhoto)


   await dispatch(publishMagazine(formData))



      }
    
    
    


  return (
    <>
     <Container style={{ fontFamily: "sans-serif", marginTop: "2rem" }}>
        <h4
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "red",
            fontStyle: "cursive",
          }}
        >
          Publish New Magazine
        </h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicBookImage">
                <Form.Label>Upload Magazine Cover Photo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageUpload}
                  required
                  accept=".png, .jpg, .jpeg, .webp"
                />
              </Form.Group>


              <Form.Group className="mb-3" controlId="formBasicBookFile">
                <Form.Label>Upload Magazine pdf file</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleBookFileUpload}
                  required
                  accept=".pdf"
                />
              </Form.Group>




              <Form.Group className="mb-3" controlId="formBasicBookAuthor">
                <Form.Control
                  type="text"
                  name="magazineIssue"
                  value={formDatta.magazineIssue}
                  onChange={handleInputChange}
                  placeholder="Write month issue of magazine"
                  required
                />
              </Form.Group>


              <Button type="submit">Publish New Issue</Button>



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
