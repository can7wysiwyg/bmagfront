import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { fetchLeague, fetchLeagueTable, fetchTeams } from '../../../../helpers/articlesHelpers/LeaguesFetch';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function ManageTable() {
    const { id } = useParams(); 
    const [league, setLeague] = useState([]);
    const [table, setTable] = useState([]);
    const [editableTable, setEditableTable] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async() => {

        await axios.delete(`${ApiUrl}/erase_table_admin/${table?._id}`, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })
    
        console.log('Table deleted');
        handleClose();

        window.location.href = '/local_football_dashboard'

      };
  
  
    
    useEffect(() => {
        const fetchData = async () => {
          const itemLeague =  await fetchLeague(id)
          const itemTable = await fetchLeagueTable(id)

          if(itemLeague && itemTable) {
            setLeague(itemLeague?.league)
            setTable(itemTable?.table)
          }


        };
        fetchData();
    }, [id]);




    useEffect(() => {
        if (table.teams) {
            setEditableTable(table.teams.map(team => ({ ...team })));
        }
    }, [table]);

    const handleEdit = (index, field, value) => {
        const updatedTable = [...editableTable];
        updatedTable[index][field] = value;
        setEditableTable(updatedTable);
        setHasChanges(true); 
    };

    const handleSaveAll = async () => {
        if (hasChanges) {
           
            await axios.put(`${ApiUrl}/update_table/${id}`, { teams: editableTable }, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            } )


            setHasChanges(false);
            alert("All changes saved!");
        } else {
            alert("No changes to save.");
        }
    };

    


    if (!league || !table) {
        return <h4>LOADING....</h4>;
    }

    return (
        <Container>
            <h2 style={{ fontFamily: "Times New Roman" }}>{league?.leagueName}</h2>
            <Row>
                <Col xs={12}>
                    <h3>League Table</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Games Played</th>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                                <th>Goals For</th>
                                <th>Goals Against</th>
                                <th>Goal Difference</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableTable.map((team, index) => (
                                <tr key={index}>
                                    <td>
                                        <TeamInTable teamid={team.teamId} />
                                    </td>
                                    {['gamesPlayed', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'goalDifference', 'points'].map((field) => (
                                        <td
                                            key={field}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => handleEdit(index, field, e.target.innerText)}
                                        >
                                            {team[field]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleSaveAll} disabled={!hasChanges}>
                        Save Changes
                    </Button>
                    <div style={{marginTop: 15}}>
                    <Button variant='danger' onClick={handleShow}>
                        Delete Table
                    </Button>

                    </div>
                    
                    <br />
                    <br />
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this table? 
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


        </Container>
    );
}


const TeamInTable = ({ teamid }) => {

    const [teams, setTeams] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            if (!teams || teams.length === 0) {
               const data = await fetchTeams()

               if(data && !data.error) {
                setTeams(data?.teams)
               }
               
            }
        };
  
        fetchData();
    }, [teams]);
  
    // Find the team in the list of teams based on teamName (team ID)
    const team = teams?.find((t) => t._id === teamid);
  
    
  
    return (
        <>
                        {team ? team.teamName : 'Loading...'}
  
        </>
    );
  };
  
  