import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { magShowSingle } from '../../../redux/actions/magazineAction';
import moment from 'moment/moment';

export default function ReadMagazine() {
    const { id } = useParams();
    const [pdfVisible, setPdfVisible] = useState(false);
    const dispatch = useDispatch();
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue);

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

    const handleButtonClick = () => {
        setPdfVisible(!pdfVisible);
    };

    if (!singleIssue) {
        return "";
    }

    const named = singleIssue.magazinePdfFile;

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
                            <button onClick={handleButtonClick} className="btn btn-primary">
                                {pdfVisible ? 'Hide Magazine' : 'Read Magazine'}
                            </button>

                            {pdfVisible && named && (
                                <PdfViewer
                                    fileUrl={named}
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
