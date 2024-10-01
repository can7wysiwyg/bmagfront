import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { watchVideos } from '../../../redux/actions/publicAction';
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap'; // Import Bootstrap components

export default function Videos() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.publicRdcr.videos); // Adjust the state according to your Redux setup

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 8; // 8 videos per page

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

    if (!videos) {
        return (
            <Container className="text-center" style={{ marginTop: "2rem" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    // Get the current videos for the page
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos?.slice(indexOfFirstVideo, indexOfLastVideo);

    // Function to handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container style={{ marginTop: "2rem", marginBottom: "5rem" }}>
            <h2 className='text-center mb-4'>Videos</h2>
            <Row>
                {currentVideos.map((video) => (
                    <Col key={video._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        {/* Responsive columns */}
                        <div className="card">
                            <video
                                src={video.videoLink}
                                controls
                                className="card-img-top panoramic-video" // Bootstrap styling
                            />
                            <div className="card-body">
                                <a href={`/view_video/${video._id}`} className="card-title">{video.videoName}</a>
                                <p className="card-text">Click to watch the video.</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <PaginationComponent
                totalVideos={videos.length}
                videosPerPage={videosPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </Container>
    );
}

// Pagination component
const PaginationComponent = ({ totalVideos, videosPerPage, currentPage, handlePageChange }) => {
    const pageNumbers = [];

    // Calculate total pages
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination className="justify-content-center">
            {pageNumbers.map((number) => (
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};
