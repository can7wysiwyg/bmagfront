import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';

export default function LocalFootball() {
  return (
    <>
    <Container className="mt-5 mb-5 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
      <ListGroup.Item className="text-center">
          <a href="/create_league">CREATE LEAGUE</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/create_table">CREATE TABLE</a>
        </ListGroup.Item>



        <ListGroup.Item className="text-center">
          <a href="/create_team">CREATE TEAM</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/create_match">ADD FOOTBALL FIXTURE</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/teams">TEAMS</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/admin_games">GAMES</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href="/leagues">leagues</a>
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
