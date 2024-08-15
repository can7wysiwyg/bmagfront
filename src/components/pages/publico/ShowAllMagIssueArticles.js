import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { articlesByMagIssue, magShowSingle } from '../../../redux/actions/magazineAction'
import moment from 'moment/moment'


export default function ShowAllMagIssueArticles() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue)
    const articlesByIssue = useSelector((state) => state.magRdcr.articlesByIssue)


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


    useEffect(() => {

        const fetchData = async() => {
               
            await dispatch(articlesByMagIssue(id))


        }

        fetchData()


    }, [dispatch, id])



    if(!singleIssue) {
        return ""
    }


    if(!articlesByIssue) {
        return ""
    }


    


  return (
    <>
    <section className="section">
  <div className="container">
    <article className="row mb-4">
      <div className="col-lg-10 mx-auto mb-4">
        <h1 className="h2 mb-3">Articles from The {singleIssue.magazineIssue}</h1>
        
        <ul className="list-inline post-meta mb-3">
        <li className="list-inline-item"><a href={`/read_magazine/${singleIssue._id}`}>Read Magazine</a> </li>
          
          <br></br>
          <li className="list-inline-item">Released on : {moment(singleIssue.createdAt).format("MMM D YYYY")}</li>
          
          
        </ul>
      </div>
      <div className="col-12 mb-3">
        <div className="post-slider">
          <img src={singleIssue.magazinePhoto} className="img-fluid panoramic-image" alt="post-thumb" />
        </div>
      </div>
      <div className="col-lg-10 mx-auto text-center">
        <div className="content">

            {

                articlesByIssue?.map((item) => (

                    <ShowingArti item={item} />
                ))

            }
          
        </div>
      </div>
    </article>
  </div>
</section>

    


    </>
  )
}


const ShowingArti = ({item}) => {

    return(<>

<div className="widget">
          

    
     <h3 key={item._id}><a className="post-title" href={`/post-details/${item._id}`}>{item.articleTitle}</a></h3>

                    
          
        </div>


    
    </>)
}