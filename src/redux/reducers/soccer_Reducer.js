import { CREATE_GAME, CREATE_LEAGUE, CREATE_TEAM, DELETE_GAME, GAMES_BY_LEAGUE, GET_GAME, GET_GAMES, GET_LEAGUE, GET_LEAGUE_RESULTS, GET_LEAGUES, GET_TABLE, GET_TABLES, GET_TEAM, GET_TEAMS, SOCCER_TABLE_CREATE, UPDATE_GAME, UPDATE_LEAGUE, UPDATE_TABLE, UPDATE_TEAM } from "../actions/types";

export function soccerRdcr(state={}, action) {
    switch(action.type) {

        case CREATE_GAME:
            return{...state, msg: "success"}

        case SOCCER_TABLE_CREATE:
            return{...state, msg: "success"}    

        case CREATE_LEAGUE:
            return{...state, msg: "success"}
            
        case CREATE_TEAM:
            return{...state, msg: "success"}
            
        case GET_GAMES:
            return{...state, games: action.payload}

        case GAMES_BY_LEAGUE:
            return{...state, gamesFromLeague: action.payload}    
         
        case GET_LEAGUES:
            return{...state, leagues: action.payload}
            
        case GET_TEAMS:
            return{...state, teams: action.payload}
            
        case GET_GAME:
            return{...state, game: action.payload}

        case GET_TABLE:
            return{...state, table: action.payload}    
            
        case GET_LEAGUE:
            return{...state, league: action.payload}

        case GET_TABLES:
            return{...state, tables: action.payload}    
            
        case GET_TEAM:
            return{...state, team: action.payload}

        case GET_LEAGUE_RESULTS:
            return{...state, results: action.payload}    
            
        case UPDATE_GAME:
            return{...state, msg: "success"}   
            
        case UPDATE_TEAM:
            return{...state, msg: "success"}  
            
        case UPDATE_LEAGUE:
            return{...state, msg: "success"} 

        case UPDATE_TABLE:
            return{...state, msg: "success"}    

        case DELETE_GAME:
            return{...state, msg: "success"}    
            
        default:
            return state     
        
         



    }
}