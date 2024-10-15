import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { watchSubsribedVideo } from '../../../../redux/actions/videoSubscriptionAction';



export default function MyVideos() {

    const {id} = useParams()
    const dispatch = useDispatch();
    const videoSubscribed = useSelector((state) => state.vidSubRdcr.videoSubscribed)
    const [formData, setFormData] = useState({ token: "" });
    const [videoVisible, setVideoVisible] = useState(false); 


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(watchSubsribedVideo(formData));

        setVideoVisible(true);  
       
    };
    




  return (
    <>
    <div className="row justify-content-center" style={{ margin: '4rem' }}>
            <div className="col-md-8">
            <p> {id}</p>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                                <div className="form-group">
                                    <label htmlFor="token">Enter your token to watch this video:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="token"
                                        placeholder="Enter token"
                                        name='token'
                                        value={formData.token}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                    Submit Token
                                </button>
                            </form>

                            <br>
                            
                            </br>

                            {videoVisible && videoSubscribed && (
                                <div className="col-12 mb-3">
                                <div className="post-slider">
                                  <video src={videoSubscribed.videoLink} className=" panoramic-image" controls controlsList="nodownload" />
                                </div>
                              </div>
                        
                                
                            )}

                            </div>
                            </div>








    </>
  )
}
