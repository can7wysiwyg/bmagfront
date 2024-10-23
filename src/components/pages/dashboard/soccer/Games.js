import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getTeams, getLeagues } from "../../../../redux/actions/soccerAction";
import { ApiUrl } from "../../../../helpers/ApiUrl";
import moment from "moment";

export default function Games() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.soccerRdcr.games);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);

  const [localGames, setLocalGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goalUpdates, setGoalUpdates] = useState({});
  const [goalScorers, setGoalScorers] = useState({}); // New state for goal scorers
  const [timers, setTimers] = useState({}); // Store timer values as strings

  const gamesPerPage = 5;

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

  // Function to fetch game timers from the API
  const fetchGameTimers = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/game_times`);
      const timerData = await response.json();
      // Update timers based on the fetched data
      const newTimers = {};
      timerData.forEach(({ gameId, elapsedTime }) => {
        newTimers[gameId] = elapsedTime; // Update timer state
      });
      setTimers(prevTimers => ({ ...prevTimers, ...newTimers }));
    } catch (error) {
      console.error('Error fetching game timers:', error);
    }
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/logs`);
const textData = await response.json();

console.log(textData);

textData.forEach(log => {
  try {
    const messageData = JSON.parse(log); // Parse the JSON directly since it no longer has the prefix

    // Start the timer when "startGame" is received
    if (messageData.action === "startGame") {
      const { gameId } = messageData;
      startTimerForGame(gameId);
    }

    // Handle goal updates
    if (messageData.action === "updateGoals") {
      const { gameId, teamOneScore, teamTwoScore, teamOneScorers, teamTwoScorers } = messageData;
      setGoalUpdates(prev => ({
        ...prev,
        [gameId]: {
          teamOneScore,
          teamTwoScore
        }
      }));

      // Set the goal scorers in state
      setGoalScorers(prev => ({
        ...prev,
        [gameId]: {
          teamOneScorers,
          teamTwoScorers
        }
      }));
    }

  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});

  


      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
    const pollingInterval = setInterval(fetchLogs, 10000);
    const timerPollingInterval = setInterval(fetchGameTimers, 1000); // Poll for timers

    return () => {
      clearInterval(pollingInterval);
      clearInterval(timerPollingInterval); // Clear timer polling on unmount
      // Clear all timers on unmount
      Object.values(timers).forEach(timer => clearInterval(timer.intervalId));
    };
  }, [timers]); // Depend on timers to clear intervals correctly

  const startTimerForGame = (gameId) => {
    if (!timers[gameId]) { // Check if the timer is already running for the game
      const gameStart = moment(); // Store the start time
      const intervalId = setInterval(() => {
        const now = moment();
        const duration = moment.duration(now.diff(gameStart));
        const minutes = Math.floor(duration.asMinutes());
        const seconds = duration.seconds();

        // Update timer state as a string
        setTimers(prev => ({
          ...prev,
          [gameId]: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }));
      }, 1000);

      // Store the interval ID to clear it later if necessary
      setTimers(prev => ({
        ...prev,
        [gameId]: { intervalId } // Store the interval ID for cleanup
      }));
    }
  };

  useEffect(() => {
    if (games && games.length > 0) {
      setLocalGames(games);
    }
  }, [games]);

  if (!teams || !leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

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
                    {goalUpdates[game._id] && (
                      <ListGroup.Item>
                        Score: {goalUpdates[game._id].teamOneScore} - {goalUpdates[game._id].teamTwoScore}
                      </ListGroup.Item>
                    )}
                    {/* Display goal scorers */}
                    {goalScorers[game._id] && (
                      <ListGroup.Item>
                        Goal Scorers: {goalScorers[game._id].teamOneScorers.join(', ') || 'None'} (Home) | {goalScorers[game._id].teamTwoScorers.join(', ') || 'None'} (Away)
                      </ListGroup.Item>
                    )}
                    {/* Display the timer */}
                    {timers[game._id] && typeof timers[game._id] === 'string' && (
                      <ListGroup.Item>
                        Timer: {timers[game._id]} {/* Display timer directly */}
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
