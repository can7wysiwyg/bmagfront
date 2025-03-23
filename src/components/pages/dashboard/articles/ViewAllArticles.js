import React, { useEffect, useState } from 'react';
import { bmagtoken } from '../../../../helpers/Bmag';
import { fetchArticles } from '../../../../helpers/articlesHelpers/ArticlesFetch';

export default function ViewAllArticles() {
        const [articles, setArticles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4; // Display 4 articles per page

    // Fetch articles on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await fetchArticles()
              if(data && !data.error) {
                setArticles(data?.articles)
              }
              
            } catch (error) {
                console.error("There was a problem", error);
            }
        };
        fetchData();
    }, []);

    // Pagination Logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles?.slice(indexOfFirstArticle, indexOfLastArticle);

    const totalPages = Math.ceil(articles?.length / articlesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!articles || !bmagtoken) {
        return "";
    }

    return (
        <>
            <div className="container">
                <h5 className="widget-title text-center mt-4"><span>All Articles</span></h5>
                <div className="row">
                    {currentArticles?.map((item) => (
                        <div key={item._id} className="col-md-6 col-lg-3 mb-4">
                            <div className="card h-100">
                                <img
                                    src={item.articlePhoto}
                                    className="card-img-top"
                                    alt={item.articleTitle}
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h6 className="card-title">{item.articleTitle}</h6>
                                    <a href={`/article_single/${item._id}`} className="btn btn-outline-primary">manage article</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <li key={pageNumber + 1} className={`page-item ${currentPage === pageNumber + 1 ? 'active' : ''}`}>
                                <h2 onClick={() => paginate(pageNumber + 1)} className="page-link" style={{cursor: "pointer"}}>
                                    {pageNumber + 1}
                                </h2>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
