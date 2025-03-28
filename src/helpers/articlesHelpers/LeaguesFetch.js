// football function......

import { ApiUrl } from "../ApiUrl";

export async function fetchAllLeagues() {
    try {
        const response = await fetch(`${ApiUrl}/public_show_leagues`)

        if(!response.ok) {
            console.log("there was  a problem fetching leagues")
        }

        return await response.json()

        
    } catch (error) {
        console.log("error fetching leagues", error)
    
        return { error: true, message: error.message }
        
    }
}


export async function fetchLeagueSingle(id) {

    try {
        const response = await fetch(`${ApiUrl}/public_show_league/${id}`)

        if(!response.ok) {
            console.log("there was a problem fetching the league")
        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem fetching the league: ${error}`)
    }
    
}



export async function fetchTeams() {

    try {

        const response = await fetch(`${ApiUrl}/public_show_teams`)

        if(!response.ok) {
            console.log(`there was a problem fetching teams`)
        }


        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem while fetching teams ${error}`)
    }
    
}

export async function fetchAllTables() {

    try {

        const response = await fetch(`${ApiUrl}/tables_all`)

        if(!response.ok) {
            console.log(`there was a problem fetching tables`)
        }


        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem while fetching tables ${error}`)
    }
    
}



export async function fetchAllGames() {

    try {

        const response = await fetch(`${ApiUrl}/public_show_games`)

        if(!response.ok) {
            console.log(`there was a problem fetching games`)
        }


        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem while fetching games ${error}`)
    }
    
}



export async function fetchGamesByLeague(id) {

    try {
        const response = await fetch(`${ApiUrl}/public_show_games_by_league/${id}`)

        if(!response.ok) {

            console.log(`there was a problem fetching games by league`)
        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem while fetching teams by league ${error}`)
    }
    
}


export async function fetchLeague(id) {

    try {

        const response = await fetch(`${ApiUrl}/public_show_league/${id}`)

        if(!response.ok) {
            console.log(`problem fetching league`)
        }
        
        return await response.json()

    } catch (error) {
        console.log(`problem fetching league ${error}`)
    }
    
}


export async function fetchLeagueResults(id) {

    try {

        const response = await fetch(`${ApiUrl}/results_by_league_name/${id}`)

        if(!response.ok) {
            console.log("there was a problem fetching the results")
        }

        return await response.json()
        
    } catch (error) {
        console.log(`there was a problem fetching the results ${error}`)
    }
    
}


export async function fetchLeagueTable(id) {

    try {

        const response = await fetch(`${ApiUrl}/table_get_single/${id}`)

        if(!response.ok) {
            console.log('problem fetching the table')
        }

        return await response.json()
        
    } catch (error) {
        console.log(`problem fetching the table ${error}`)
    }
}



export async function fetchSingleGame(id) {

    try {

        const response = await fetch(`${ApiUrl}/public_show_game/${id}`)

        if(!response.ok) {
            console.log(`problem fetching game`)
        }
        
        return await response.json()

    } catch (error) {
        console.log(`problem fetching game ${error}`)
    }
    
}


export async function fetchTeamSingle(id) {

    try {
        const response = await fetch(`${ApiUrl}/public_show_team/${id}`)

        if(!response.ok) {
            console.log("there was a problem fetching the team")
        }

        return await response.json()
        
    } catch (error) {
        console.log(`failure to fetch team ${error}`)
    }
    
}