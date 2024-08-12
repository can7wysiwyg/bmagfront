import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';

export default function SeeMagazines() {
  return (
    
    <Container className="mt-3 mb-6 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3 ">
        <ListGroup.Item className="text-center">
          <a href="/new_mag_issue">See magazine issue of the month</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/all_magazine_issues">All Released Magazine Issues</a>
        </ListGroup.Item>

    
      </ListGroup>

    <br>
    </br>
    <br></br>
    <br></br>
    </Container>
    
    
  )
}
