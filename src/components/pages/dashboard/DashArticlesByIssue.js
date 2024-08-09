import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { articlesByMagIssue } from '../../../redux/actions/magazineAction'

export default function DashArticlesByIssue() {
const {id} = useParams()
const dispatch = useDispatch()
const articlesByIssue = useSelector((state) => state.magRdcr.articlesByIssue)

useEffect(() => {

    const fetchArticlesByIssue = async() => {

        try {

            await dispatch(articlesByMagIssue(id))
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchArticlesByIssue()



}, [dispatch, id])


if(!articlesByIssue || articlesByIssue === undefined || articlesByIssue === null) {

    return(<>
    <h4 className='text-center mt-2'>articles are loading</h4>
    
    
    </>)

}


if(articlesByIssue && articlesByIssue.length === 0 ) {

    return(<>
    <h4 className='text-center mt-2'>there are no articles at the moment, create<a href='/new_mag_issue'> some</a> </h4>
    
    
    </>)

}



  return (
    <>
        <div className="container">
            
      <ul className="list-group list-group-flush d-flex justify-content-center">
        {articlesByIssue.map((article) => (
          <li key={article._id} className="list-group-item text-center">
            <a href={`/article_single/${article._id}`}>
            {article.articleTitle}


            </a>
          </li>
        ))}
      </ul>
    </div>

    
    
    
    
    
    </>
  )
}
