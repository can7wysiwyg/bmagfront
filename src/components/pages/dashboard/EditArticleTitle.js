import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { editArticleTitle } from '../../../redux/actions/magazineAction';


export default function EditArticleTitle() {
    const {id} = useParams()
    const[formData, setFormData] = useState({articleTitle: ""})
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async(event) => {
        event.preventDefault()

        await dispatch(editArticleTitle(formData, id))


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
    



    </>
  )
}
