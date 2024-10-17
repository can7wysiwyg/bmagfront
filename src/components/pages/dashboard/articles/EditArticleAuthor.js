import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { editArticleAuthor } from '../../../../redux/actions/magazineAction';

export default function EditArticleAuthor() {
    const {id} = useParams()
    const[formData, setFormData] = useState({articleAuthor: ""})
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async(event) => {
        event.preventDefault()

        await dispatch(editArticleAuthor(formData, id))


      }
    



  return (
    <>
    <Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Update Article Author</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicAuthorName">
                
                <Form.Control
                  type="text"
                  name="articleAuthor"
                  value={ formData.articleAuthor }
                  onChange={handleInputChange}

                  placeholder="Article Author"
                  required
                />
              </Form.Group>



            <Button type="submit">Update Article Author</Button>
            </Form>
            </Col>
            </Row>
            </Container>

            <br></br>
            <br></br>
<br></br>

    




    </>
  )
}
