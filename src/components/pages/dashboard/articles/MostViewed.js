import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { bmagtoken } from '../../../../helpers/Bmag';
import { ApiUrl } from '../../../../helpers/ApiUrl';

export default function MostViewed() {
 const [mostViewed, setMostViewed] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 5;

 useEffect(() => {
   const getMostViewed = async () => {
     const res = await axios.get(`${ApiUrl}/adminarticle/most_viewed_articles`, {
        headers: {
            Authorization: `Bearer ${bmagtoken}`
        }
     });
     setMostViewed(res.data);
   };
   getMostViewed();
 }, []);

 // Get current articles
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = mostViewed.slice(indexOfFirstItem, indexOfLastItem);

 // Change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 return (
   <div className="container mt-5">
     <div className="row">
       <div className="col-md-8 mx-auto">
         <h2 className="mb-4">Most Viewed Articles</h2>
         {currentItems.map((article) => (
           <div key={article._id} className="card mb-3">
             <div className="card-body">
               <h5 className="card-title">{article.articleTitle}</h5>
               <p className="card-text">Views: {article.articleClicks}</p>
             </div>
           </div>
         ))}

         <nav>
           <ul className="pagination justify-content-center">
             {[...Array(Math.ceil(mostViewed.length / itemsPerPage))].map((_, index) => (
               <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                 <button 
                   onClick={() => paginate(index + 1)}
                   className="page-link"
                 >
                   {index + 1}
                 </button>
               </li>
             ))}
           </ul>
         </nav>
       </div>
     </div>
   </div>
 )
}