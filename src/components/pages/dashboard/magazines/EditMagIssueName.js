import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';

export default function EditMagIssueName() {
    const {id} = useParams()
    const[formData, setFormData] = useState({
   magazineIssue: ""
    })

    const[btnText, setBtnText] = useState("UPDATE MAGAZINE ISSUE NAME")

   
    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };


      const handleSubmit = async(event) => {
        event.preventDefault()

      
        await axios.put(`${ApiUrl}/adminmagaroute/update_magazine_issue/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${bmagtoken}`
          }
        })
         window.location.href =`/edit_mag_issue/${id}`

      }

      const chango = () => {

        setBtnText("MAGAZINE NAME IS UPDATING...")
    
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



            <Button type="submit" onClick={chango}>{btnText}</Button>
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
