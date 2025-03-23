import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { fetchArticle } from '../../../../helpers/articlesHelpers/ArticlesFetch';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';

export default function EditArticleContent() {
  const { id } = useParams();
  
  const [formData] = useState({
    articleContent: ""
  });


  const [checkDesc, setCheckDesc] = useState(""); 

  const [articleByIssue, setArticleByIssue] = useState({});

  const [btnText, setBtnText] = useState("UPDATE ARTICLE");

  useEffect(() => {
    const fetchArticleByIssue = async () => {
      try {
       const data = await fetchArticle(id)

       if(data && !data.error) {
        setArticleByIssue(data?.articleSingle)
       }
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchArticleByIssue();
  }, [id]);

  const handleInputChange = (value) => {
    setCheckDesc(value); // Quill editor provides the content directly
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.articleContent = checkDesc; // Set the article content

    
    await axios.put(`${ApiUrl}/adminarticleroute/update_content/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`
      }

    })


    window.location.href = `/article_single/${id}`
    
  };

  const chango = () => {
    setBtnText("ARTICLE TEXT IS UPDATING...");
  };

  if (!articleByIssue || articleByIssue === undefined || articleByIssue === null) {
    return (
      <>
        <h4 className="text-center mt-2">articles are loading</h4>
      </>
    );
  }

  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h6>Update Article</h6>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <ReactQuill
                  value={checkDesc || articleByIssue.articleContent} // Initialize with existing content
                  onChange={handleInputChange} // Update content state
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: '1'}, { header: '2'}, { font: [] }],
                      [{ list: 'ordered'}, { list: 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      [{ 'color': [] }, { 'background': [] }],
                      ['link', 'image'],
                      ['clean']
                    ]
                  }}
                  style={{ height: '300px' }} // Adjust as necessary
                />
              </Form.Group>
<br>

</br>

<br>


</br>
              <br>
              
              </br>

              <Button type="submit" variant="danger" onClick={chango}>
                {btnText}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <br />
      <br />
      <br />
    </>
  );
}
