import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';

export default function PublishMagazine() {
    const [formDatta, setFormData] = useState({ magazineIssue: "" });
    const [magazinePhoto, setMagazinePhoto] = useState(null);
    const [btnText, setBtnText] = useState("PUBLISH MAGAZINE");
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const handleInputChange = (e) => {
        setFormData({
            ...formDatta,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setMagazinePhoto(file);
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);
        setBtnText("MAGAZINE IS PUBLISHING...");

        // Creating formData
        let formData = new FormData();
        formData.append('magazineIssue', formDatta.magazineIssue);
        
        formData.append('magazinePhoto', magazinePhoto);

        
        // Dispatch the action
        try {
        
             await axios.post(`${ApiUrl}/adminmagaroute/create_magazine`, formData, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
             })
            alert("Magazine Published Successfully!");
            window.location.href = "/new_mag_issue"
        } catch (error) {
            console.error("Error publishing magazine", error);
            alert("An error occurred while publishing the magazine.");
        } finally {
            setIsSubmitting(false);
            setBtnText("PUBLISH MAGAZINE"); // Reset button text after submitting
        }
    };

    return (
        <>
            <Container style={{ fontFamily: "sans-serif", marginTop: "2rem", marginBottom: "4rem" }}>
                <h4
                    style={{
                        textAlign: "center",
                        marginBottom: "1rem",
                        color: "red",
                        fontStyle: "cursive",
                    }}
                >
                    Publish New Magazine
                </h4>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Form.Group className="mb-3" controlId="formBasicBookImage">
                                <Form.Label>Upload Magazine Cover Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={handleImageUpload}
                                    required
                                    accept=".png, .jpg, .jpeg, .webp"
                                />
                            </Form.Group>

                            

                            <Form.Group className="mb-3" controlId="formBasicBookAuthor">
                                <Form.Control
                                    type="text"
                                    name="magazineIssue"
                                    value={formDatta.magazineIssue}
                                    onChange={handleInputChange}
                                    placeholder="Write month issue of magazine"
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" disabled={isSubmitting}>
                                {btnText}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
