import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import {  createTeam } from '../../../../redux/actions/soccerAction';

export default function CreateTeam() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLocation: '', 
    
  });

  const [btnText, setBtnText] = useState('CREATE NEW TEAM');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Dispatch the createLeague action with the form data (startDate and endDate)
    await dispatch(createTeam(formData));
  };

  const chango = () => {
    setBtnText('CREATING NEW TEAM...');
  };

  return (
    <Container style={{ fontFamily: 'sans-serif', marginTop: '2rem', marginBottom: '4rem' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'red', fontStyle: 'cursive' }}>
        CREATE NEW TEAM
      </h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                placeholder="Team Name"
                required
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="teamLocation"
                value={formData.teamLocation}
                onChange={handleInputChange}
                placeholder="Team Location"
                required
              />
            </Form.Group>


            
            
            <Button type="submit" onClick={chango}>
              {btnText}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
