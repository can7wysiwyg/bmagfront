import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import { fetchArticle } from '../../../../helpers/articlesHelpers/ArticlesFetch'



export default function DashArticleSingle() {
const{id} = useParams()

const [articleByIssue, setArticleSingle] = useState([])

useEffect(() => {

    const fetchArticleByIssue = async() => {

        try {

         const data =   await fetchArticle(id)

         if(data && !data.error) {
          setArticleSingle(data?.articleSingle)
         }
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchArticleByIssue()



}, [id])


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
              className="img-fluid mb-3 panoramic-image" 

              width="50%"
            />
            </div>
            <div className="post-content">
              <h3>{articleByIssue.articleTitle}</h3>
              <ul className="post-meta list-inline">
                <li className="list-inline-item">
                  <i className="fa fa-user-circle-o"></i> 
                  <a href="!#" onClick={(e) => e.preventDefault()}>{articleByIssue.articleAuthor}</a>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-calendar-o"></i> 
                  < a href="!#" onClick={(e) => e.preventDefault()}>{moment(articleByIssue.createdAt).format("MMM D YYYY")}</a>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-tags"></i> 
                  <a href={`/edit_article/${articleByIssue._id}`}><i className="bi bi-pen-fill"></i> Edit Article</a>
                </li>
              </ul>
              <div className='content' >
              <div dangerouslySetInnerHTML={{ __html: articleByIssue.articleContent }} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>




    </>
  )
}
