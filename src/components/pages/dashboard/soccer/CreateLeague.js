import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { createLeague } from '../../../../redux/actions/soccerAction';

export default function CreateLeague() {
  const [formData, setFormData] = useState({
    leagueName: '',
    startDate: '', // Start date of the league
    endDate: ''    // End date of the league
  });

  const [btnText, setBtnText] = useState('CREATE NEW LEAGUE');
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
    await dispatch(createLeague(formData));
  };

  const chango = () => {
    setBtnText('CREATING NEW LEAGUE...');
  };

  return (
    <Container style={{ fontFamily: 'sans-serif', marginTop: '2rem', marginBottom: '4rem' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'red', fontStyle: 'cursive' }}>
        CREATE NEW LEAGUE
      </h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            {/* League Name */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="leagueName"
                value={formData.leagueName}
                onChange={handleInputChange}
                placeholder="League Name"
                required
              />
            </Form.Group>

            {/* Start Date */}
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date Of League</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* End Date */}
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date Of League</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
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
