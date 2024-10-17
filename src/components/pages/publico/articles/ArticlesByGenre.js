import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ByGenreArticles } from '../../../../redux/actions/magazineAction';
import { publicGetGenre } from '../../../../redux/actions/publicAction';
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap';
import moment from 'moment';

export default function ArticlesByGenre() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const articlesByGenre = useSelector((state) => state.magRdcr.articlesByGenre);
    const category = useSelector((state) => state.publicRdcr.category);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;

    // Fetch articles and category on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(ByGenreArticles(id));
            } catch (error) {
                console.error("There was a problem fetching the articles");
            }
        };
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                await dispatch(publicGetGenre(id));
            } catch (error) {
                console.error("There was a problem fetching the category");
            }
        };
        fetchCat();
    }, [dispatch, id]);

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articlesByGenre?.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    

    if (!category ) {
        return(<>
        <h4 className='text-center' style={{margin: "4rem"}}>there are no articles from this category at the moment</h4>
        </>);
    }


    if (!articlesByGenre ) {
        return(<>
        <h4 className='text-center' style={{margin: "4rem"}}>there are no articles from this category at the moment</h4>
        </>);
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
                                    <Card.Title>
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
