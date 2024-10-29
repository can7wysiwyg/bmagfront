import React from 'react'
import { useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLeagues, getTables } from '../../../../redux/actions/soccerAction';

export default function ManageTables() {
    const dispatch = useDispatch()
    const tables = useSelector((state) => state.soccerRdcr.tables)

    useEffect(() => {

        const fetchData = async() => {

            await dispatch(getTables())

        }

        fetchData()


    }, [dispatch])

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
    const dispatch = useDispatch();
    const leagues = useSelector((state) => state.soccerRdcr.leagues);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getLeagues());
        };
        fetchData();
    }, [dispatch]);

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

