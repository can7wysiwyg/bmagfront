import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment';
import Loader from './Loader';
import { Pagination, Container, Spinner } from 'react-bootstrap';
import SideBar from './SideBar';
import { ApiUrl } from '../../../helpers/ApiUrl';
import { fetchArticles } from '../../../helpers/articlesHelpers/ArticlesFetch';




export default function Home() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [newIssue, setNewIssue] = useState({})
  const [magIssues, setMagIssues] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
    
  const articlesPerPage = 6; 

useEffect(() => {

  const fetchAllArticles = async () => {
    const data = await fetchArticles()
    
    if (data && !data.error) {
        setArticles(data.articles)
        
    } else {
        console.log("Failed to fetch articles or received error", data)
    }
}

fetchAllArticles()


}, [])
    
    

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles?.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleClick = async( articleId) => {
      
      
      try {
        await fetch(`${ApiUrl}/articleroute/update_article_clicks/${articleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('Error:', error);
      }
      

    }

   
    if (!articles) {
      return (
          <Container className="text-center" style={{ marginTop: "2rem" }}>
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
          </Container>
      );
  }
  


    if(!categories ) {
        return ""
    }


    if(!newIssue) {
       return "" 
    } 

       if(!magIssues) {
      return ""
  }

  

  return (
    <>



<section className="section">
  <div className="container">
    <div className="row">
      <aside className="col-lg-4 order-2 order-lg-1">

         <SideBar /> 
    
        

        
      </aside>

      
         <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0"> 
        <h5 className="widget-title"><span>Latest Articles</span></h5>

           {/* Display paginated articles */}
           {currentArticles.length === 0 ? (
                                <Loader />
                            ) : (
                                currentArticles.map((article) => (
                                    <article key={article._id} className="row mb-5">
                                        <div className="col-12">
                                            <div className="post-slider">
                                                <img
                                                    loading="lazy"
                                                    src={article.articlePhoto}
                                                    className=" panoramic-image"
                                                    alt="post-thumb"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mx-auto">
                                            <h3  onClick={() => handleClick(article._id)} >
                                          

                                            
                                                  <a className="post-title" href={`/post-details/${article._id}`} 
                                                   >

                                                    {article.articleTitle}
                                                </a>  
                                            </h3>
                                            <ul className="list-inline post-meta mb-4">
                                                <li className="list-inline-item">
                                                    <i className="ti-user mr-2"></i>
                                                    {article.articleAuthor}
                                                </li>
                                                <li className="list-inline-item">
                                                    Date : {moment(article.createdAt).format("MMM D YYYY")}
                                                </li>
                                                <li className='list-inline-item'>
                                                  <a href={`/post_cooments/${article._id}`}>view comments</a>
                                                </li>
                                            </ul>
                                            <ArticleBody article={article}  /> 
                                        </div>
                                    </article>
                                ))
                            )}
                            
                            {/* Pagination controls */}
                            <PaginationComponent
                                articlesPerPage={articlesPerPage}
                                totalArticles={articles.length}
                                paginate={paginate}
                                currentPage={currentPage}
                            />
  
</div>

      

      
    </div>
  </div>
</section>






    </>
  )
}


// Pagination component
const PaginationComponent = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
  }

  return (
      <Pagination className="justify-content-center">
          {pageNumbers.map((number) => (
              <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
              >
                  {number}
              </Pagination.Item>
          ))}
      </Pagination>
  );
};



const ArticleBody = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let articleId = article._id


  const handleClick = async() => {
      
      
    try {
      await fetch(`${ApiUrl}/articleroute/update_article_clicks/${articleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error:', error);
    }
    

  }


  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const { articleContent } = article;
  const maxChars = 100;

  const shouldShowSeeMore = articleContent.length > maxChars;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? articleContent 
            : articleContent.slice(0, maxChars),
        }}
      />
      {shouldShowSeeMore && (
        <span onClick={() => {toggleExpansion(); handleClick();}} >
          {!isExpanded && (
            <a href={`post-details/${article._id}`} className="btn btn-outline-primary">
              continue reading
            </a>
          )}
        </span>
      )}
    </>
  );
};
