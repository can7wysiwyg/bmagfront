import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getTeams, getLeagues } from "../../../../redux/actions/soccerAction"; 

export default function Games() {
  const games = useSelector((state) => state.soccerRdcr.games);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5; // Show 5 games per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getGames());
        await dispatch(getTeams());
        await dispatch(getLeagues());
      } catch (error) {
        console.log(`${error}`);
      }
    };

    fetchItems();
  }, [dispatch]);

  if (!games || !teams || !leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(games.length / gamesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Map the games to show fixtures
  return (
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        FOOTBALL FIXTURES
      </h5>
      <Row className="mt-4">
        {currentGames.length > 0 ? (
          currentGames.map((game) => (
            <Col lg={12} key={game._id} className="mb-4">
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>
                    <TeamName teamId={game.teamOne} teams={teams} /> vs{" "}
                    <TeamName teamId={game.teamTwo} teams={teams} />
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <LeagueName leagueId={game.leagueName} leagues={leagues} />
                  </Card.Subtitle>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Time: {game.gameTime}</ListGroup.Item>
                    <ListGroup.Item>Venue: {game.gameVenue}</ListGroup.Item>
                  </ListGroup>
                  <Card.Link href={`/game/${game._id}`}>View Details</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h6 className="text-center">No fixtures available at the moment.</h6>
        )}
      </Row>

      {/* Pagination */}
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

// Memoized TeamName component
const TeamName = ({ teamId, teams }) => {
  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);

  if (!team) {
    return <span>Loading team...</span>;
  }

  return <span>{team.teamName}</span>;
};

// Memoized LeagueName component
const LeagueName = ({ leagueId, leagues }) => {
  const league = useMemo(() => leagues.find((l) => l._id === leagueId), [leagues, leagueId]);

  if (!league) {
    return <span>Loading league...</span>;
  }

  return <span>{league.leagueName}</span>;
};