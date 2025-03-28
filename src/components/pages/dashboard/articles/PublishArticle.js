import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchAllCategories } from '../../../../helpers/articlesHelpers/CategoriesFetch';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';


export default function PublishArticle() {
  const [formDatta, setFormDatta] = useState({
    articleAuthor: '',
    articleCategory: '',
    articleContent: '', // Content will be handled by ReactQuill
    articleTitle: ''
  });

  const [articlePhoto, setArticlePhoto] = useState(false);
  const [btnText, setBtnText] = useState('ADD NEW ARTICLE');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const data =  await fetchAllCategories()

      if(data && !data.error) {

        setGenres(data?.categories)
      }
      } catch (error) {
        console.error('There was a problem');
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormDatta({
      ...formDatta,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setArticlePhoto(file);
  };

  const handleQuillChange = (value) => {
    setFormDatta({ ...formDatta, articleContent: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('articlePhoto', articlePhoto);
    formData.append('articleAuthor', formDatta.articleAuthor);
    formData.append('articleCategory', formDatta.articleCategory);
    formData.append('articleContent', formDatta.articleContent); // Use ReactQuill content
    formData.append('articleTitle', formDatta.articleTitle);

    const response = await axios.post(`${ApiUrl}/adminarticleroute/create_new_article`, formData, {
      headers: {
        Authorization: `Bearer ${bmagtoken}`
      }
    })
alert(response.data.msg)
 window.location.href ="/articles_dashboard"

  };

  const chango = () => {
    setBtnText('PUBLISHING NEW ARTICLE...');
  };

  return (
    <Container style={{ fontFamily: 'sans-serif', marginTop: '2rem', marginBottom: '4rem' }}>
      <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'red', fontStyle: 'cursive' }}>
        Write New Article
      </h4>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicBookImage">
              <Form.Label>Upload article image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} required accept=".png, .jpg, .jpeg, .webp" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookAuthor">
              <Form.Control type="text" name="articleAuthor" value={formDatta.articleAuthor} onChange={handleInputChange} placeholder="Article Author" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookTitle">
              <Form.Control type="text" name="articleTitle" value={formDatta.articleTitle} onChange={handleInputChange} placeholder="Article Title" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <ReactQuill theme="snow" value={formDatta.articleContent}
              
              style={{
                height: "300px"
              }}
               onChange={handleQuillChange} placeholder="Write your article content here" />
            </Form.Group>

            <br>
            </br>
            <br>
            </br>

            
            <Form.Group className="mt-5 mb-3" controlId="formBasicBookGenre">
              <Form.Select name="articleCategory" value={formDatta.articleCategory} onChange={handleInputChange} required>
                <option value="">Select Article Category</option>
                {genres?.map((genre) => (
                  <option value={genre._id} key={genre._id}>
                    {genre.genreName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button type="submit" onClick={chango}>
              {btnText}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

