import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getTeams, getLeagues } from "../../../../redux/actions/soccerAction";
import { ApiUrl } from "../../../../helpers/ApiUrl";

export default function Games() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.soccerRdcr.games);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);

  const [localGames, setLocalGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goalUpdates, setGoalUpdates] = useState({}); // Change to an object
  const gamesPerPage = 5;

  // Fetch initial data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getGames());
        await dispatch(getTeams());
        await dispatch(getLeagues());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, [dispatch]);


  // Fetch log messages from the API
useEffect(() => {
  const fetchLogs = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/logs`); // Update with your actual log API endpoint
      const textData = await response.json(); // Fetch as plain text
      // const logMessages = textData.split('\n'); 

      console.log(textData)

      textData.forEach(log => {
        const match = log.match(/Received message: (.*)/); // Use regex to extract the JSON part
        if (match) {
          const jsonString = match[1]; // Extract the matched JSON string
          try {
            const messageData = JSON.parse(jsonString); // Parse JSON
            if (messageData.action === "updateGoals") {
              const { gameId, teamOneScore, teamTwoScore } = messageData;
              // Update state for the specific gameId
              setGoalUpdates(prev => ({
                ...prev,
                [gameId]: { teamOneScore, teamTwoScore }
              }));
            }
          } catch (error) {
            console.error('Error parsing JSON:', error); // Handle JSON parsing errors
          }
        }
      });
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  fetchLogs();
}, []); // This runs only once when the component mounts


  

  
  // Initialize localGames with Redux games when they're first loaded
  useEffect(() => {
    if (games && games.length > 0) {
      setLocalGames(games);
    }
  }, [games]);

  if (!teams || !leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = localGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(localGames.length / gamesPerPage);

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
                    {/* Display scores from goalUpdates */}
                    {goalUpdates[game._id] && (
                      <ListGroup.Item>
                        Score: {goalUpdates[game._id].teamOneScore} - {goalUpdates[game._id].teamTwoScore}
                      </ListGroup.Item>
                    )}
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
  );
}

// Memoized components remain the same
const TeamName = React.memo(({ teamId, teams }) => {
  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);
  return team ? <span>{team.teamName}</span> : <span>Loading team...</span>;
});

const LeagueName = React.memo(({ leagueId, leagues }) => {
  const league = useMemo(() => leagues.find((l) => l._id === leagueId), [leagues, leagueId]);
  return league ? <span>{league.leagueName}</span> : <span>Loading league...</span>;
});
