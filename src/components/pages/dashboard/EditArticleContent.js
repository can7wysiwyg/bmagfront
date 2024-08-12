import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { articleByMagIssue, editArticleContent } from '../../../redux/actions/magazineAction'
import { Container, Form, Row, Col, Button } from "react-bootstrap";


export default function EditArticleContent() {
    const{id} = useParams()
     const[formData] = useState({
        articleContent: ""
     }) 

     const dispatch = useDispatch()

     const [checkDesc, setCheckDesc] = useState(""); 

     const articleByIssue = useSelector((state) => state.magRdcr.articleByIssue)

useEffect(() => {

    const fetchArticleByIssue = async() => {

        try {

            await dispatch(articleByMagIssue(id))
            
        } catch (error) {
            console.error("there was a problem")
        }


    }

    fetchArticleByIssue()



}, [dispatch, id])

const handleInputChange = (e) => {
    setCheckDesc(e.target.value);
  };


  const handleSubmit = async(event) => {
    event.preventDefault()

    formData.articleContent = checkDesc;


    await dispatch(editArticleContent(formData, id))


  }







if(!articleByIssue || articleByIssue === undefined || articleByIssue === null) {

    return(<>
    <h4 className='text-center mt-2'>articles are loading</h4>
    
    
    </>)

}




  return (
    <>
<Container style={{marginTop: "2rem"}}>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h6>update article </h6>

            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <textarea
                  name="articleContent"
                  defaultValue={articleByIssue.articleContent}
                  onChange={handleInputChange}
                  rows="15"
                  cols="90"
                ></textarea>
              </Form.Group>

              <Button type="submit" variant="danger">
                update article
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <br></br>

      <br></br>
      <br></br>





    </>
  )
}
