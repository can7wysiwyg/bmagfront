import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchLeague } from '../../../../helpers/articlesHelpers/LeaguesFetch'
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function ManageSingleLeague() {
    const {id} = useParams()
    const[league, setLeague] = useState({})
    const[leagueName, setLeagueName] = useState("")
     const [btnText, setBtnText] = useState('UPDATE LEAGUE NAME');
      const [show, setShow] = useState(false);
        
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
       
     


    useEffect(() => {

        const fetchData = async() => {
                
            const data = await fetchLeague(id)

            console.log(data)

            if(data && !data.error) {
                setLeague(data?.league)

            }

           

        }

        fetchData()


    }, [id])


    const handleSubmit = async() => {

        await axios.put(`${ApiUrl}/admin_league_update/${id}`, {leagueName}, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })

        window.location.reload()

    }


    const eraseLeague = async() => {
        await axios.delete(`${ApiUrl}/admin_erase_league/${id}`, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })

        handleClose()

        window.location.href = '/local_football_dashboard'
    }

    const chango = () => {
        setBtnText('UPDATING LEAGUE NAME...');
      };
    

  return (
    <Container style={{ fontFamily: 'sans-serif', marginTop: '2rem', marginBottom: '4rem' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'red', fontStyle: 'cursive' }}>
            Delete or Update {league?.leagueName}
          </h4>

          <Row className="justify-content-md-center">
                  <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                      
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                          type="text"
                          name="leagueName"
                          value={leagueName}
                          onChange={(e) => setLeagueName(e.target.value)}
                          placeholder="New League Name"
                          required
                        />
                      </Form.Group>

                      <Button type="submit" onClick={chango}>
                                    {btnText}
                                  </Button>
          </Form>

<div style={{margin: 20}}>
    <Button color='danger' onClick={handleShow} style={{backgroundColor: "red!important"}} >

        Delete League
    </Button>


</div>

          </Col>
          </Row>


          <Modal show={show} onHide={handleClose}>
                                          <Modal.Header closeButton>
                                            <Modal.Title>Confirm Deletion</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            Are you sure you want to delete this league? 
                                            This action cannot be undone.
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                              Cancel
                                            </Button>
                                            <Button variant="danger" onClick={eraseLeague}>
                                              Delete
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                  
                            
    


    </Container>
  )
}
