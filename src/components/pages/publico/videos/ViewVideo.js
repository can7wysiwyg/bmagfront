import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { fetchSingleVideo } from '../../../../helpers/articlesHelpers/VideosFetch';


export default function ViewVideo() {
    const {id} = useParams()
    
    const [video, setVideo] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                
               const singleVideo = await fetchSingleVideo(id)

               if(singleVideo) {
                setVideo(singleVideo?.video)
               }

            } catch (error) {
                console.error("There was a problem fetching videos.");
            }
        };

        fetchData();
    }, [id]);


    if(!video) {

        return(<>
        <h4 className='text-center'>LOADING.....</h4>
        </>)
    }


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
          <video src={video.videoLink} className=" panoramic-image" controls controlsList="nodownload" />
        </div>
      </div>



        </div>
        </section>
    </>
  )
}
