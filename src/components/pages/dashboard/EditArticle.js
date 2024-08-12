import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../../redux/actions/magazineAction';

export default function EditArticle() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const erasingArticle = async(e) => {
    e.preventDefault()

    await dispatch(deleteArticle(id))
  }

  return (
    <Container className="mt-3 mb-3 text-center">
      <h5 style={{ fontFamily: 'Times New Roman' }}>Select Action</h5>

      <ListGroup className="mt-3">
        <ListGroup.Item className="text-center">
          <a href={`/edit_article_content/${id}`}>Edit Article Content</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href={`/edit_article_author/${id}`}>Edit Article Author</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <a href={`/edit_article_title/${id}`}>Edit Article Title</a>
        </ListGroup.Item>

        <ListGroup.Item className="text-center">
          <Button variant="danger" onClick={handleShowModal}>
            Delete Article
          </Button>
        </ListGroup.Item>
      </ListGroup>

      <br></br>
      <br></br>
      <br></br>
      <br></br>



      {/* Modal for Deleting Article */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this article?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={erasingArticle}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
