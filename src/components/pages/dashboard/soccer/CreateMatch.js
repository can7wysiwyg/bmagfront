import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getLeagues, getTeams } from "../../../../redux/actions/soccerAction";

export default function CreateMatch() {
  const [formData, setFormData] = useState({
    gameTime: '',
    gameVenue: '',
    teamOne: '',
    teamTwo: '',
    leagueName: '' 
  });

  const teams = useSelector((state) => state.soccerRdcr.teams);
  const leagues = useSelector((state) => state.soccerRdcr.leagues);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await dispatch(getTeams());
        await dispatch(getLeagues());
      } catch (error) {
        console.log(`${error}`);
      }
    };

    fetchItems();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createGame(formData));
  };

  if (!teams || !leagues) {
   return(<>
   
   <h3 className="text-center">LOADING....</h3>
   </>)
  }
  


  return (
    <div>
      <div className="container mt-4">
        <h4
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "red",
            fontStyle: "cursive",
          }}
        >
          MAKE FOOTBALL FIXTURE
        </h4>

        <form onSubmit={handleSubmit}>
          {/* Two side-by-side select boxes */}
          <div className="row mb-3">
            <div className="col-md-6">
              <select
                className="form-select"
                name="teamOne"
                value={formData.teamOne}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Team One/Home Team
                </option>
                {teams?.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="teamTwo"
                value={formData.teamTwo}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Team Two/Away Team
                </option>
                {teams?.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* One select box below for League */}
          <div className="mb-3">
            <select
              className="form-select"
              name="leagueName"
              value={formData.leagueName}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                League Name
              </option>
              {leagues?.map((league) => (
                <option key={league._id} value={league._id}>
                  {league.leagueName}
                </option>
              ))}
            </select>
          </div>

          {/* Game Time and Venue */}
          <div className="mb-3">
            <Form.Control
              type="text"
              name="gameTime"
              value={formData.gameTime}
              onChange={handleInputChange}
              placeholder="Match Starting Time"
              required
            />
          </div>

          <div className="mb-3">
            <Form.Control
              type="text"
              name="gameVenue"
              value={formData.gameVenue}
              onChange={handleInputChange}
              placeholder="Match Stadium"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
