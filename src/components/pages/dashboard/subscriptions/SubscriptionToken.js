import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';
import {bmagtoken} from "../../../../helpers/Bmag"
import { fetchMagSingle } from '../../../../helpers/articlesHelpers/MagazinesFetch';



export default function SubscriptionToken() {
    const { id } = useParams();
const [subscription, setSubscription] = useState([]);
 
    const [generatedToken, setGeneratedToken] = useState(null);

    useEffect(() => {
        const fetchSub = async () => {
            const response =  await axios.get(`${ApiUrl}/admin_check_subscription_single/${id}`, {
                headers: {
                    Authorization: `Bearer ${bmagtoken}`
                }
            }) 
            setSubscription(response.data.subscription)

        };

        fetchSub();
    }, [id]);

    const handleGenerateToken = async () => {
        const transactionId = subscription.transactionId; 
        
        const response = await axios.post(`${ApiUrl}/admin_generate_token`, { transactionId, magazineId: subscription.magazineId }, {
            headers: {
                Authorization: `Bearer ${bmagtoken}`
            }
        })
                  
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

    
    const [singleIssue, setSingleIssue] = useState({})

    useEffect(() => {

        const fetchSingle = async() => {

            try {

               const data = await fetchMagSingle(sub)

               setSingleIssue(data?.singleIssue)
                
            } catch (error) {
                console.error(`there was a problem ${error}`)
            }


        }

        fetchSingle()



    }, [sub])

    if(!singleIssue) {
        return(<>
        <h2>loading...</h2>
        </>)
    }




    return(<>
    
    {singleIssue.magazineIssue}
    </>)

}