import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articlesAll, magShowAll } from '../../../redux/actions/magazineAction';




export default function Search() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const articles = useSelector((state) => state.magRdcr.articles);
  const magIssues = useSelector((state) => state.magRdcr.magIssues);


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
 

  if(!articles) {
    return ""
}

if(!magIssues) {
  return ""
}


  

  return (
    <div style={{marginTop: "4rem", marginBottom: "4rem"}}>

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


    
    
    
    </div>
  )
}
