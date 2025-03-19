import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { fetchAllCategories } from "../../../helpers/articlesHelpers/CategoriesFetch";
import { fetchArticles } from "../../../helpers/articlesHelpers/ArticlesFetch";
import { fetchAllVideos } from "../../../helpers/articlesHelpers/VideosFetch";
import { fetchAllMags, fetchRecentIssue } from "../../../helpers/articlesHelpers/MagazinesFetch";
import { fetchAllLeagues } from "../../../helpers/articlesHelpers/LeaguesFetch";

export default function SideBar() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");
 const [articles, setArticles] = useState([])
   const [categories, setCategories] = useState([])
   const [newIssue, setNewIssue] = useState({})
   const [magIssues, setMagIssues] = useState([])
   const[videos, setVideos] = useState([])
   const[leagues, setLeagues] = useState([])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genres = await fetchAllCategories()
        const news = await fetchArticles()
        const vids = await fetchAllVideos()
        const recentMagIssue = await fetchRecentIssue()
        const allMags = await fetchAllMags()
        const locLeagues = await fetchAllLeagues()

        if(genres && !genres.error && news && !news.error) {
          setCategories(genres?.categories)
          setArticles(news?.articles)
          setVideos(vids?.videos)
          setNewIssue(recentMagIssue?.newIssue)
          setMagIssues(allMags?.magIssues)
          setLeagues(locLeagues.leagues)
        }
        
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchData();
  }, []);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const articleSuggestions = articles?.filter((article) =>
        article.articleTitle.toLowerCase().includes(value.toLowerCase())
      );
      const issueSuggestions = magIssues?.filter((issue) =>
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
      // dispatch(magShowAll(query));
      // dispatch(articlesAll(query));
    }
  };

  console.log(newIssue)

  return (
    <>
      <div className="widget">
        <h5 className="widget-title">
          <span>Search</span>
        </h5>
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
          <ul className="suggestions-list" style={{ listStyle: "none" }}>
            {suggestions?.map((item, index) => (
              <li key={index}>
                <a href={`post-details/${item._id}`}> {item.articleTitle} </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* new magazine issue */}

       <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0 text-center">
        <div className="widget">
          <h5 className="widget-title">
            <span>Latest Magazine Issue</span>
          </h5>
           <ul className="list-unstyled widget-list">
            {newIssue?.map((issue) => (
              <li
                key={issue._id}
                className="media widget-post align-items-center"
              >
                <img
                  loading="lazy"
                  className="mr-3 "
                  src={issue.magazinePhoto}
                  alt="post-thumb"
                  style={{
                    height: "auto",
                    width: "200px",
                  }}
                />

                <div className="media-body">
                  <p className=" mb-0">{issue.magazineIssue}</p>
                  <p
                    className=" mb-2 text-danger"
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <a href={`/subscribe_magazine/${issue._id}`}>
                      {" "}
                      read magazine{" "}
                    </a>
                  </p>

                  <small>
                    released on{moment(issue.createdAt).format("MMM D YYYY")}
                  </small>
                </div>
              </li>
            ))} 
          </ul>
        </div>
      </div>

       <div className="col-lg-8 order-1 order-lg-2 mb-5 mb-lg-0 text-center">
        <div className="widget">
          <h5 className="widget-title">
            <span>Latest Video</span>
          </h5>

          {videos?.slice(0, 1).map((video) => (
            <div key={video._id}>
          
              <video width="300">
                <source src={video.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p>
                {" "}
                <a href={`/subscribe_video/${video._id}`}>watch video</a>
              </p>
            </div>
          ))}
        </div>
      </div> 

      <div className="widget catego-mobile-widget">
        <h5 className="widget-title">
          <span>Categories</span>
        </h5>
        <ul className="list-unstyled widget-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              <a className="d-flex" href={`/article_by_genre/${cat._id}`}>
                {cat.genreName}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* here */}

      <div className="widget">
        <h5 className="widget-title">
          <span>Magazine Issues</span>
        </h5>
        <ul className="list-unstyled widget-list">
          {magIssues?.map((mag) => (
            <li key={mag._id}>
              <a className="d-flex" href={`/subscribe_magazine/${mag._id}`}>
                {mag.magazineIssue}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget">
        <h5 className="widget-title">
          <span>International Football Leagues</span>
        </h5>
        <ul className="list-inline widget-list-inline">
          <li className="list-inline-item">
            <a href="#!">EPL</a>
          </li>
          <li className="list-inline-item">
            <a href="#!">La Liga</a>
          </li>
          <li className="list-inline-item">
            <a href="#!">Serie A</a>
          </li>
          <li className="list-inline-item">
            <a href="#!">Bundesliga</a>
          </li>
          <li className="list-inline-item">
            <a href="#!">Ligue 1</a>
          </li>
        </ul>
      </div>

      <div className="widget">
        <h5 className="widget-title">
          <span>Local Football Leagues</span>
        </h5>
        <ul className="list-inline widget-list-inline">
          {leagues?.map((league) => (
            <li key={league._id} className="list-inline-item">
              <a className="d-flex" href={`/league_by_name/${league._id}`}>
                {league.leagueName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
