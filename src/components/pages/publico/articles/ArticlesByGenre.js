import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import moment from 'moment';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { fetchArticlesByGenre } from '../../../../helpers/articlesHelpers/ArticlesFetch';
import { fetchCategory } from '../../../../helpers/articlesHelpers/CategoriesFetch';


export default function ArticlesByGenre() {
    const { id } = useParams();
        const [articlesByGenre, setArticlesByGenre] = useState([]);
    const [category, setCategory] = useState([]);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;

    // Fetch articles and category on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
               const data = await fetchArticlesByGenre(id)

               setArticlesByGenre(data?.articlesByGenre)

               
            } catch (error) {
                console.error("There was a problem fetching the articles");
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchCat = async () => {
            try {
             const data =  await fetchCategory(id);
              
             setCategory(data?.category)

            } catch (error) {
                console.error("There was a problem fetching the category");
            }
        };
        fetchCat();
    }, [id]);


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
    

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articlesByGenre?.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    if (!category ) {
        return(<div className="text-center" style={{margin: 30}}>
        <h4 className='text-center' style={{margin: "4rem"}}>no data</h4>
        </div>);
    }


    if (!articlesByGenre ) {
        return(<div className="text-center" style={{margin: 30}}>
        <h4 className='text-center' style={{margin: "4rem"}}>No Data</h4>
        </div>);
    }


    return (
        <Container className='mt-3'>
            <div className="widget">
                <h5 className="widget-title">
                    <span>Articles from the {category.genreName} category</span>
                </h5>
                <Row>
                    {currentArticles.map((article) => (
                        <Col md={3} sm={6} key={article._id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={article.articlePhoto} alt={article.articleTitle} />
                                <Card.Body>
                                    <Card.Title onClick={() => handleClick(article._id)}>
                                        <a href={`/post-details/${article._id}`}>{article.articleTitle}</a>
                                    </Card.Title>
                                    <Card.Text>
                                        Posted on {moment(article.createdAt).format('MMM D, YYYY')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Pagination */}
                <PaginationComponent
                    articlesPerPage={articlesPerPage}
                    totalArticles={articlesByGenre.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </Container>
    );
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
