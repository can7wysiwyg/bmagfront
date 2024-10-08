import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { articlesAll, magShowAll } from '../../../redux/actions/magazineAction';
import { publicGetGenres, watchVideos } from '../../../redux/actions/publicAction';
import moment from 'moment/moment';





export default function SideBar() {
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');
    const categories = useSelector((state) => state.publicRdcr.categories)
    const newIssue = useSelector((state) => state.publicRdcr.newIssue)
    const magIssues = useSelector((state) => state.magRdcr.magIssues)
    const articles = useSelector((state) => state.magRdcr.articles)
    const videos = useSelector((state) => state.publicRdcr.videos);

    const dispatch = useDispatch()



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
                const fetchData = async () => {
                    try {
                        await dispatch(watchVideos());
                    } catch (error) {
                        console.error("There was a problem fetching videos.");
                    }
                };
        
                fetchData();
            }, [dispatch]);
               
        


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
  

    



    
  return (
    <>

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

    {/* new magazine issue */}


    <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0 text-center">

      <div className="widget">
          <h5 className="widget-title"><span>Latest Magazine Issue</span></h5>
          <ul className="list-unstyled widget-list">

            {
                newIssue?.map((issue) => (

                    <li key={issue._id} className="media widget-post align-items-center">
              
                <img loading="lazy" className="mr-3 " src={issue.magazinePhoto} 
                alt="post-thumb" 
                style={{
                    height: "auto",
                    width: "200px"
                }}
                />
              
              <div className="media-body">
                <p className=" mb-0">{issue.magazineIssue}</p>
                <p className=" mb-2 text-danger" style={{cursor: "pointer"}}> <a href={`/subscribe_magazine/${issue._id}`}>  read magazine </a></p>
                {/* <h4 className=" mb-0"><a href={`/read_magazine/${issue._id}`}>Read Magazine</a></h4> */}
                <small>released on{moment(issue.createdAt).format("MMM D YYYY")}</small>
              </div>
            </li>


                ))
            }

          </ul>
          
        </div>


        </div>




        



        <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0 text-center">
  <div className="widget">
    <h5 className="widget-title"><span>Latest Video</span></h5>

    {
      videos?.slice(0, 1).map((video) => (
        <div key={video._id}>
          {/* Replace this with your actual video rendering logic */}
          <video controls width="300">
            <source src={video.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>  <a href={`/view_video/${video._id}`}>{video.videoName}</a></p>
        </div>
      ))
    }
  </div>
</div>





    
      


    
         <div className="widget catego-mobile-widget">
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
                            <li key={mag._id}><a className="d-flex" href={`/show_mag_issue/${mag._id}`}>{mag.magazineIssue}</a></li>

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






    </>
  )
}
