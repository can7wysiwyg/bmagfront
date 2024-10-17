import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { magShowSingle } from '../../../../redux/actions/magazineAction';
import { readSubMaga } from '../../../../redux/actions/subscriptionAction';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import moment from 'moment/moment';

export default function ReadMagazine() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue);
    const magazine = useSelector((state) => state.subRdcr.magazine); 
    const readerEntry = useSelector((state) => state.subRdcr.readerEntry); 
    const [formData, setFormData] = useState({ token: "" });
    const [pdfVisible, setPdfVisible] = useState(false);

    const toolbarPluginInstance = toolbarPlugin();
    const fullScreenPluginInstance = fullScreenPlugin();

    useEffect(() => {
        const fetchMaga = async () => {
            try {
                await dispatch(magShowSingle(id));
            } catch (error) {
                console.error("There was a problem");
            }
        };
        fetchMaga();
    }, [dispatch, id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(readSubMaga(formData));
    
        
        if (magazine) {
            
            const token = formData.token;
            const expiresAt = new Date(readerEntry.expiresAt); 
    
            
            const currentSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
            
            
            currentSubscriptions.push({ token, expiresAt });
    
    
            localStorage.setItem('subscriptions', JSON.stringify(currentSubscriptions));
    
            setPdfVisible(true); 
        }
    };
    

    
    if (!singleIssue) {
        return "";
    }

    return (
        <>
            <div className="row justify-content-center" style={{ marginTop: '2rem' }}>
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img
                            src={singleIssue.magazinePhoto}
                            alt="magacover"
                            style={{ width: '100%', maxHeight: '30vh', objectFit: 'contain' }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title">{singleIssue.magazineIssue}</h5>
                            <p className="card-text">
                                Released on {moment(singleIssue.createdAt).format('MMM D YYYY')}
                            </p>

                            {/* Token Form */}
                            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                                <div className="form-group">
                                    <label htmlFor="token">Enter your token to read this magazine:</label>
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

                            {/* PDF Viewer */}
                            {pdfVisible && magazine && (
                                <PdfViewer
                                    fileUrl={magazine.magazinePdfFile} // Accessing the PDF file from the magazine
                                    toolbarPluginInstance={toolbarPluginInstance}
                                    fullScreenPluginInstance={fullScreenPluginInstance}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function PdfViewer({ fileUrl, toolbarPluginInstance, fullScreenPluginInstance }) {
    return (
        <div style={{ height: '750px' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <toolbarPluginInstance.Toolbar>
                    {(props) => {
                        const {
                            CurrentPageInput,
                            GoToNextPage,
                            GoToPreviousPage,
                            NumberOfPages,
                            EnterFullScreen,
                        } = props;
                        return (
                            <div style={{ alignItems: 'center', display: 'flex' }}>
                                <GoToPreviousPage />
                                <CurrentPageInput /> / <NumberOfPages />
                                <GoToNextPage />
                                <EnterFullScreen />
                            </div>
                        );
                    }}
                </toolbarPluginInstance.Toolbar>
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[toolbarPluginInstance, fullScreenPluginInstance]}
                    defaultScale={SpecialZoomLevel.PageWidth}
                />
            </Worker>
        </div>
    );
}
