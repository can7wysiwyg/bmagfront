import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGamesByLeague, getLeague, getLeagueResults, getTable, getTeams } from '../../../../redux/actions/soccerAction';
import { Container, Row, Col, Table, Card, Pagination } from 'react-bootstrap';

export default function LeagueByName() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const league = useSelector((state) => state.soccerRdcr.league);
    const gamesFromLeague = useSelector((state) => state.soccerRdcr.gamesFromLeague);
    const table = useSelector((state) => state.soccerRdcr.table);
    const results = useSelector((state) => state.soccerRdcr.results);
    const teams = useSelector((state) => state.soccerRdcr.teams);


    // Pagination states
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getLeague(id));
            await dispatch(getGamesByLeague(id));
            await dispatch(getTable(id));
            await dispatch(getLeagueResults(id));
            await dispatch(getTeams())
        };
        fetchData();
    }, [dispatch, id]);

    // Pagination handlers
    const handlePageChange = (pageNumber) => setActivePage(pageNumber);

    // Paginate results
    const paginatedResults = results.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const paginatedFixtures = gamesFromLeague.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    return (
        <Container>
            <h2>{league?.leagueName}</h2>

            {/* Table Section */}
            {league?.hasLogTable && (
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
                                {table?.teams?.map((team, index) => (
                                    <tr key={index}>
                                        <td> <TeamInTable teamid={team.teamId} /></td> {/* Replace with team name if available */}
                                        <td>{team.gamesPlayed}</td>
                                        <td>{team.wins}</td>
                                        <td>{team.draws}</td>
                                        <td>{team.losses}</td>
                                        <td>{team.goalsFor}</td>
                                        <td>{team.goalsAgainst}</td>
                                        <td>{team.goalDifference}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}

            {/* Results Section */}
            <Row>
                <Col xs={12} md={6}>
                    <h3>Results</h3>
                    {paginatedResults.map((result, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>
                                <TeamName teamId={result.teamOne.name} teams={teams} /> vs <TeamName teamId={result.teamTwo.name} teams={teams} />

                                  
                                </Card.Title>
                                <Card.Text>
                                    <strong>Score:</strong> {result.teamOne.score} - {result.teamTwo.score}
                                    <br />
                                    <strong>Scorers (Team One):</strong> {result.teamOne.scorers.join(', ') || 'None'}
                                    <br />
                                    <strong>Scorers (Team Two):</strong> {result.teamTwo.scorers.join(', ') || 'None'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                {/* Fixtures Section */}
                <Col xs={12} md={6}>
                    <h3>Fixtures</h3>
                    {paginatedFixtures.map((fixture, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>
                                <TeamName teamId={fixture.teamOne} teams={teams} /> vs <TeamName teamId={fixture.teamTwo} teams={teams} />

                                </Card.Title>
                                <Card.Text>
                                    <strong>Time:</strong> {fixture.gameTime}
                                    <br />
                                    <strong>Venue:</strong> {fixture.gameVenue}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>

            {/* Pagination */}
            <Pagination className="justify-content-center mt-3">
                {[...Array(Math.ceil(Math.max(results.length, gamesFromLeague.length) / itemsPerPage))].map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
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



const TeamName = ({ teamId, teams }) => {
  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);


  if (!team) {
    return <span>Loading team...</span>;
  }

  return <span>{team.teamName}</span>;
};


