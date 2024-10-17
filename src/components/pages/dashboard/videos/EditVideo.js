import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';


export default function EditVideo() {
  const { id } = useParams();
 
  return (
    <Container className="mt-3 mb-3 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
      <ListGroup.Item className="text-center">
          <a href={`/edit_video_name/${id}`}>Edit Video Name</a>
        </ListGroup.Item>


        {/* <ListGroup.Item className="text-center">
        
        </ListGroup.Item> */}

        
      </ListGroup>

      <br></br>
      <br></br>
      <br></br>
      <br></br>



     
    </Container>
  );
}
