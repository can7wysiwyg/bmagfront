import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';


export default function ChooseActionCategory() {
  return (
    <>
    <Container className="mt-3 mb-3 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
        <ListGroup.Item className="text-center">
          <a href="/genres_create">Create Category</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/article_genres_view">View All Articles Categories </a>
        </ListGroup.Item>

        
        
      </ListGroup>

      </Container>

      <br></br>
      <br></br>
      <br></br>
      <br></br>





    </>
  )
}
