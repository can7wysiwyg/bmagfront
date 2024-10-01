import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { watchVideos } from '../../../redux/actions/publicAction';
import { Container, Row, Col, Spinner } from 'react-bootstrap'; // Import Bootstrap components

export default function Videos() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.publicRdcr.videos); // Adjust the state according to your Redux setup

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

    return (
        <Container style={{ marginTop: "2rem", marginBottom: "5rem" }}>
            <h2 className='text-center mb-4'>Videos</h2>
            <Row>
                {videos.map((video) => (
                    <Col key={video._id} xs={12} sm={6} md={4} lg={3} className="mb-4"> {/* Responsive columns */}
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
        </Container>
    );
}
