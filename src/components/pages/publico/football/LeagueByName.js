import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getGamesByLeague, getLeague, getLeagueResults, getTable } from '../../../../redux/actions/soccerAction'

export default function LeagueByName() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const league = useSelector((state) => state.soccerRdcr.league)
    const gamesFromLeague = useSelector((state) => state.soccerRdcr.gamesFromLeague)
    const table = useSelector((state) => state.soccerRdcr.table)
    const results = useSelector((state) => state.soccerRdcr.results)


    useEffect(() => {
      const fetchData = async() => {
       
        await dispatch(getLeague(id))
        await getGamesByLeague(id)
        await getTable(id)
        getLeagueResults(id)

      }
      fetchData()

    }, [dispatch, id])




    
  return (
    <div>LeagueByName</div>
  )
}
