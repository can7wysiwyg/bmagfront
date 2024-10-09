import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminSingleSubs } from '../../../../redux/actions/subscriptionAction';
import { magShowSingle } from '../../../../redux/actions/magazineAction';
import moment from 'moment';


export default function CheckSubscriber() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const subscription = useSelector((state) => state.subRdcr.subscription);

    useEffect(() => {
        const fetchSub = async () => {
            await dispatch(adminSingleSubs(id));
        };

        fetchSub();
    }, [dispatch, id]);


    if (!subscription) {
        return (
            <>
                <h4 className='text-center'>The subscription is loading...</h4>
            </>
        );
    }


  return (
    <>
    <div className="container mt-4">
            <h3 className='text-center'>Subscription Details</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Magazine Issue: <IssueName sub={subscription.magazineId} /></h5>
                    <p className="card-text">Subscription ID: {subscription._id}</p>
                    <p className="card-text">Subscriber Name: {subscription.username}</p>
                    <p className="card-text">Subscriber Email: {subscription.email}</p>
                    <p className="card-text">Subscriber Phone Number: {subscription.phonenumber}</p>
                    <h3 className='card-title'>token expires on:  {moment(subscription.expiresAt).format("MMM D YYYY, hh:mm A")} </h3>
                    

                    </div>
                    </div>
                    </div>
        
    
    
    </>
  )
}





const IssueName = ({sub}) => {

    const dispatch = useDispatch()

    const singleIssue = useSelector((state) => state.magRdcr.singleIssue)

    useEffect(() => {

        const fetchSingle = async() => {

            try {

                await dispatch(magShowSingle(sub))
                
            } catch (error) {
                console.error(`there was a problem ${error}`)
            }


        }

        fetchSingle()



    }, [dispatch, sub])

    if(!singleIssue) {
        return(<>
        <h2>loading...</h2>
        </>)
    }




    return(<>
    
    {singleIssue.magazineIssue}
    </>)

}