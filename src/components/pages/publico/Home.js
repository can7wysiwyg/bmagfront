import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publicGetGenres, publicNewMagIssue } from '../../../redux/actions/publicAction'
import moment from 'moment/moment';
import { articlesAll } from '../../../redux/actions/magazineAction';



export default function Home() {
    
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.publicRdcr.categories)
    const newIssue = useSelector((state) => state.publicRdcr.newIssue)
    const articles = useSelector((state) => state.magRdcr.articles)

    useEffect(() => {

const fetchCats = async()=> {
    try {

        await dispatch(publicGetGenres())
        
    } catch (error) {
        console.error("there was a problem")
    }
}

fetchCats()

    }, [dispatch])


 
   useEffect(() => {

    const fetchNewIssue = async() => {

try {

    await dispatch(publicNewMagIssue())
    
} catch (error) {
    console.error("there was a problem")
}
    }

    fetchNewIssue()


   }, [dispatch]) 


    useEffect(() => {

        const fetchAllArticles = async() => {
            try {


                await dispatch(articlesAll())
                
            } catch (error) {
                console.error("there was a problem")
            }
        }


        fetchAllArticles()
     

    }, [dispatch]);


    if(!categories || categories === undefined || categories === null) {
        return(<>
        <h5 className='text-center mt-5'>categories are loading</h5>
        
        </>)
    }


    if(!newIssue) {
       return "" 
    } 

    if(!articles) {
        return ""
    }

  

  return (
    <>



<section className="section">
  <div className="container">
    <div className="row">
      <aside className="col-lg-4 order-2 order-lg-1">
    
        <div className="widget">
          <h5 className="widget-title"><span>Search</span></h5>
          <form action="/logbook-hugo/search" className="widget-search">
            <input id="search-query" name="s" type="search" placeholder="Type &amp; Hit Enter..." />
            <button type="submit">
              <i className="ti-search"></i>
            </button>
          </form>
        </div>
    
        <div className="widget">
          <h5 className="widget-title"><span>Categories</span></h5>
          <ul className="list-unstyled widget-list">

          {
                        categories?.map((cat) => (
                            <li key={cat._id}><a className="d-flex" href={`/article_by_genre/${cat._id}`}>{cat.genreName}</a></li>

                        ))
                    }
          </ul>
        </div>
    
        <div className="widget">
          <h5 className="widget-title"><span>Tags</span></h5>
          <ul className="list-inline widget-list-inline">
            <li className="list-inline-item"><a href="#!">Booth</a></li>
            <li className="list-inline-item"><a href="#!">City</a></li>
            <li className="list-inline-item"><a href="#!">Image</a></li>
            <li className="list-inline-item"><a href="#!">New</a></li>
            <li className="list-inline-item"><a href="#!">Photo</a></li>
            <li className="list-inline-item"><a href="#!">Seasone</a></li>
            <li className="list-inline-item"><a href="#!">Video</a></li>
          </ul>
        </div>
        
      </aside>

      <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0 text-center">

      <div className="widget">
          <h5 className="widget-title"><span>Latest Magazine Issue</span></h5>
          <ul className="list-unstyled widget-list">

            {
                newIssue?.map((issue) => (

                    <li key={issue._id} className="media widget-post align-items-center">
              <a href="post-elements.html">
                <img loading="lazy" className="mr-3 panoramic-image" src={issue.magazinePhoto} alt="post-thumb" width="70%" />
              </a>
              <div className="media-body">
                <h5 className="h6 mb-0"><a href="post-elements.html">{issue.magazineIssue}</a></h5>
                <small>released on{moment(issue.createdAt).format("MMM D YYYY")}</small>
              </div>
            </li>


                ))
            }

          </ul>
          
        </div>


        </div>


      

      <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0">


       {articles.map(article => (
        <article key={article._id} className="row mb-5">
          <div className="col-12">
            <div className="post-slider">
              
              <img
                loading="lazy"
                src={article.articlePhoto}
                className="img-fluid panoramic-image"
                alt="post-thumb"
              />
            </div>
          </div>
          <div className="col-12 mx-auto">
            <h3>
              <a className="post-title" href={`post-details/${article._id}`}>
                {article.articleTitle}
              </a>
            </h3>
            <ul className="list-inline post-meta mb-4">
              <li className="list-inline-item">
                <i className="ti-user mr-2"></i>
                <a href="author.html">{article.articleAuthor}</a> 
              </li>
              <li className="list-inline-item">
                Date : 
                {moment(article.createdAt).format("MMM D YYYY")}
              </li>
              <li className="list-inline-item">
                Categories : <a href="#!" className="ml-1">General</a>
              </li>
              <li className="list-inline-item">
                Tags : <a href="#!" className="ml-1">Tag1</a>, <a href="#!" className="ml-1">Tag2</a> 
              </li>
            </ul>

            <ArticleBody article={article} />
            
          </div>
        </article>
      ))} 

     
        
      </div>
    </div>
  </div>
</section>






    </>
  )
}


const ArticleBody = ({article}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const {articleContent} = article
  const maxChars = 150

  const shouldShowSeeMore = articleContent.length > maxChars;




  return(<>

<p >
            
            {isExpanded ? articleContent : articleContent.slice(0, maxChars)}
        {shouldShowSeeMore && (
          <span onClick={toggleExpansion}>
            {isExpanded ? `` : <a href={`post-details/${article._id}`} className="btn btn-outline-primary">continue reading</a> }
          </span>
        )}

            </p>


  {/* <p>{article.articleContent}</p> 
            <a href={`post-details/${article.id}`} className="btn btn-outline-primary">
              Continue Reading
            </a> */}
  
  
  </>)

}