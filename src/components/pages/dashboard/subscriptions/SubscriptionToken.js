import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminSingleSubs } from '../../../../redux/actions/subscriptionAction';
import { adminSubTokGen } from '../../../../redux/actions/subscriptionAction';
import { magShowSingle } from '../../../../redux/actions/magazineAction';


export default function SubscriptionToken() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const subscription = useSelector((state) => state.subRdcr.subscription);
    const [generatedToken, setGeneratedToken] = useState(null);

    useEffect(() => {
        const fetchSub = async () => {
            await dispatch(adminSingleSubs(id));
        };

        fetchSub();
    }, [dispatch, id]);

    const handleGenerateToken = async () => {
        const transactionId = subscription.transactionId; 
        const response = await dispatch(adminSubTokGen({ transactionId, magazineId: subscription.magazineId }));
        setGeneratedToken(response.data); 
               
    };

    if (!subscription) {
        return (
            <>
                <h4 className='text-center'>The subscription is loading...</h4>
            </>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className='text-center'>Subscription Details</h3>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Magazine Issue: <IssueName sub={subscription.magazineId} /></h5>
                    <p className="card-text">Subscription ID: {subscription._id}</p>
                    <p className="card-text">Subscriber Name: {subscription.username}</p>
                    <p className="card-text">Subscriber Email: {subscription.email}</p>
                    <p className="card-text">Subscriber Phone Number: {subscription.phonenumber}</p>
                    
                    

                    <button onClick={handleGenerateToken} className="btn btn-primary">Generate Token</button>
                </div>
            </div>

            {generatedToken && (
                <div className="card">
                    <div className="card-body">
                        
                        <h5 className="card-title">Generated Token</h5>
                        <h6 className="card-title" >email and text user the token</h6>
                        <p className="card-text">Token: {generatedToken.token}</p>
                        <p className="card-text">Expires At: {new Date(generatedToken.expiresAt).toLocaleString()}</p>
                        <p className="card-text">Magazine ID: {generatedToken.magazineId}</p>
                    </div>
                </div>
            )}
        </div>
    );
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