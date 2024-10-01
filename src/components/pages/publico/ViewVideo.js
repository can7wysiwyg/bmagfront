import React, { useEffect } from 'react'
import { watchVideo } from '../../../redux/actions/publicAction';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';


export default function ViewVideo() {
    const {id} = useParams()
    

    const dispatch = useDispatch();
    const video = useSelector((state) => state.publicRdcr.video); // Adjust the state according to your Redux setup

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(watchVideo(id));
            } catch (error) {
                console.error("There was a problem fetching videos.");
            }
        };

        fetchData();
    }, [dispatch, id]);


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
          <video src={video.videoLink} className=" panoramic-image" controls />
        </div>
      </div>



        </div>
        </section>
    </>
  )
}
