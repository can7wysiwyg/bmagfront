import React, { useEffect, useState } from 'react'
import { Dropdown, Button, ListGroup } from 'react-bootstrap';
import {  getLeagues, getTeams } from '../../../../redux/actions/soccerAction';
import { useDispatch, useSelector } from 'react-redux';
import { bmagtoken } from '../../../../helpers/Bmag';
import { ApiUrl } from '../../../../helpers/ApiUrl';


export default function CreateTable() {
   const dispatch = useDispatch()

   const teams = useSelector((state) => state.soccerRdcr.teams);
   const leagues = useSelector((state) => state.soccerRdcr.leagues);
 
   const [selectedLeague, setSelectedLeague] = useState(null);
   const [selectedTeams, setSelectedTeams] = useState([]);
 
   useEffect(() => {
     
    const fetchData = async() => {
       await dispatch(getTeams());
      await  dispatch(getLeagues());

    }

    fetchData()


     
   }, [dispatch]);
 
   const handleLeagueSelect = (league) => {
     setSelectedLeague(league);
     setSelectedTeams([]); // Reset selected teams when a new league is selected
   };
 
   const handleTeamSelect = (team) => {
     if (!selectedTeams.includes(team._id)) {
       setSelectedTeams([...selectedTeams, team._id]);
     }
   };


   const handleSubmit = async () => {
        try {
      const response = await fetch(`${ApiUrl}/admin_soccer_table_create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bmagtoken}`
        },
        body: JSON.stringify({ leagueId: selectedLeague, teamIds: selectedTeams }),
      });
      const data = await response.json();
      // Handle the response as needed
      alert(data.msg);
      window.location.href = "/local_football_dashboard"
    } catch (error) {
      console.error('Error submitting teams:', error);
    }
  };



   

   if(!leagues || !teams) {
    return(<>
    
    <h4 className='text-center'>data is loading</h4>
    </>)
   }
 

   
  return (
    <>

<div>
      <h3>Select League and Teams</h3>
      <div className='text-center'>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-league">
          {selectedLeague ? `League: ${selectedLeague.leagueName}` : 'Select League'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {leagues?.map((league) => (
            <Dropdown.Item key={league._id} onClick={() => handleLeagueSelect(league)}>
              {league.leagueName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <h5>Select Teams:</h5>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-team">
          Select Team
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {teams?.map((team) => (
              <Dropdown.Item key={team._id} onClick={() => handleTeamSelect(team)}>
                {team.teamName}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      </div>

      <h5>Selected Teams:</h5>
      <ListGroup>
        {selectedTeams.map((teamId) => {
          const team = teams?.find((t) => t._id === teamId);
          return <ListGroup.Item key={teamId}>{team ? team.teamName : 'Unknown Team'}</ListGroup.Item>;
        })}
      </ListGroup>

      <Button onClick={handleSubmit} disabled={!selectedLeague || selectedTeams.length === 0}>
        Submit Teams
      </Button>
    </div>

    
    
    
    
    </>
  )
}
