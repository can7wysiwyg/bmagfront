import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { magShowSingle } from '../../../redux/actions/magazineAction';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import moment from 'moment/moment';


export default function MyMagazines() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const singleIssue = useSelector((state) => state.magRdcr.singleIssue); 
    const [pdfVisible, setPdfVisible] = useState(false); 

    const toolbarPluginInstance = toolbarPlugin(); 
    const fullScreenPluginInstance = fullScreenPlugin(); 

    useEffect(() => {
        const fetchMagazine = async () => {
            try {
                await dispatch(magShowSingle(id)); 
                setPdfVisible(true); 
            } catch (error) {
                console.error("There was a problem fetching the magazine", error); 
            }
        };
        fetchMagazine();
    }, [dispatch, id]);

    if (!singleIssue) {
        return <p>Loading magazine...</p>; 
    }

    return (
        <div>
            <h2>{singleIssue.title}</h2> 
            <p>Published on: {moment(singleIssue.publishDate).format('MMMM Do YYYY')}</p> {/* Formatting and displaying the publish date */}

            {/* Displaying the PDF if it's visible */}
            {pdfVisible && singleIssue && (
                <PdfViewer
                    fileUrl={singleIssue.magazinePdfFile} // Accessing the PDF file from the magazine issue
                    toolbarPluginInstance={toolbarPluginInstance}
                    fullScreenPluginInstance={fullScreenPluginInstance}
                />
            )}
        </div>
    );
}


const  PdfViewer = ({ fileUrl, toolbarPluginInstance, fullScreenPluginInstance }) => {
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

