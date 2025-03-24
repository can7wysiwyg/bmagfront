import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { fetchSingleVideo, fetchWatchVideoSubscribed } from '../../../../helpers/articlesHelpers/VideosFetch';

export default function WatchSubscribedVideo() {
    const {id} = useParams()
    
   const [video, setVideo] = useState({}); 
   const [videoSubscribed, setVideoSubscribed] = useState([])
   const [watcherEntry, setWatcherEntry] = useState([])
   const [formData, setFormData] = useState({ token: "" });
    const [videoVisible, setVideoVisible] = useState(false);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
               const item = await fetchSingleVideo(id);

               if(item && !item.error) {
                setVideo(item?.video)
               }
            } catch (error) {
                console.error("There was a problem");
            }
        };
        fetchVideo();
    }, [id]);



    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
     const item =  await fetchWatchVideoSubscribed(formData);

     if(item && !item?.error) {

        setVideoSubscribed(item?.videoSubscribed)
        setWatcherEntry(item?.watcherEntry)
     }

        if (videoSubscribed) {
            
            const token = formData.token;
            const expiresAt = new Date(watcherEntry.expiresAt); 
    
            
            const currentVideoSubscriptions = JSON.parse(localStorage.getItem('videoSubscriptions')) || [];
            
            
            currentVideoSubscriptions.push({ token, expiresAt });
    
    
            localStorage.setItem('videoSubscriptions', JSON.stringify(currentVideoSubscriptions));
    
            setVideoVisible(true); 
        
        }

    
        
            
            
    
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
