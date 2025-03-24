import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Button, Modal, Form } from 'react-bootstrap'
import MySubscribedVideos from './MySubscribedVideos'
import { fetchSingleVideo, subscribeToVideo } from '../../../../helpers/articlesHelpers/VideosFetch'



export default function SubscribeVideo() {
    const {id} = useParams()
    const [video, setVideo] = useState({})
    const [videoId, setVideoId] = useState(null); 
    const [showModal, setShowModal] = useState(false);


    const [formData, setFormData] = useState({
        username: '',
        transactionId: '',
        email: '',
        phonenumber: '', 
        paymentMethod: '',
        videoId: id

         
    });



    useEffect(() => {

      const fetchVideo = async() => {

        try {

         const item = await fetchSingleVideo(id)

         if(item && !item.error) {
            setVideo(item?.video)
         }
          
        } catch (error) {
          console.error(`There was a problem: ${error}`);
        }


      }

      fetchVideo()


    }, [id])


    useEffect(() => {
        const storedTokens = JSON.parse(localStorage.getItem('videoSubscriptions')) || [];
        
        storedTokens.forEach(subscription => {
            const token = subscription.token;
            const id = token.split('-').pop(); 
            setVideoId(id); 
        });

    }, []);

    

    if(id === videoId) {
        

return(<>

<MySubscribedVideos />

</>)

    }







    if(!video) {
      return(<>
      <h4 className='text-center'>LOADING......</h4>
      </>)
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
    
        
        await subscribeToVideo(formData)

        window.location.reload()
        
          
        handleClose(); 
    };




  return (
    <>
    <section className="section">
    <div className="container">
    <div className="col-lg-10 mx-auto mb-4">
    <h1 className="h2 mb-3">{video.videoName}</h1>
    <p>Posted on {moment(video.createdAt).format('MMM D, YYYY')}</p>

    </div>

    <div className="col-12 mb-3">
        <div className="post-slider">
          <video src={video.videoLink} className=" panoramic-image"  />
        </div>
      </div>

      <Button variant="primary" onClick={handleShow}>
                                Choose a Subscription Method
                            </Button>

                            <div className='text-center'>
                                <h6>or</h6>
                                <p><a href={`/watch_subscribed_video/${video._id}`}>watch video if you subscribed to watch </a></p>
                            </div>



        </div>
        </section>


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
  )
}
