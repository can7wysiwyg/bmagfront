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

  const [liveGame, setLiveGame] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [ws, setWs] = useState(null);
  
  // New state variables to hold the current game details
  const [currentTeamOne, setCurrentTeamOne] = useState('');
  const [currentTeamTwo, setCurrentTeamTwo] = useState('');
  const [currentLeague, setCurrentLeague] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getGame(id));
        await dispatch(getTeams());
        await dispatch(getLeagues());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.action === 'gameState') {
        setLiveGame(message.game);
      } else if (message.action === 'gameUpdate') {
        setLiveGame(message.game);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [id]);

  const handleStartGame = () => {
    if (ws) {
        ws.send(JSON.stringify({ action: 'startGame', gameId: id }));
        setIsGameStarted(true);
        startTimer(); // Start the timer when the game starts

        // Fetch the updated game details
        dispatch(getGame(id)).then((updatedGame) => {
            // Ensure updatedGame is not null before accessing its properties
            if (updatedGame) {
                setCurrentTeamOne(updatedGame.teamOne); // Set current team one
                setCurrentTeamTwo(updatedGame.teamTwo); // Set current team two
                setCurrentLeague(updatedGame.leagueName); // Set current league name
            }
        }).catch((error) => {
            console.log('Error fetching updated game details:', error);
        });
    }
};



  const startTimer = () => {
    const timerInterval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentGame = liveGame || game;

  if (!currentGame || !teams || !leagues) {
    return <h3 className='text-center'>LOADING....</h3>;
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: 'Times New Roman', textAlign: 'center' }}>GAME DETAILS</h5>

      <Card className="mt-4 text-center">
  {/* Card for initial page state */}
  {!isGameStarted ? (
    <Card.Body>
      <Card.Title><SampleT gameId={game.teamOne} teams={teams} /> vs {" "} <SampleT gameId={game.teamTwo} teams={teams} /> </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <SampleLeague leagueId={game.leagueName} leagues={leagues} />
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item>Time: {game.gameTime}</ListGroup.Item>
        <ListGroup.Item>Venue: {game.gameVenue}</ListGroup.Item>
        
      </ListGroup>

      <Button variant="success" onClick={handleStartGame} disabled={isGameStarted}>
        Start Game
      </Button>
    </Card.Body>
  ) : (
    // Card for game details after starting the game
    <Card.Body>
      <Card.Title>
        <TeamName teamId={currentTeamOne} teams={teams} /> vs{" "}
        <TeamName teamId={currentTeamTwo} teams={teams} />
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <LeagueName leagueId={currentLeague} leagues={leagues} />
      </Card.Subtitle>
      <ListGroup variant="flush">
        <ListGroup.Item>Time: {currentGame.gameTime}</ListGroup.Item>
        <ListGroup.Item>Venue: {currentGame.gameVenue}</ListGroup.Item>
        <ListGroup.Item>Score: {currentGame.score || "0-0"}</ListGroup.Item>
        <ListGroup.Item>Live Game Time: {formatTime(timer)}</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  )}
</Card>

      
    </Container>
  );
  
 
}

// TeamName and LeagueName components remain unchanged

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


const SampleT = ({gameId, teams}) => {

  

  const team = useMemo(() => teams.find((t) => t._id === gameId), [teams, gameId]);

  


  if (!team) {
    return <span>Loading team...</span>;
  }

  return <span>{team.teamName}</span>;
  

}



const SampleLeague = ({ leagueId, leagues }) => {
  const league = useMemo(() => leagues.find((l) => l._id === leagueId), [leagues, leagueId]);

  if (!league) {
    return <span>Loading league...</span>;
  }

  return <span>{league.leagueName}</span>;
};
