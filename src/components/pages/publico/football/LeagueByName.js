import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Pagination } from 'react-bootstrap';
import { fetchLeague,   fetchGamesByLeague, fetchTeams, fetchLeagueTable, fetchLeagueResults } from '../../../../helpers/articlesHelpers/LeaguesFetch';

export default function LeagueByName() {
    const { id } = useParams();
    
    const [league, setLeague] = useState([]);
    

    
    
    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchLeague(id)

          if(data && !data.error) {
            setLeague(data?.league)
          }
                    };
        fetchData();
    }, [id]);

    

    if(!league) {
 return(<div className="text-center" style={{margin: 30}}>
 
 <h4>LOADING....</h4>
 </div>)

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
    const { id } = useParams();
    const [gamesFromLeague, setGamesFromLeague] = useState([]);
    const [results, setResults] = useState([]);
    const [teams, setTeams] = useState([]);


    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;


    useEffect(() => {
        const fetchData = async () => {
            const byLeague = await fetchGamesByLeague(id);
            const allTeams = await fetchTeams();
            const leagueResults = await fetchLeagueResults(id);


            if(byLeague && allTeams  ) {

                setGamesFromLeague(byLeague?.gamesFromLeague)
                setTeams(allTeams?.teams)
                setResults(leagueResults?.results)
            
               }
        
        
        };
        fetchData();
    }, [id]);


    // Pagination handlers
    const handlePageChange = (pageNumber) => setActivePage(pageNumber);


    // Paginate results
    const paginatedResults = results?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const paginatedFixtures = gamesFromLeague?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);


if(!gamesFromLeague || !teams) {
    return(<>
    
    <h3 className='text-center'>LOADING...</h3>
    </>)
}

      

    return(<>
    
    <Container>
        
            <Row className="justify-content-center">
                <h4>Structure is coming soon....</h4>
                
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




const WithTable = () => {
    const { id } = useParams();
    const [table, setTable] = useState({});
    const [gamesFromLeague, setGamesFromLeague] = useState([]);
    const [results, setResults] = useState([]);
    const [teams, setTeams] = useState([]);

    
    
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            const byLeague = await fetchGamesByLeague(id);
            const allTeams = await fetchTeams();
            const leagueResults = await fetchLeagueResults(id);
            const singleTable = await fetchLeagueTable(id)

        


            if(byLeague && allTeams && leagueResults  ) {

                setGamesFromLeague(byLeague?.gamesFromLeague)
                setTeams(allTeams?.teams)
                setResults(leagueResults?.results)
                setTable(singleTable?.table)
            
               }
        
           
        };
        fetchData();
    }, [id]);

    const handlePageChange = (pageNumber) => setActivePage(pageNumber);

    const paginatedResults = results?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);
    const paginatedFixtures = gamesFromLeague?.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    if (!table?.teams || !gamesFromLeague || !results || !teams) {
        return <h3 className="text-center">DATA IS LOADING...</h3>;
    }
    
    const sortedTeams = [...table?.teams].sort((a, b) => 
        b.points - a.points || 
        b.goalDifference - a.goalDifference || 
        b.goalsFor - a.goalsFor
    );
    
    
    return (
        <Container >
            <Row className='d-flex justify-content-center'>
                <Col md={6} >
                <h3 className="text-center">League Table</h3>
 
                    <Table striped bordered hover>
    <thead>
        <tr>
            <th>#</th> {/* Column for ranking number */}
            <th>Team</th>
            <th>GP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>P</th>
        </tr>
    </thead>
    <tbody>
        {sortedTeams.map((team, index) => (
            <tr key={team.teamId}>
                <td>{index + 1}</td> {/* Display the ranking number */}
                <td><TeamInTable teamid={team.teamId} /></td>
                <td>{team.gamesPlayed}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.losses}</td>
                <td>{team.goalDifference}</td>
                <td>{team.points}</td>
            </tr>
        ))}
    </tbody>
</Table>

                    
                </Col>
            </Row>

            <Row>
                <Col xs={12} md={6} >
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

                <Col xs={12} md={6} >
                    <h3>Fixtures</h3>
                    {paginatedFixtures?.map((fixture, index) => (
                        <div key={index} >
                        <Card  className="mb-3"  >
                            <Card.Body>
                                <Card.Title style={{paddingBottom: "4rem"}}>
                                    {fixture.games.map((game, gameIndex) => (
                                        <div key={gameIndex} >
                                            <TeamName teamId={game.teamOne} teams={teams} /> vs <TeamName teamId={game.teamTwo} teams={teams} />
                                            <br />
                                            <strong>Time:</strong> {game.gameTime}
                                            <br />
                                            <strong>Venue:</strong> {game.gameVenue}
                                            <br>
                                            </br>
                                        </div>
                                    ))}
                                </Card.Title>
                                <br>
                                
                                </br>
                            </Card.Body>
                            
                        </Card>
                        <br></br>
                        </div>
                        
                                           ))}
                </Col>

               
            </Row>

               {/* Pagination */}
               <Pagination className="justify-content-center mt-3">                 {[...Array(Math.ceil(Math.max(results.length, gamesFromLeague.length) / itemsPerPage))].map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === activePage} onClick={() => handlePageChange(index + 1)}>
                         {index + 1}
                     </Pagination.Item>
                 ))}
             </Pagination>

        </Container>
    );
};



const TeamInTable = ({ teamid }) => {
  
  const [teams, setTeams] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          if (!teams || teams.length === 0) {
             const allTeams = await fetchTeams()

             setTeams(allTeams?.teams)
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



const TeamName = ({ teamId, teams }) => {
  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);


  if (!team) {
    return <span>Loading team...</span>;
  }

  return <span>{team.teamName}</span>;
};


