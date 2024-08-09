import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { genreView } from '../../../redux/actions/magazineAction'
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { articleCreate } from '../../../redux/actions/publishAction';


export default function PublishMagazineArticle() {
 const {id} = useParams()

 const[formDatta, setFormDatta] = useState({
    articleAuthor: "",
    articleCategory: "",
    articleContent: "",
    articleTitle: ""
})

const[articlePhoto, setArticlePhoto] = useState(false)

const dispatch = useDispatch()
const genres = useSelector((state) => state.magRdcr.genres)


useEffect(() => {

    const fetchData = async() => {


        try {

            await dispatch(genreView())
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchData()


}, [dispatch])



const handleInputChange = (e) => {
    setFormDatta({
      ...formDatta,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setArticlePhoto(file);
  };


  const handleSubmit = async(event) => {

    event.preventDefault()


    let formData = new FormData()


    formData.append('articlePhoto', articlePhoto)
    formData.append('articleAuthor', formDatta.articleAuthor)
    formData.append('articleCategory', formDatta.articleCategory)
    formData.append('articleContent', formDatta.articleContent)
    formData.append('articleTitle', formDatta.articleTitle)

    await dispatch(articleCreate(formData, id))

  }



  if(!genres || genres === undefined || genres === null) {

    return(<>

    <h6 className="text-center" style={{marginTop: "2rem"}}>book genres are loading</h6>
    
    
    </>)
}  if(genres && genres.length === 0) {

    return(<>

    <h6 className="text-center" style={{marginTop: "2rem"}}>there are no articles catehory, to write an article, you at least need a catgegory to specify the article's category 
        
        <a href="/genres_create">create some categories</a> </h6>
    
    
    </>)
}







  return (
    <>
    <Container style={{ fontFamily: "sans-serif", marginTop: "2rem" }}>
        <h4
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "red",
            fontStyle: "cursive",
          }}
        >
          Write new Article
        </h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicBookImage">
                <Form.Label>Upload article image</Form.Label>
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
                  name="articleAuthor"
                  value={formDatta.articleAuthor}
                  onChange={handleInputChange}
                  placeholder="Article Author"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBookTitle">
                <Form.Control
                  type="text"
                  name="articleTitle"
                  value={formDatta.articleTitle}
                  onChange={handleInputChange}
                  placeholder="Article Title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control
                  as="textarea"
                  rows="32"
                  name="articleContent"
                  value={formDatta.articleContent}
                  onChange={handleInputChange}
                  placeholder="write your new article"
                />
              </Form.Group>

              
              
              <Form.Group className="mb-3" controlId="formBasicBookGenre">
                <Form.Select
                  name="articleCategory"
                  value={formDatta.articleCategory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Article Category</option>
                  {genres?.map((genre) => (
                    <option value={genre._id} key={genre._id}>
                      {genre.genreName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

             
              <Button type="submit">Create Article</Button>
            </Form>
          </Col>
        </Row>
      </Container>




    </>
  )
}
