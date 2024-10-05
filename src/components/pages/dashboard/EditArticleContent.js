import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { articleByMagIssue, editArticleContent } from '../../../redux/actions/magazineAction';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function EditArticleContent() {
  const { id } = useParams();
  
  const [formData] = useState({
    articleContent: ""
  });

  const dispatch = useDispatch();

  const [checkDesc, setCheckDesc] = useState(""); // For ReactQuill content

  const articleByIssue = useSelector((state) => state.magRdcr.articleByIssue);

  const [btnText, setBtnText] = useState("UPDATE ARTICLE");

  useEffect(() => {
    const fetchArticleByIssue = async () => {
      try {
        await dispatch(articleByMagIssue(id));
      } catch (error) {
        console.error("there was a problem");
      }
    };

    fetchArticleByIssue();
  }, [dispatch, id]);

  const handleInputChange = (value) => {
    setCheckDesc(value); // Quill editor provides the content directly
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.articleContent = checkDesc; // Set the article content

    await dispatch(editArticleContent(formData, id));
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
