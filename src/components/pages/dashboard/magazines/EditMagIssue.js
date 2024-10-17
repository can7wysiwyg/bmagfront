import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap';


export default function EditMagIssue() {
  const{id} = useParams()
  return (
    <>
    <Container className="mt-3 mb-3 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
        <ListGroup.Item className="text-center">
          <a href={`/edit_magissue_name/${id}`}>Edit Magazine Issue Name</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href={`/update_magaissue_pdffile/${id}`}>Update Magazine PDF File</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href={`/update_magaissue_cover/${id}`}>Update Magazine Cover</a>
        </ListGroup.Item>

        
      </ListGroup>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      </Container>




    

    </>
  )
}
