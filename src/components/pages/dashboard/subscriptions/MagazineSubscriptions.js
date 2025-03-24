import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import {bmagtoken} from "../../../../helpers/Bmag"


export default function MagazineSubscriptions() {
    
    const [subscriptions, setSubscriptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [subsPerPage] = useState(10); // Set the number of subscriptions per page

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {

                const response = await axios.get(`${ApiUrl}/admin_check_subscriptions_all`, {
                    Headers: {
                        Authorization: `Bearer ${bmagtoken}`
                    }
                })
                  
                setSubscriptions(response.data.subscriptions)
            } catch (error) {
                console.error(`There was a problem: ${error}`);
            }
        };

        fetchSubscriptions();
    }, []);

    if (!subscriptions) {
        return (
            <div style={{margin: 45}}>
                <h3 className="text-center">Magazine subscriptions are loading...</h3>
            </div>
        );
    }

    if (subscriptions.length === 0) {
        return (
            <div style={{margin: 45}}>
                <h3 className="text-center">There are no magazine subscriptions at the moment.</h3>
            </div>
        );
    }

    
    const indexOfLastSub = currentPage * subsPerPage;
    const indexOfFirstSub = indexOfLastSub - subsPerPage;
    const currentSubs = subscriptions?.slice(indexOfFirstSub, indexOfLastSub);
    const totalPages = Math.ceil(subscriptions.length / subsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg my-4">
                        <div className="card-header text-center">
                            <h2>Magazine Subscriptions</h2>
                        </div>
                        <div className="card-body">

                        <ul className="list-group list-group-flush">
    {currentSubs.map((sub, index) => (
        sub.token !== null  ? (
            <li 
                key={index} 
                 className="list-group-item d-flex justify-content-between align-items-center stylish-list-item">
              <Link 
                    to={`/check_subscriber/${sub._id}`} 
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
                    to={`/subscription_token/${sub._id}`} 
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
    );
}


// const IssueName = ({sub}) => {

//     const dispatch = useDispatch()

//     const singleIssue = useSelector((state) => state.magRdcr.singleIssue)

//     useEffect(() => {

//         const fetchSingle = async() => {

//             try {

//                 await dispatch(magShowSingle(sub))
                
//             } catch (error) {
//                 console.error(`there was a problem ${error}`)
//             }


//         }

//         fetchSingle()



//     }, [dispatch, sub])

//     if(!singleIssue) {
//         return(<>
//         <h2>loading...</h2>
//         </>)
//     }


// console.log(singleIssue)

//     return(<>
    
//     {singleIssue.magazineIssue}
//     </>)

// }