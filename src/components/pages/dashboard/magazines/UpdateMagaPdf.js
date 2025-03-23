import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function UpdateMagaPdf() {
    const {id} = useParams()
    const[magazinePdfFile, setMagazinePdfFile] = useState(false)
    const[btnText, setBtnText] = useState("UPDATE MAGAZINE PDF")
    
    const handleBookFileUpload = (event) => {
        const file = event.target.files[0];
        setMagazinePdfFile(file);
      };


      const handleSubmit = async(event) => {

        event.preventDefault()
    
        let formData = new FormData()
    
        formData.append('magazinePdfFile', magazinePdfFile)
    
        await axios.put(`${ApiUrl}/adminmagaroute/update_magazine_pdf_file/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${bmagtoken}`
          }
        })
         window.location.href =`/edit_mag_issue/${id}`
    
    
      }
    

      const chango = () => {

        setBtnText("MAGAZINE PDF IS UPDATING...")
    
      }
    



  return (
    <>

<Container style={{  fontFamily: "sans-serif", marginTop: "2rem" }}>
    <h4 style={{textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive"}}>update magazine pdf file</h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>

            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicBookFile">
              <Form.Label>Update magazine pdf file</Form.Label>
              <Form.Control
                type="file"
                onChange={handleBookFileUpload}
                required
                accept=".pdf"
              />
            </Form.Group>




            <Button type="submit"onClick={chango}>{btnText}</Button>




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
