import React from 'react'
import { Container, ListGroup } from 'react-bootstrap';


export default function ArticleDashboard() {
  return (
    <div>
        <Container className="mt-5 mb-5 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
      <ListGroup.Item className="text-center">
          <a href={`/add_article`}>Publish New Article</a>
        </ListGroup.Item>


        <ListGroup.Item className="text-center">
          <a href={`/view_all_articles`}>View and Manage Articles</a>
        </ListGroup.Item>
        <ListGroup.Item className="text-center">
          <a href={`/most_viewed_articles`}>Most Viewed Articles</a>
        </ListGroup.Item>

        
        
      </ListGroup>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

</Container>


    </div>
  )
}
