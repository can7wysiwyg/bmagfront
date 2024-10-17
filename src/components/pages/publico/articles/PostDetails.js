import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { articleByMagIssue } from '../../../../redux/actions/magazineAction'
import { publicGetGenre} from '../../../../redux/actions/publicAction'
import moment from 'moment/moment'



export default function PostDetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const articleByIssue = useSelector((state) => state.magRdcr.articleByIssue)

    useEffect(() => {

        const fetchArticle = async() => {

            try {

                await dispatch(articleByMagIssue(id))
                
            } catch (error) {
                console.error("there was a problem")
            }

        }

        fetchArticle()


    }, [dispatch, id])


    

    if(!articleByIssue) {
        return(<>
        
        <h5 className='text-center mt-5'>article is loading</h5>
        </>)
    }

  return (

    <>
    <section className="section">
  <div className="container">
    

    <article className="row mb-4">
      <div className="col-lg-10 mx-auto mb-4">
        <h1 className="h2 mb-3">{articleByIssue.articleTitle}</h1>
        <ul className="list-inline post-meta mb-3">
          <li className="list-inline-item">
            <i className="ti-user mr-2"></i>
            <p>{articleByIssue.articleAuthor}</p>
          </li>
          <li className="list-inline-item">Date : {moment(articleByIssue.createdAt).format("MMM D YYYY")}</li>
          <li className="list-inline-item">
            Categories : <a href="#!" className="ml-1"><CatComp article={articleByIssue} /></a>
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
          <img src={articleByIssue.articlePhoto} className="img-fluid panoramic-image" alt="post-thumb" />
        </div>
      </div>
      <div className="col-lg-10 mx-auto">
  <div className="content">
    <div
      dangerouslySetInnerHTML={{ __html: articleByIssue.articleContent }}
    />
  </div>


      
      </div>
    </article>

    </div>
  
</section>


  
</>

    
    
  
  )
}




const CatComp = ({article}) => {

  const dispatch = useDispatch()
  const category = useSelector((state) => state.publicRdcr.category)
  


  useEffect(() => {

    const fetchCat = async() => {

      try {

        await dispatch(publicGetGenre(article.articleCategory))
        
      } catch (error) {
        console.error("there was a problem")
      }

    }

    fetchCat()


  }, [dispatch, article.articleCategory])



  if(!category) {
    return ""
  }

  

  

  return(<>

  
  
  {category.genreName.toUpperCase()}
  
  </>)

} 