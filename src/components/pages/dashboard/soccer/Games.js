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

  const [searchTerm, setSearchTerm] = useState('');
  const [localGames, setLocalGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goalUpdates, setGoalUpdates] = useState({});
  const [goalScorers, setGoalScorers] = useState({}); // New state for goal scorers
  const [timers, setTimers] = useState({}); // Store timer values as strings

  const gamesPerPage = 10;

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



  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getGames()); // Fetch the latest games
    }, 1000); // Poll every second

    return () => clearInterval(interval); // Clean up on unmount
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


  // search games
  const filteredGames = useMemo(() => {
    if (!searchTerm) return localGames;
    return localGames.filter(game => {
      const teamOne = teams.find(t => t._id === game.teamOne)?.teamName.toLowerCase() || '';
      const teamTwo = teams.find(t => t._id === game.teamTwo)?.teamName.toLowerCase() || '';
      const league = leagues.find(l => l._id === game.leagueName)?.leagueName.toLowerCase() || '';
      const term = searchTerm.toLowerCase();
      return teamOne.includes(term) || teamTwo.includes(term) || league.includes(term);
    });
  }, [searchTerm, localGames, teams, leagues]);
  


  if (!teams || !leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = localGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(localGames.length / gamesPerPage);

if(games.length === 0) {
  return(<>
  
  <h3>NO FIXTURES AT THE MOMENT</h3>
  </>)
}
  



  return (
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        FOOTBALL FIXTURES
      </h5>

      <div className="text-center mb-4">
    <input
      type="text"
      placeholder="Search games..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    />
  </div>

  <Row className="mt-4">
  {filteredGames?.length > 0 ? (
    filteredGames.map((game) => (
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
                {goalUpdates[item._id] && (
                  <ListGroup.Item>
                    Score: {goalUpdates[item._id].teamOneScore} - {goalUpdates[item._id].teamTwoScore}
                  </ListGroup.Item>
                )}
                {/* Display goal scorers */}
                {goalScorers[item._id] && (
                  <ListGroup.Item>
                    Goal Scorers: {goalScorers[item._id].teamOneScorers.join(', ') || 'None'} (Home) |{" "}
                    {goalScorers[item._id].teamTwoScorers.join(', ') || 'None'} (Away)
                  </ListGroup.Item>
                )}
                {/* Display the timer */}
                {timers[item._id] && typeof timers[item._id] === 'string' && (
                  <ListGroup.Item>Timer: {timers[item._id]}</ListGroup.Item>
                )}
              </ListGroup>
              <Card.Link href={`/game/${item._id}`}>Start Game</Card.Link>
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