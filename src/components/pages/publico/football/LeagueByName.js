import React from 'react'
import { useParams } from 'react-router-dom'

export default function LeagueByName() {
    const {id} = useParams()
    
  return (
    <div>LeagueByName</div>
  )
}