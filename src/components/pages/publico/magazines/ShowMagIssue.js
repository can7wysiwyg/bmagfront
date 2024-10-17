import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {  magShowSingle } from '../../../../redux/actions/magazineAction'
import moment from 'moment/moment'
import { Container, Spinner } from 'react-bootstrap'



export default function ShowMagIssue() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue)
   

    useEffect(() => {

        const fetchData = async() => {

            try {
                await dispatch(magShowSingle(id))
                
            } catch (error) {
                console.error("there was a problem")
            }


        }

        fetchData()


    }, [dispatch, id])


   

    if(!singleIssue) {
        return (<>
        
        <Container className="text-center" style={{ marginTop: "2rem" }}>
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
          </Container>
        </>)
    }


    

    


  return (
    <>
    <section className="section">
  <div className="container">
    <article className="row mb-4">
      <div className="col-lg-10 mx-auto mb-4">
        <h1 className="h2 mb-3"> {singleIssue.magazineIssue}</h1>
        
        <ul className="list-inline post-meta mb-3">
        <li className="h3 list-inline-item"><a href={`/read_magazine/${singleIssue._id}`}>Read Magazine</a> </li>
          
          <br></br>
          <li className=" h4list-inline-item">Released on : {moment(singleIssue.createdAt).format("MMM D YYYY")}</li>
          
          
        </ul>
      </div>
      <div className="col-12 mb-3">
        <div className="post-slider">
          <img src={singleIssue.magazinePhoto} className="img-fluid panoramic-image" alt="post-thumb" />
        </div>
      </div>
      
    </article>
  </div>
</section>

    


    </>
  )
}


