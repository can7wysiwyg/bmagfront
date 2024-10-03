import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genreView } from '../../../redux/actions/magazineAction';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { articleCreate } from '../../../redux/actions/publishAction';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function PublishArticle() {
  const [formDatta, setFormDatta] = useState({
    articleAuthor: '',
    articleCategory: '',
    articleContent: '', // Content will be handled by ReactQuill
    articleTitle: ''
  });

  const [articlePhoto, setArticlePhoto] = useState(false);
  const [btnText, setBtnText] = useState('ADD NEW ARTICLE');
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.magRdcr.genres);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(genreView());
      } catch (error) {
        console.error('There was a problem');
      }
    };
    fetchData();
  }, [dispatch]);

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

    await dispatch(articleCreate(formData));
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

