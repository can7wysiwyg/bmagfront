import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { watchVideo } from '../../../../redux/actions/publicAction'
import { watchSubsribedVideo } from '../../../../redux/actions/videoSubscriptionAction'
import moment from 'moment'

export default function WatchSubscribedVideo() {
    const {id} = useParams()
    const dispatch = useDispatch()
   const video = useSelector((state) => state.publicRdcr.video); 
   const videoSubscribed = useSelector((state) => state.vidSubRdcr.videoSubscribed)
//    const watcherEntry = useSelector((state) => state.vidSubRdcr.watcherEntry)
   const [formData, setFormData] = useState({ token: "" });
    const [videoVisible, setVideoVisible] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                await dispatch(watchVideo(id));
            } catch (error) {
                console.error("There was a problem");
            }
        };
        fetchVideo();
    }, [dispatch, id]);



    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(watchSubsribedVideo(formData));
    
        
            
            setVideoVisible(true); // Show PDF reader on successful token validation
        
    
}
    

    
    if (!video) {
        return "";
    }






  return (
    <>
    <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        
                        <div className="card-body text-center">
                            <h5 className="card-title">{video.videoName}</h5>
                            <p className="card-text">
                                Released on {moment(video.createdAt).format('MMM D YYYY')}
                            </p>

                            {/* Token Form */}
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
                                  <video src={video.videoLink} className=" panoramic-image" controls controlsList="nodownload" />
                                </div>
                              </div>
                        
                                
                            )}


                            </div>
                            </div>
                            </div>
                            </div>




    </>
  )
}
