import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGame, getTeams, getLeagues } from '../../../../redux/actions/soccerAction';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

export default function Game() {
  const { id } = useParams();
  const game = useSelector((state) => state.soccerRdcr.game);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);
  const dispatch = useDispatch();

  const [liveGame, setLiveGame] = useState(null); // For live updates
  const [isGameStarted, setIsGameStarted] = useState(false); // Game state
  const [timer, setTimer] = useState(0); // Timer state (in seconds)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getGame(id)); // Fetch single game
        await dispatch(getTeams());  // Fetch teams
        await dispatch(getLeagues()); // Fetch leagues
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  // Handle start of game, open WebSocket for real-time updates, and start the timer
  const handleStartGame = () => {
    console.log("Starting Game...");  // Debugging start
    const socket = new WebSocket('ws://localhost:3001'); // WebSocket URL
    
    socket.onopen = () => {
      console.log('WebSocket Connected');
      socket.send(JSON.stringify({ action: 'startGame', gameId: id }));

      // Start the timer and update game state
      setIsGameStarted(true); // Game has started
      console.log("Game has started: ", isGameStarted);  // Check state
      startTimer(); // Start the timer when the game starts
    };

    // Receive real-time updates
    socket.onmessage = (event) => {
      console.log('WebSocket Message Received:', event.data); // Log incoming data
      const updatedGame = JSON.parse(event.data);
      setLiveGame(updatedGame); // Update local state with new game info
    };

    // Cleanup function to close the socket when the component unmounts
    return () => {
      socket.close();
    };
  };

  // Timer logic
  const startTimer = () => {
    console.log('Starting timer...');  // Debugging startTimer
    const interval = setInterval(() => {
      setTimer(prevTime => {
        console.log('Timer updated:', prevTime + 1); // Log timer updates
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  };

  // Helper function to format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!game || !teams || !leagues) {
    return <h3 className='text-center'>LOADING....</h3>;
  }

  // Use liveGame state if it exists, otherwise fall back to the original game data
  const currentGame = liveGame || game;

  return (
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: 'Times New Roman', textAlign: 'center' }}>GAME DETAILS</h5>
      <Card className="mt-4 text-center">
        <Card.Body>
          <Card.Title>
            <TeamName teamId={currentGame.teamOne} teams={teams} /> vs{" "}
            <TeamName teamId={currentGame.teamTwo} teams={teams} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <LeagueName leagueId={currentGame.leagueName} leagues={leagues} />
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>Time: {currentGame.gameTime}</ListGroup.Item>
            <ListGroup.Item>Venue: {currentGame.gameVenue}</ListGroup.Item>
            <ListGroup.Item>Score: {currentGame.score || "0-0"}</ListGroup.Item> {/* Live Score */}
            {isGameStarted && (
              <ListGroup.Item>Live Game Time: {formatTime(timer)}</ListGroup.Item>  // Timer display
            )}
          </ListGroup>
          <Button variant="success" onClick={handleStartGame} disabled={isGameStarted}>
            {isGameStarted ? "Game In Progress" : "Start Game"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

// Component to display the team name
const TeamName = ({ teamId, teams }) => {
  const team = useMemo(() => teams.find((t) => t._id === teamId), [teams, teamId]);

  if (!team) {
    return <span>Loading team...</span>;
  }

  return <span>{team.teamName}</span>;
};

// Component to display the league name
const LeagueName = ({ leagueId, leagues }) => {
  const league = useMemo(() => leagues.find((l) => l._id === leagueId), [leagues, leagueId]);

  if (!league) {
    return <span>Loading league...</span>;
  }

  return <span>{league.leagueName}</span>;
};
