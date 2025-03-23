import React from 'react'
import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { fetchAllLeagues, fetchAllTables } from '../../../../helpers/articlesHelpers/LeaguesFetch';

export default function ManageTables() {
    const [tables, setTables] = useState([])

    useEffect(() => {

        const fetchData = async() => {

           const data = await fetchAllTables()

           if(data && !data.error) {
            setTables(data?.tables)
           }
        }

        fetchData()


    }, [])

    if(!tables) {
        return(<>
        <h4 className='text-center'>LOADING....</h4>
        
        </>)
    }


    if(tables.length === 0) {
        return(<>
        <h4 className='text-center'>THERE ARE NO TABLES AT THE MOMENT...</h4>
        
        </>)
    }


    

  return (
    <>
    <Container className="mt-5 mb-5 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select and Manage League Table</h5>

      <ListGroup className="mt-3">
      <ListGroup.Item className="text-center">
          
        </ListGroup.Item>

        {
            Array.isArray(tables) ? tables?.map((table) => (

                <ListGroup.Item className="text-center">
          <a href={`/view_league_table/${table.leagueId}`}><LeagueName leagueId={table.leagueId} /></a>
        </ListGroup.Item>




            )) : <h5>tables are loading</h5>
        }


        
      </ListGroup>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      </Container>







    </>
  )
}


const LeagueName = ({ leagueId }) => {

    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const data = await fetchAllLeagues()
          
          setLeagues(data?.leagues)
        };
        fetchData();
    }, []);

    // Find the league with the matching leagueId
    const matchingLeague = leagues?.find((league) => league._id === leagueId);

    return (
        <>
            {matchingLeague ? (
                <span>{matchingLeague.leagueName}</span>
            ) : (
                <span>League not found</span>
            )}
        </>
    );
};

