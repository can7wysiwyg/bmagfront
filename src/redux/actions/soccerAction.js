import axios from "axios"
import { CREATE_GAME, CREATE_LEAGUE, CREATE_TEAM, GAMES_BY_LEAGUE, GET_GAME, GET_GAMES, GET_LEAGUE, GET_LEAGUES, GET_TEAM, GET_TEAMS, SOCCER_ERROR, UPDATE_GAME, UPDATE_LEAGUE, UPDATE_TEAM } from "./types"
import { ApiUrl } from "../../helpers/ApiUrl"
import { bmagtoken } from "../../helpers/Bmag"



// POST ACTIONS


export function createTeam(data) {
    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/admin_create_team`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })


            dispatch({type: CREATE_TEAM})
            alert(response.data.msg)
            window.location.href = "/teams"
            
        } catch (error) {
            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
        }

    }
}


export function createLeague(data) {
    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/admin_create_league`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })


            dispatch({type: CREATE_LEAGUE})
            alert(response.data.msg)
            window.location.href = "/leagues"
            
        } catch (error) {
            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
        }

    }
}



export function createGame(data) {
    return async function(dispatch) {

        try {

            const response = await axios.post(`${ApiUrl}/admin_create_game`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })


            dispatch({type: CREATE_GAME})
            alert(response.data.msg)
            window.location.href = "/games"
            
        } catch (error) {
            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
        }

    }
}

// END POST ACTIONS

// GET ACTIONS


export function getTeams() {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/public_show_teams`)
            const teams = response.data.teams

            dispatch({type: GET_TEAMS, payload: teams})
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }
}



export function getLeagues() {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/public_show_leagues`)
            const leagues = response.data.leagues

            dispatch({type: GET_LEAGUES, payload: leagues})
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }
}


export function getGames() {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/public_show_games`)
            const games = response.data.games

            dispatch({type: GET_GAMES, payload: games })
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }
}


// SINGULAR GETS


// export function getGame(id) {

//     return async function(dispatch) {
//         try {

//             const response = await axios.get(`${ApiUrl}/public_show_game/${id}`)
//             const game = response.data.game

//             dispatch({type: GET_GAME, payload: game })
            
//         } catch (error) {

//             console.log("there was a problem " + error)
//             dispatch({type: SOCCER_ERROR})
//             throw error
            
//         }
//     }
// }



export function getGame(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${ApiUrl}/public_show_game/${id}`);
            const game = response.data.game;
            dispatch({type: GET_GAME, payload: game });
            return game; // Return the fetched game data
        } catch (error) {
            console.log("there was a problem " + error);
            dispatch({type: SOCCER_ERROR});
            throw error;
        }
    }
}


export function getGamesByLeague(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`${ApiUrl}/public_show_games_by_league/${id}`);
            const gamesFromLeague = response.data.gamesFromLeague;
            dispatch({type: GAMES_BY_LEAGUE, payload: gamesFromLeague });
            return gamesFromLeague; // Return the fetched game data
        } catch (error) {
            console.log("there was a problem " + error);
            dispatch({type: SOCCER_ERROR});
            throw error;
        }
    }
}



export function getTeam(id) {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/public_show_team/${id}`)
            const team = response.data.team

            dispatch({type: GET_TEAM, payload: team })
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }
}


export function getLeague(id) {

    return async function(dispatch) {
        try {

            const response = await axios.get(`${ApiUrl}/public_show_league/${id}`)
            const league = response.data.league

            dispatch({type: GET_LEAGUE, payload: league })
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }
}

// END ALL GET METHODS


// START PUT METHODS


export function updateTeam(data, id) {
    return async function(dispatch) {

        try {
            const response = await axios.put(`${ApiUrl}/admin_team_update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            dispatch({type: UPDATE_TEAM})
            alert(response.data.msg)
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }

}


export function updateLeague(data, id) {
    return async function(dispatch) {

        try {
            const response = await axios.put(`${ApiUrl}/admin_league_update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            dispatch({type: UPDATE_LEAGUE})
            alert(response.data.msg)
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }

}



export function updateGame(data, id) {
    return async function(dispatch) {

        try {
            const response = await axios.put(`${ApiUrl}/admin_game_update/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            })

            dispatch({type: UPDATE_GAME})
            alert(response.data.msg)
            
        } catch (error) {

            console.log("there was a problem " + error)
            dispatch({type: SOCCER_ERROR})
            throw error
            
        }
    }

}