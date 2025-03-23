import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import { fetchAllLeagues, fetchTeams } from "../../../../helpers/articlesHelpers/LeaguesFetch";
import axios from "axios";
import { ApiUrl } from "../../../../helpers/ApiUrl";
import { bmagtoken } from "../../../../helpers/Bmag";

export default function CreateMatch() {
  const [fixtures, setFixtures] = useState([
    { gameTime: '', gameVenue: '', teamOne: '', teamTwo: '', leagueName: '' }
  ]);
  const [leagueLocked, setLeagueLocked] = useState(false);

  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
       const allTeams = await fetchTeams()
       const allLeagues = await fetchAllLeagues()

       if(allTeams && allLeagues) {
        setTeams(allTeams?.teams)
        setLeagues(allLeagues?.leagues)
       }
      } catch (error) {
        console.log(`${error}`);
      }
    };
    fetchItems();
  }, []);

  const handleFixtureChange = (index, field, value) => {
    const updatedFixtures = [...fixtures];
    updatedFixtures[index][field] = value;
    setFixtures(updatedFixtures);

    if (field === "leagueName") {
      setLeagueLocked(true);
      // Update all fixtures with the selected league
      setFixtures(updatedFixtures.map(fixture => ({ ...fixture, leagueName: value })));
    }
  };

  const handleAddFixture = () => {
    setFixtures([...fixtures, { gameTime: '', gameVenue: '', teamOne: '', teamTwo: '', leagueName: fixtures[0].leagueName }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await axios.post(`${ApiUrl}/admin_create_game`, fixtures, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`
      }
    })

    window.location.href = "/local_football_dashboard"



  };

  if (!teams || !leagues) {
    return <h3 className="text-center">LOADING....</h3>;
  }

  return (
    <div>
      <div className="container mt-4">
        <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive" }}>
          MAKE FOOTBALL FIXTURES
        </h4>

        <form onSubmit={handleSubmit}>
          {fixtures.map((fixture, index) => (
            <div key={index}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={fixture.teamOne}
                    onChange={(e) => handleFixtureChange(index, "teamOne", e.target.value)}
                    required
                  >
                    <option value="" disabled>Team One/Home Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>{team.teamName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    value={fixture.teamTwo}
                    onChange={(e) => handleFixtureChange(index, "teamTwo", e.target.value)}
                    required
                  >
                    <option value="" disabled>Team Two/Away Team</option>
                    {teams.map((team) => (
                      <option key={team._id} value={team._id}>{team.teamName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  value={fixture.leagueName}
                  onChange={(e) => handleFixtureChange(index, "leagueName", e.target.value)}
                  required
                  disabled={leagueLocked}  // Disable after initial selection
                >
                  <option value="" disabled>League Name</option>
                  {leagues.map((league) => (
                    <option key={league._id} value={league._id}>{league.leagueName}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <Form.Control
                  type="text"
                  value={fixture.gameTime}
                  onChange={(e) => handleFixtureChange(index, "gameTime", e.target.value)}
                  placeholder="Match Starting Time"
                  required
                />
              </div>

              <div className="mb-3">
                <Form.Control
                  type="text"
                  value={fixture.gameVenue}
                  onChange={(e) => handleFixtureChange(index, "gameVenue", e.target.value)}
                  placeholder="Match Stadium"
                  required
                />
              </div>
            </div>
          ))}
<div>
          <button type="button" onClick={handleAddFixture} className="btn btn-secondary mb-3">
            Add Another Fixture
          </button>

          </div>
<div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}
