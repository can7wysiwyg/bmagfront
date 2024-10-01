import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { publishVideo } from '../../../redux/actions/publishAction';


export default function UploadVideo() {
    const [formData, setFormData] = useState({ videoName: "" });
    const [videoFile, setVideoFile] = useState(null);
    const [btnText, setBtnText] = useState("UPLOAD VIDEO");
    const [isUploading, setIsUploading] = useState(false);
    
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsUploading(true);
        setBtnText("UPLOADING...");

        let videoData = new FormData();
        videoData.append('videoName', formData.videoName);
        videoData.append('videoFile', videoFile);

        await dispatch(publishVideo(videoData));
        setIsUploading(false);
        setBtnText("UPLOAD VIDEO");
    };

    
    return (
        <Container style={{ fontFamily: "sans-serif", marginTop: "2rem", marginBottom: "4rem" }}>
            <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "red", fontStyle: "cursive" }}>
                Upload New Video
            </h4>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Form.Group className="mb-3" controlId="formBasicVideoFile">
                            <Form.Label>Upload Video File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleVideoUpload}
                                required
                                accept="video/mp4, video/mkv, video/avi, video/webm"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicVideoName">
                            <Form.Control
                                type="text"
                                name="videoName"
                                value={formData.videoName}
                                onChange={handleInputChange}
                                placeholder="Enter video name"
                                required
                            />
                        </Form.Group>

                        <Button type="submit" disabled={isUploading}>
                            {btnText}
                        </Button>
                    </Form>

                    <br></br>

                    <br></br>
                    <br></br>

                    <br></br>
                </Col>
            </Row>
        </Container>
    );
}
