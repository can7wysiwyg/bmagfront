import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import { bmagtoken } from '../../../../helpers/Bmag';



export default function VideoSubscriptions() {
        const [subscribedVideos, setSubscribedVideos] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [subsPerPage] = useState(10); // Set the number of subscriptions per page

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/video_subscriptions_all`, {
                    headers: {
                        Authorization: `Bearer ${bmagtoken}`
                    }
                })

                setSubscribedVideos(response.data.subscribedVideos)
            } catch (error) {
                console.error(`There was a problem: ${error}`);
            }
        };

        fetchSubscriptions();
    }, []);

    if (!subscribedVideos) {
        return (
            <>
                <h3 className="text-center">Video subscriptions are loading...</h3>
            </>
        );
    }

    if (subscribedVideos.length === 0) {
        return (
            <>
                <h3 className="text-center">There are no video subscriptions at the moment.</h3>
            </>
        );
    }

    
    const indexOfLastSub = currentPage * subsPerPage;
    const indexOfFirstSub = indexOfLastSub - subsPerPage;
    const currentSubs = subscribedVideos?.slice(indexOfFirstSub, indexOfLastSub);
    const totalPages = Math.ceil(subscribedVideos.length / subsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };




  return (
    <>
    <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg my-4">
                        <div className="card-header text-center">
                            <h2>Video Subscriptions</h2>
                        </div>
                        <div className="card-body">

                        <ul className="list-group list-group-flush">
    {currentSubs.map((sub, index) => (
        sub.token !== null  ? (
            <li 
                key={index} 
                 className="list-group-item d-flex justify-content-between align-items-center stylish-list-item">
              <Link 
                    to={`/check_video_subscriber/${sub._id}`} 
                    className="font-weight-bold stylish-link">

<span className="font-weight-bold">
                    {sub.username} - Already Subscribed
                </span>

                    </Link>
                
                {/* <span><IssueName sub={sub.magazineId} /></span> */}
                <span className="badge bg-primary rounded-pill">{sub.paymentMethod}</span>
            </li>
        ) : (
            <li 
                key={index} 
                className="list-group-item d-flex justify-content-between align-items-center stylish-list-item">
                <Link 
                    to={`/video_subscription_token/${sub._id}`} 
                    className="font-weight-bold stylish-link">
                    {sub.username}
                </Link>
                {/* <span><IssueName sub={sub.magazineId} /></span> */}
                <span className="badge bg-primary rounded-pill">{sub.paymentMethod}</span>
            </li>
        )
    ))}
</ul>



                                                    </div>
                    </div>

                    {/* Pagination Component */}
                    <Pagination className="justify-content-center">
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item
                                key={number + 1}
                                active={number + 1 === currentPage}
                                onClick={() => handlePageChange(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    
    
    
    </>
  )
}
