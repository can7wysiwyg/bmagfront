import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';
import { fetchTeamSingle } from '../../../../helpers/articlesHelpers/LeaguesFetch';


export default function ManageSingleTeam() {
    const {id} = useParams()
    const[teamName, setTeamName] = useState("")
    const[team, setTeam] = useState({})
  const [btnText, setBtnText] = useState('UPDATE TEAM NAME');
   const [show, setShow] = useState(false);
   
       const handleClose = () => setShow(false);
       const handleShow = () => setShow(true);
   
    useEffect(() => {

        const fetchData = async() => {
            const data = await fetchTeamSingle(id)

            if(data && !data.error) {
                setTeam(data?.team)
            }
        }

        fetchData()


    }, [id])

    const handleSubmit = async() => {

        await axios.put(`${ApiUrl}/admin_team_update/${id}`, {teamName}, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })

        window.location.reload()

    }


    const eraseTeam = async() => {

        await axios.delete(`${ApiUrl}/admin_erase_team/${id}`, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })

        handleClose();


        window.location.href = '/local_football_dashboard'

    }

    const chango = () => {
        setBtnText('UPDATING TEAM NAME...');
      };
    



  return (
    <Container style={{ fontFamily: 'sans-serif', marginTop: '2rem', marginBottom: '4rem' }}>
              <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'red', fontStyle: 'cursive' }}>
                Update or Delete {team?.teamName}
              </h4>

              <Row className="justify-content-md-center">
                                <Col xs={12} md={6}>
                                  <Form onSubmit={handleSubmit}>
                                    
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                      <Form.Control
                                        type="text"
                                        name="teamName"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="New Team Name"
                                        required
                                      />
                                    </Form.Group>
              
                                    <Button type="submit" onClick={chango}>
                                                  {btnText}
                                                </Button>
                        </Form>
              
              <div style={{margin: 20}}>
                  <Button color='danger' onClick={handleShow} style={{backgroundColor: "red!important"}} >
              
                      Delete Team
                  </Button>
              
              
              </div>
              
                        </Col>
                        </Row>


                        <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Confirm Deletion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to delete this team? 
                                  This action cannot be undone.
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                  </Button>
                                  <Button variant="danger" onClick={eraseTeam}>
                                    Delete
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                        
                  


    



    </Container>
  )
}
