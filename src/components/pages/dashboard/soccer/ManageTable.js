import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLeague, getTable, getTeams, updateTeamStats } from '../../../../redux/actions/soccerAction'; // Assume you have an action to update stats
import { Container, Row, Col, Table, Button } from 'react-bootstrap';


export default function ManageTable() {
    const { id } = useParams(); // This is the leagueId
    const dispatch = useDispatch();
    const league = useSelector((state) => state.soccerRdcr.league);
    const table = useSelector((state) => state.soccerRdcr.table);
    const [editableTable, setEditableTable] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getLeague(id));
            await dispatch(getTable(id));
        };
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (table) {
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
            // Send the leagueId and updated teams array to the backend
            await dispatch(updateTeamStats({ teams: editableTable }, id)); 
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
                    <br />
                    <br />
                </Col>
            </Row>
        </Container>
    );
}


const TeamInTable = ({ teamid }) => {
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.soccerRdcr.teams);
  
    useEffect(() => {
        const fetchData = async () => {
            if (!teams || teams.length === 0) {
                await dispatch(getTeams());
            }
        };
  
        fetchData();
    }, [dispatch, teams]);
  
    // Find the team in the list of teams based on teamName (team ID)
    const team = teams?.find((t) => t._id === teamid);
  
    
  
    return (
        <>
                        {team ? team.teamName : 'Loading...'}
  
        </>
    );
  };
  
  