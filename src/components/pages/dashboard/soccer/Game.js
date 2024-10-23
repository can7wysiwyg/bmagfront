import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGame, getTeams, getLeagues } from '../../../../redux/actions/soccerAction';
import { Container, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { ApiUrl } from '../../../../helpers/ApiUrl';


export default function Game() {
  const { id } = useParams();
  const game = useSelector((state) => state.soccerRdcr.game);
  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);
  const dispatch = useDispatch();

  const [liveGame, setLiveGame] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [ws, setWs] = useState(null);
  
  // New state variables to hold the current game details and timer
  const [currentTeamOne, setCurrentTeamOne] = useState('');
  const [currentTeamTwo, setCurrentTeamTwo] = useState('');
  const [currentLeague, setCurrentLeague] = useState('');
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const [tempTeamOneScore, setTempTeamOneScore] = useState(0);
  const [tempTeamTwoScore, setTempTeamTwoScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [teamOneScorers, setTeamOneScorers] = useState(['']);
const [teamTwoScorers, setTeamTwoScorers] = useState(['']);
const[isBtn, setIsBtn] = useState(false)
const[disAb, setDisabled] = useState(false)



const btnState = () => {
  setIsBtn(true)
}
 



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

  const fetchGameTimers = async () => {
    try {
      const response = await fetch(`${ApiUrl}/api/game_times`);
      const timerData = await response.json();
      // Update timer based on the fetched data
      const gameTimer = timerData.find(timer => timer.gameId === id);
      if (gameTimer) {
        setTimer(gameTimer.elapsedTime); // Set the timer from backend
      }
    } catch (error) {
      console.error('Error fetching game timers:', error);
    }
  };


  

  useEffect(() => {
    fetchGameTimers(); // Initial fetch for the timer

    const interval = setInterval(() => {
      fetchGameTimers(); // Fetch timer every 10 seconds
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [id]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.action === 'gameState') {
          setLiveGame(message.game);
          setTempTeamOneScore(message.game.teamOneScore || 0); // Set initial temp score
          setTempTeamTwoScore(message.game.teamTwoScore || 0); // Set initial temp score
      } else if (message.action === 'gameUpdate') {
          setLiveGame(message.game);
          setTempTeamOneScore(message.game.teamOneScore || 0); // Update temp score
          setTempTeamTwoScore(message.game.teamTwoScore || 0); // Update temp score
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


    // Prompt user when they try to leave the page
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        const confirmationMessage = 'Are you sure you want to leave this page? Your game progress may not be saved.';
        event.returnValue = confirmationMessage; // For most browsers
        return confirmationMessage; // For older browsers
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  


  

  const handleStartGame = (action) => {
    if (ws) {
      ws.send(JSON.stringify({ action, gameId: id }));
      
      if (action === 'startGame') {
        setIsGameStarted(true);
        setDisabled(true)
      } else if (action === 'pauseGame') {
        setIsGameStarted(false);
      } else if (action === 'resumeGame') {
        setIsGameStarted(true);
      } else if (action === 'endGame') {

   window.location.href = "/admin_games"
  
      }
      
      // Fetch the updated game details
      dispatch(getGame(id))
        .then((updatedGame) => {
          if (updatedGame) {
            setCurrentTeamOne(updatedGame.teamOne);
            setCurrentTeamTwo(updatedGame.teamTwo);
            setCurrentLeague(updatedGame.leagueName);
          }
        })
        .catch((error) => {
          console.log(`Error handling ${action} for the game:`, error);
        });
    }
  };
  

 
  const currentGame = liveGame || game;



  const handleTeamOneScorerChange = (index, value) => {
    const updatedScorers = [...teamOneScorers];
    updatedScorers[index] = value;
    setTeamOneScorers(updatedScorers);
  };
  
  const handleTeamTwoScorerChange = (index, value) => {
    const updatedScorers = [...teamTwoScorers];
    updatedScorers[index] = value;
    setTeamTwoScorers(updatedScorers);
  };
  
  // Modify the goal update function to send scorer data
  const handleGoalUpdate = () => {
    if (ws) {
      ws.send(JSON.stringify({
        action: 'updateGoals',
        gameId: id,
        teamOneScore: teamOneScore + parseInt(tempTeamOneScore, 10),
        teamTwoScore: teamTwoScore + parseInt(tempTeamTwoScore, 10),
        teamOneScorers: teamOneScorers.filter(scorer => scorer), // Filter out empty strings
        teamTwoScorers: teamTwoScorers.filter(scorer => scorer),
      }));
  
      // Update the actual scores after sending the update
      setTeamOneScore(prevScore => prevScore + parseInt(tempTeamOneScore, 10));
      setTeamTwoScore(prevScore => prevScore + parseInt(tempTeamTwoScore, 10));
      
      // Reset the temporary score inputs
      setTempTeamOneScore(0);
      setTempTeamTwoScore(0);
    }
  };
  
  

  if (!currentGame || !teams || !leagues) {
    return <h3 className='text-center'>LOADING....</h3>;
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 style={{ fontFamily: 'Times New Roman', textAlign: 'center' }}>GAME DETAILS</h5>

      <Card className="mt-4 text-center">
        {!isBtn ? (
          <Card.Body>
            <Card.Title><SampleT gameId={game.teamOne} teams={teams} /> vs {" "} <SampleT gameId={game.teamTwo} teams={teams} /> </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <SampleLeague leagueId={game.leagueName} leagues={leagues} />
            </Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>Time: {game.gameTime}</ListGroup.Item>
              <ListGroup.Item>Venue: {game.gameVenue}</ListGroup.Item>
            </ListGroup>

            <Button variant="success" onClick={btnState} >
              Start The Game Game
            </Button>
          </Card.Body>
        ) : (
          <Card.Body>
            {/* <Button variant="success" onClick={handleStartGame} disabled={isGameStarted}>
              Start Game
            </Button> */}

<button className='success' onClick={() => handleStartGame('startGame')} disabled={disAb}>Start Game</button>
<button className='primary' onClick={() => handleStartGame('pauseGame')}>Pause Game</button>
<button className='secondary' onClick={() => handleStartGame('resumeGame')}>Resume Game</button>
<button className='danger' onClick={() => handleStartGame('endGame')}>End Game</button>


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
              <ListGroup.Item>Score: {`${teamOneScore}-${teamTwoScore}`}</ListGroup.Item>
              <ListGroup.Item>Live Game Time: {timer}</ListGroup.Item>
            </ListGroup>


            <Form>
  <Form.Group>
    <Form.Label>Home Team Goals</Form.Label>
    <Form.Control
      type="number"
      value={tempTeamOneScore}
      onChange={(e) => setTempTeamOneScore(e.target.value)}
    />
  </Form.Group>

  <Form.Group>
    <Form.Label>Home Team Scorers (default to zero after submitting)</Form.Label>
    {teamOneScorers.map((scorer, index) => (
      <Form.Control
        key={index}
        type="text"
        value={scorer}
        onChange={(e) => handleTeamOneScorerChange(index, e.target.value)}
        placeholder={`Scorer ${index + 1}`}
      />
    ))}
    <Button variant="link" onClick={() => setTeamOneScorers([...teamOneScorers, ''])}>
      Add Scorer
    </Button>
  </Form.Group>

  <Form.Group>
    <Form.Label>Away Team Goal Select (default to zero after submitting)</Form.Label>
    <Form.Control
      type="number"
      value={tempTeamTwoScore}
      onChange={(e) => setTempTeamTwoScore(e.target.value)}
    />
  </Form.Group>

  <Form.Group>
    <Form.Label>Away Team Scorers</Form.Label>
    {teamTwoScorers.map((scorer, index) => (
      <Form.Control
        key={index}
        type="text"
        value={scorer}
        onChange={(e) => handleTeamTwoScorerChange(index, e.target.value)}
        placeholder={`Scorer ${index + 1}`}
      />
    ))}
    <Button variant="link" onClick={() => setTeamTwoScorers([...teamTwoScorers, ''])}>
      Add Scorer
    </Button>
  </Form.Group>

  <Button variant="primary" onClick={handleGoalUpdate}>
    Update Goals
  </Button>
</Form>

            


            
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


}



  const SampleT = ({ gameId, teams }) => {
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

  