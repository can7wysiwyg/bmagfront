import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { magShowSingle } from '../../../redux/actions/magazineAction';
import moment from 'moment/moment';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import { sendSubData } from '../../../redux/actions/subscriptionAction';
import MyMagazines from './MyMagazines';

export default function SubscribeMagazine() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue);
    const [magazineId, setMagazineId] = useState(null); // Initialize state

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        transactionId: '',
        email: '',
        phonenumber: '', 
        paymentMethod: '',
        magazineId: id

         
    });

    useEffect(() => {
        const fetchMaga = async () => {
            try {
                await dispatch(magShowSingle(id));
            } catch (error) {
                console.error("There was a problem");
            }
        };
        fetchMaga();
    }, [dispatch, id]);



    useEffect(() => {
        const storedTokens = JSON.parse(localStorage.getItem('subscriptions')) || [];
        
        storedTokens.forEach(subscription => {
            const token = subscription.token;
            const id = token.split('-').pop(); // Get the magazine ID
            setMagazineId(id); // Update the state with the magazine ID
        });

    }, []);

    

    if(id === magazineId) {

return(<>

<MyMagazines />

</>)

    }

            
       
    


    if (!singleIssue) {
        return "";
    }

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        console.log('Form Data Submitted:', formData);

        await dispatch(sendSubData(formData, id))
        
          
        handleClose(); 
    };

    return (
        <>
            <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img
                            src={singleIssue.magazinePhoto}
                            alt="magacover"
                            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{singleIssue.magazineIssue}</h5>
                            <p className="card-text">
                                Released on {moment(singleIssue.createdAt).format('MMM D YYYY')}
                            </p>
                            <Button variant="primary" onClick={handleShow}>
                                Choose a Subscription Method
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a Subscription Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formTransactionId">
                            <Form.Label>Transaction ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="transactionId" 
                                value={formData.transactionId} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>

                        <Form.Group controlId="formToken">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="phonenumber" 
                                value={formData.phonenumber} 
                                onChange={handleChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formMethod">
                            <Form.Label>Select Mobile Money Carier Used</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="paymentMethod" 
                                value={formData.paymentMethod} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select  </option>
                                <option value="tnmMpamba">Subscribe with TNM Mpamba</option>
                                <option value="airtelMoney">Subscribe with AirtelMoney</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
