import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import CommentSection from './CommentSection'
import { fetchArticle } from '../../../../helpers/articlesHelpers/ArticlesFetch'
import { fetchCategory } from '../../../../helpers/articlesHelpers/CategoriesFetch'



export default function PostDetails() {
    const {id} = useParams()
    
    const [article, setArticle] = useState({})

    useEffect(() => {

        const fetchData = async() => {

            try {

                const data = await fetchArticle(id)
                setArticle(data?.articleSingle)

            } catch (error) {
                console.error("there was a problem")
            }

        }

        fetchData()


    }, [id])


    

    if(!article) {
        return(<>
        
        <div className="text-center spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>
        </>)
    }

  return (

    <>
    <section className="section">
  <div className="container">
    

    <article className="row mb-4">
      <div className="col-lg-10 mx-auto mb-4">
        <h1 className="h2 mb-3">{article?.articleTitle}</h1>
        <ul className="list-inline post-meta mb-3">
          <li className="list-inline-item">
            <i className="ti-user mr-2"></i>
            <p>{article.articleAuthor}</p>
          </li>
          <li className="list-inline-item">Date : {moment(article?.createdAt).format("MMM D YYYY")}</li>
          <li className="list-inline-item">
            Categories : <a href="#!" className="ml-1"><CatComp article={article} /></a>
          </li>
          <li className="list-inline-item">
            Tags : 
            <a href="#!" className="ml-1">Photo</a>, 
            <a href="#!" className="ml-1">Image</a>
          </li>
        </ul>
      </div>
      <div className="col-12 mb-3">
        <div className="post-slider">
          <img src={article.articlePhoto} className="img-fluid panoramic-image" alt="post-thumb" />
        </div>
      </div>
      <div className="col-lg-10 mx-auto">
  <div className="content">
    <div
      dangerouslySetInnerHTML={{ __html: article.articleContent }}
    />
  </div>


      
      </div>

      <div className='text-center'>

        <CommentSection articleId={article._id} />

        
        
        </div> 
    </article>

    </div>
  
</section>


  
</>

    
    
  
  )
}




const CatComp = ({article}) => {

  const [cate, setCate] = useState({})
  const id = article?.articleCategory

  useEffect(() => {

    const fetchCat = async() => {

      try {

        const data = await fetchCategory(id)
         setCate(data?.category)
        
      } catch (error) {
        console.error("there was a problem")
      }

    }

    fetchCat()


  }, [id])



  if(!cate) {
    return ""
  }

  

  

  return(<>

  
  
  {cate?.genreName}
  
  </>)

} 