import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export default function VideoDashboard() {
    return (
        <>
            <section className="py-6 bg-light-primary mb-5">
                <div className="container">
                    <div className="row justify-content-center text-center mb-4">
                        <div className="col-xl-6 col-lg-8 col-sm-10" style={{ marginTop: "1.5px" }}>
                            <h2 className="font-weight-bold">Video Dashboard</h2>
                            <p className="text-muted mb-0">Select what to do from the options below</p>
                        </div>
                    </div>

                    <div className="row row-cols-lg-2 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate" data-aos="fade-up">

                        {/* Card for Uploading Videos */}
                        <div className="col my-3">
                            <div className="card border-hover-primary hover-scale">
                                <div className="card-body">
                                    <div className="text-primary mb-5">
                                        <i className="bi bi-cloud-upload" style={{ fontSize: "70px" }}></i>
                                    </div>
                                    <h6 className="font-weight-bold mb-3">Upload Video</h6>
                                    <p className="text-muted mb-0"><Link to="/upload_video">Upload a new video</Link></p>
                                </div>
                            </div>
                        </div>

                        {/* Card for Managing Videos */}
                        <div className="col my-3">
                            <div className="card border-hover-primary hover-scale">
                                <div className="card-body">
                                    <div className="text-primary mb-5">
                                        <i className="bi bi-collection" style={{ fontSize: "70px" }}></i>
                                    </div>
                                    <h6 className="font-weight-bold mb-3">Manage Videos</h6>
                                    <p className="text-muted mb-0"><Link to="/manage_videos">View and manage videos</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
