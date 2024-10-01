import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { publicGetGenres, publicNewMagIssue } from '../../../redux/actions/publicAction'
import moment from 'moment/moment';
import { articlesAll, magShowAll } from '../../../redux/actions/magazineAction';
import Loader from './Loader';
import { Pagination } from 'react-bootstrap';




export default function Home() {
    
    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const categories = useSelector((state) => state.publicRdcr.categories)
    const newIssue = useSelector((state) => state.publicRdcr.newIssue)
    const articles = useSelector((state) => state.magRdcr.articles)
    const magIssues = useSelector((state) => state.magRdcr.magIssues)

    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const articlesPerPage = 6; // 6 articles per page


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


    useEffect(() => {

      const fetchData = async() => {

        try {

          await dispatch(magShowAll())
          
        } catch (error) {
          console.error("there was a problem")
        }

      }

      fetchData()


    }, [dispatch])


    const handleSearchChange = (e) => {
      const value = e.target.value;
      setQuery(value);


      if(value.length > 0) {
        
        const articleSuggestions = articles?.filter(article => 
          article.articleTitle.toLowerCase().includes(value.toLowerCase())
        );
        const issueSuggestions = magIssues?.filter(issue => 
          issue.magazineIssue.toLowerCase().includes(value.toLowerCase())
        );
  
        setSuggestions([...articleSuggestions, ...issueSuggestions]);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (query.length > 0) {
        dispatch(magShowAll(query)); 
        dispatch(articlesAll(query)); 
      }
    };


    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles?.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   
  


    if(!categories || categories === undefined || categories === null) {
        return ""
    }


    if(!newIssue) {
       return "" 
    } 

    if(!articles) {
        return(<>
        
        <Loader />
        </>)
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
    
        

<div className="widget">
      <h5 className="widget-title"><span>Search</span></h5>
      <form onSubmit={handleSubmit} className="widget-search">
        <input
          id="search-query"
          name="s"
          type="search"
          value={query}
          onChange={handleSearchChange}
          placeholder="Type &amp; Hit Enter..."
        />
        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
      
      {suggestions.length > 0 && (
        <ul className="suggestions-list" style={{listStyle: "none"}}>
          {suggestions.map((item, index) => (
            <li key={index}>
            <a href={`post-details/${item._id}`} > {item.articleTitle} </a>
            </li>
          ))}
        </ul>
      )}
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

        {/* here */}


        <div className="widget">
          <h5 className="widget-title"><span>Magazine Issues</span></h5>
          <ul className="list-unstyled widget-list">

          {
                        magIssues?.map((mag) => (
                            <li key={mag._id}><a className="d-flex" href={`/show_all_mag_issue_articles/${mag._id}`}>{mag.magazineIssue}</a></li>

                        ))
                    }
          </ul>
        </div>

    
        <div className="widget">
          <h5 className="widget-title"><span>International Football Leagues</span></h5>
          <ul className="list-inline widget-list-inline">
            <li className="list-inline-item"><a href='#!'>EPL</a></li>
            <li className="list-inline-item"><a href='#!'>La Liga</a></li>
            <li className="list-inline-item"><a href='#!'>Serie A</a></li>
            <li className="list-inline-item"><a href='#!'>Bundesliga</a></li>
            <li className="list-inline-item"><a href='#!'>Ligue 1</a></li>
            
          </ul>
        </div>


        <div className="widget">
          <h5 className="widget-title"><span>Local Football Leagues</span></h5>
          <ul className="list-inline widget-list-inline">
            <li className="list-inline-item"><a href='#!'>TNM Super League</a></li>
            <li className="list-inline-item"><a href='#!'>FDH Bank</a></li>
            <li className="list-inline-item"><a href='#!'>Airtel Top 8</a></li>
            <li className="list-inline-item"><a href='#!'>Castel Cup</a></li>
            
            
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
              
                <img loading="lazy" className="mr-3 panoramic-image" src={issue.magazinePhoto} alt="post-thumb" width="70%" />
              
              <div className="media-body">
                <h2 className="h6 mb-0"><a href={`/show_all_mag_issue_articles/${issue._id}`}>{issue.magazineIssue}</a></h2>
                <h4 className="h6 mb-0"><a href={`/read_magazine/${issue._id}`}>Read Magazine</a></h4>
                <small>released on{moment(issue.createdAt).format("MMM D YYYY")}</small>
              </div>
            </li>


                ))
            }

          </ul>
          
        </div>


        </div>

        <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0">

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
                                                    className="img-fluid panoramic-image"
                                                    alt="post-thumb"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 mx-auto">
                                            <h3>
                                                <a className="post-title" href={`/post-details/${article._id}`}>
                                                    {article.articleTitle}
                                                </a>
                                            </h3>
                                            <ul className="list-inline post-meta mb-4">
                                                <li className="list-inline-item">
                                                    <i className="ti-user mr-2"></i>
                                                    <a href="author.html">{article.articleAuthor}</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    Date : {moment(article.createdAt).format("MMM D YYYY")}
                                                </li>
                                            </ul>
                                            <ArticleBody article={article} />
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


  
  
  </>)

}

