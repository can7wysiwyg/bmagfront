import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';

export default function CreateLeague() {
  const [btnText, setBtnText] = useState('CREATE NEW LEAGUE');
  
  const [formData, setFormData] = useState({
    leagueName: '',
    startDate: '', // Start date of the league
    endDate: '',   // End date of the league
    hasLogTable: '', // Change to string to handle select options
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value === 'true' ? true : value === 'false' ? false : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnText('CREATING NEW LEAGUE...');
    
    // Dispatch the createLeague action with the form data
    await axios.post(`${ApiUrl}/admin_create_league`, formData, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`
      }
    })

    window.location.href = "/local_football_dashboard"

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

            {/* Log Table Dropdown */}
            <Form.Group className="mb-3" controlId="formHasLogTable">
              <Form.Label>Does the league have a log table?</Form.Label>
              <Form.Select
                name="hasLogTable"
                value={formData.hasLogTable}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Item</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
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

            <Button type="submit">
              {btnText}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
