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
    const results = useSelector((state) => state.soccerRdcr.results);
    const teams = useSelector((state) => state.soccerRdcr.teams);


    // Pagination states
    
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

    

    if(!league) {
 return(<>
 
 <h4>LOADING....</h4>
 </>)

    }

    

   
    return (
        <Container>
            <h2 style={{fontFamily: "Times New Roman"}}>{league?.leagueName}</h2>

            {
                league.hasLogTable === false ? <WithoutTable />   : <WithTable />
            }

            
        </Container>
    );
}


const WithoutTable = () => {

    const tournamentData = [
        {
          roundName: 'Quarter-Finals',
          matches: [
            { teamOne: { name: 'Team A', score: 2 }, teamTwo: { name: 'Team B', score: 1 } },
            { teamOne: { name: 'Team C', score: 3 }, teamTwo: { name: 'Team D', score: 2 } },
            { teamOne: { name: 'Team E', score: 1 }, teamTwo: { name: 'Team F', score: 2 } },
            { teamOne: { name: 'Team G', score: 0 }, teamTwo: { name: 'Team H', score: 1 } }
          ]
        },
        {
          roundName: 'Semi-Finals',
          matches: [
            { teamOne: { name: 'Team A', score: 3 }, teamTwo: { name: 'Team C', score: 2 } },
            { teamOne: { name: 'Team F', score: 1 }, teamTwo: { name: 'Team H', score: 2 } }
          ]
        },
        {
          roundName: 'Final',
          matches: [
            { teamOne: { name: 'Team A', score: 1 }, teamTwo: { name: 'Team H', score: 3 } }
          ]
        }
      ];
      

    return(<>
    
    <Container>
            <h1>Tournament Tree</h1>
            <Row className="justify-content-center">
                {tournamentData?.map((round, roundIndex) => (
                    <Col key={roundIndex} md={3} className="mb-4">
                        <h4>{round.roundName}</h4>
                        {round.matches?.map((match, matchIndex) => (
                            <Card key={matchIndex} className="mb-3 text-center">
                                <Card.Body>
                                    <div>{match.teamOne.name} vs {match.teamTwo.name}</div>
                                    <div>
                                        {match.teamOne.score} - {match.teamTwo.score}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>




    </>)

}




const WithTable = () => {

    const { id } = useParams();
    const table = useSelector((state) => state.soccerRdcr.table);
    const gamesFromLeague = useSelector((state) => state.soccerRdcr.gamesFromLeague);
    const results = useSelector((state) => state.soccerRdcr.results);
    const teams = useSelector((state) => state.soccerRdcr.teams);


    const dispatch = useDispatch()

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;


    useEffect(() => {
        const fetchData = async () => {
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
    const paginatedResults = results?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const paginatedFixtures = gamesFromLeague?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);


    if(!table || !gamesFromLeague || !results || !teams) {
        return(<>
        <h3 className='text-center'>DATA IS LOADING...</h3>
        </>)
    }



return(<>
<Container>


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


                <Row>
                <Col xs={12} md={6}>
                    <h3>Results</h3>
                    {paginatedResults?.map((result, index) => (
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
                    
{paginatedFixtures?.map((fixture, index) => (
    <Card key={index} className="mb-3">
        <Card.Body>
            <Card.Title>
                {/* Loop through the games array for each fixture */}
                {fixture.games.map((game, gameIndex) => (
                    <div key={gameIndex}>
                        <TeamName teamId={game.teamOne} teams={teams} /> vs <TeamName teamId={game.teamTwo} teams={teams} />
                        <br />
                        <strong>Time:</strong> {game.gameTime}
                        <br />
                        <strong>Venue:</strong> {game.gameVenue}
                    </div>
                ))}
            </Card.Title>
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
    
    
    
    
    </>)

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


