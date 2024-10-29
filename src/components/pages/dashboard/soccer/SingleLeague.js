import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getLeagues, getGamesByLeague, getLeague } from "../../../../redux/actions/soccerAction";
import { useParams } from 'react-router-dom'

export default function SingleLeague() {
   const {id} =  useParams()
   const dispatch = useDispatch();
  const games = useSelector((state) => state.soccerRdcr.gamesFromLeague);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);
  const league = useSelector((state) => state.soccerRdcr.league)
  const [currentPage, setCurrentPage] = useState(1);


  const gamesPerPage = 10;


  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getGamesByLeague(id));
        await dispatch(getTeams());
        await dispatch(getLeagues());
        await dispatch(getLeague(id))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, [dispatch, id]);


  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(games?.length / gamesPerPage);


  if(!games || !league)  {
    return(<>
    
    <h3>LOADING....</h3>
    </>)
  }
  

  if(games.length === 0) {
    return(<>
    
    <h3>NO FIXTURES FROM THIS LEAGUE AT THE MOMENT</h3>
    </>)
  }
  

  return (
    <>
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        {league.leagueName}
      </h5>


      <Row className="mt-4">
  {currentGames?.length > 0 ? (
    currentGames.map((game) => (
      // Loop through each item in game.games and create a separate card for each
      game.games?.map((item, index) => (
        <Col lg={12} key={item._id || index} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <TeamName teamId={item.teamOne} teams={teams} /> vs{" "}
                <TeamName teamId={item.teamTwo} teams={teams} />
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <LeagueName leagueId={game.leagueName} leagues={leagues} />
              </Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>Time: {item.gameTime}</ListGroup.Item>
                <ListGroup.Item>Venue: {item.gameVenue}</ListGroup.Item>
                <ListGroup.Item><a href={`/update_match/${item._id}`}>EDIT GAME</a></ListGroup.Item>
                
                
                
              </ListGroup>
              
            </Card.Body>
          </Card>
        </Col>
      ))
    ))
  ) : (
    <h6 className="text-center">No fixtures available at the moment.</h6>
  )}
</Row>



      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}


      </Container>

    
    </>
  )
}


const TeamName = React.memo(({ teamId, teams }) => {
    const team = useMemo(() => teams?.find((t) => t._id === teamId), [teams, teamId]);
    return team ? <span>{team.teamName}</span> : <span>Loading team...</span>;
  });
  
  const LeagueName = React.memo(({ leagueId, leagues }) => {
    const league = useMemo(() => leagues?.find((l) => l._id === leagueId), [leagues, leagueId]);
    return league ? <span>{league.leagueName}</span> : <span>Loading league...</span>;
  });
  