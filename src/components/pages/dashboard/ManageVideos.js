import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import { watchVideos } from '../../../redux/actions/publicAction';
import { deleteVideo } from '../../../redux/actions/magazineAction';

export default function ManageVideos() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.publicRdcr.videos); // Adjust the state according to your Redux setup

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [videosPerPage] = useState(5); // You can change the number of videos per page

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

    // Get current videos for the current page
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos?.slice(indexOfFirstVideo, indexOfLastVideo);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (!videos) {
        return (
            <>
                <h2 className='text-center'>LOADING...</h2>
            </>
        );
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
                    {currentVideos?.map((video) => (
                        <tr key={video._id}>
                            <td>
                                <video
                                    src={video.videoLink}
                                    style={{ width: '100px', height: 'auto' }}
                                    controls
                                />
                            </td>
                            <td>
                                <a href={`/view_video/${video._id}`}>{video.videoName}</a>
                            </td>
                            <td>
                                <ActionButtons video={video} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination Controls */}
            <PaginationComponent
                totalVideos={videos.length}
                videosPerPage={videosPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

// Action buttons for editing and deleting videos
const ActionButtons = ({ video }) => {
    const dispatch = useDispatch();

    const handleDelete = async (event) => {
        event.preventDefault();
        await dispatch(deleteVideo(video._id));
    };

    const deleteButtonTooltip = <Tooltip id="delete-tooltip">Delete</Tooltip>;

    const handleEdit = () => {
        window.location.href = `/edit_video/${video._id}`;
    };

    return (
        <>
            <Button
                variant="primary"
                size="md"
                className="mr-2 mb-2 mb-md-0"
                style={{ marginRight: "1.5rem" }}
                onClick={handleEdit}
            >
                Edit
            </Button>

            <OverlayTrigger placement="top" overlay={deleteButtonTooltip}>
                <Button variant="danger" size="md" onClick={handleDelete}>
                    Delete
                </Button>
            </OverlayTrigger>
        </>
    );
};

// Pagination component
const PaginationComponent = ({ totalVideos, videosPerPage, currentPage, handlePageChange }) => {
    const pageNumbers = [];

    // Calculate the total number of pages
    for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            {pageNumbers.map((number) => (
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};
