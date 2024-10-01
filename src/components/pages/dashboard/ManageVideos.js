import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { watchVideos } from '../../../redux/actions/publicAction';



export default function ManageVideos() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.publicRdcr.videos); // Adjust the state according to your Redux setup

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(watchVideos());
            } catch (error) {
                console.error("There was a problem fetching videos.");
            }
        };

        fetchData();
    }, [dispatch]);

    if(!videos) {
        return(<>
        <h2 className='text-center'>LOADING...</h2>
        </>)
    }

    return (
        <div className='mb-4' style={{ marginTop: "5rem", marginBottom: "5rem" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Video Thumbnail</th>
                        <th>Video Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {videos?.map((video) => (
                        <tr key={video._id}>
                            <td>
                            <video
                                    src={video.videoLink} 
                                
                                    style={{ width: '100px', height: 'auto' }} 
                                />
                                {/* Assuming you have a thumbnail or a preview image for the video */}
                                {/* <img src={video.videoLink || 'default_thumbnail.jpg'} alt="video thumbnail" style={{ width: '50px' }} /> */}
                            </td>
                            <td>
                                <a href={`/view_video/${video._id}`}>{video.videoName}</a>
                            </td>
                            <td>
                                {/* <ActionButtons video={video} /> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

// const ActionButtons = ({ video }) => {
//     const dispatch = useDispatch();

//     const handleDelete = async (event) => {
//         event.preventDefault();
//         await dispatch(deleteVideo(video._id));
//     };

//     const deleteButtonTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;

//     const handleEdit = () => {
//         window.location.href = `/edit_video/${video._id}`;
//     };

//     return (
//         <>
//             <Button variant="primary" size="md" className="mr-2 mb-2 mb-md-0" style={{ marginRight: "1.5rem" }} onClick={handleEdit}>
//                 Edit
//             </Button>

//             <OverlayTrigger placement="top" overlay={deleteButtonTooltip}>
//                 <Button variant="danger" size="md" onClick={handleDelete}>
//                     Delete
//                 </Button>
//             </OverlayTrigger>
//         </>
//     );
// };
