import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { articleByMagIssue } from '../../../redux/actions/magazineAction'
import moment from 'moment/moment'



export default function DashArticleSingle() {
const{id} = useParams()
const dispatch = useDispatch()

const articleByIssue = useSelector((state) => state.magRdcr.articleByIssue)

useEffect(() => {

    const fetchArticleByIssue = async() => {

        try {

            await dispatch(articleByMagIssue(id))
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchArticleByIssue()



}, [dispatch, id])


if(!articleByIssue || articleByIssue === undefined || articleByIssue === null) {

    return(<>
    <h4 className='text-center mt-2'>articles are loading</h4>
    
    
    </>)

}



  return (
    <>

<div className="container mt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-md-9 mb-4">
          <article>
            <div className='text-center'>
            <img 
              src={articleByIssue.articlePhoto} 
              alt="Article Poster" 
              className="img-fluid mb-3 blog-photo" 

              width="50%"
            />
            </div>
            <div className="post-content">
              <h3>{articleByIssue.articleTitle}</h3>
              <ul className="post-meta list-inline">
                <li className="list-inline-item">
                  <i className="fa fa-user-circle-o"></i> 
                  <a href="javascript:void(0)" onClick={(e) => e.preventDefault()}>{articleByIssue.articleAuthor}</a>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-calendar-o"></i> 
                  < a href="javascript:void(0)" onClick={(e) => e.preventDefault()}>{moment(articleByIssue.createdAt).format("MMM D YYYY")}</a>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-tags"></i> 
                  <a href={`/edit_article/${articleByIssue._id}`}><i className="bi bi-pen-fill"></i> Edit Article</a>
                </li>
              </ul>
              <p>{articleByIssue.articleContent}</p>
              
            </div>
          </article>
        </div>
      </div>
    </div>




    </>
  )
}
