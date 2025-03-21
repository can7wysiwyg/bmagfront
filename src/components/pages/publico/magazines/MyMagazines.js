import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { UserReadSubdMag } from '../../../../helpers/articlesHelpers/MagazinesFetch';


export default function MyMagazines() {
    const { id } = useParams(); 
    const [magazine, setMagazine] = useState({});
    const [formData, setFormData] = useState({ token: "" });
    const [pdfVisible, setPdfVisible] = useState(false); 

    const toolbarPluginInstance = toolbarPlugin(); 
    const fullScreenPluginInstance = fullScreenPlugin(); 


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
       const data = await UserReadSubdMag(formData)

       if(data && !data.error) {
        setMagazine(data?.magazine)
        setPdfVisible(true);
    

       }

        
       
    };
    console.log(":")


    if(!magazine) {
        return(<div>
          
         <h4>U r not subscribed to any magazine</h4>
        </div>)
    }

    

    
    return (
        <div className="row justify-content-center" style={{ margin: '4rem' }}>
            <div className="col-md-8">
            <p> {id}</p>

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








            {/* Displaying the PDF if it's visible */}
            {pdfVisible && magazine && (
                <PdfViewer
                    fileUrl={magazine.magazinePdfFile} // Accessing the PDF file from the magazine issue
                    toolbarPluginInstance={toolbarPluginInstance}
                    fullScreenPluginInstance={fullScreenPluginInstance}
                />
            )}
        </div>
        </div>
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
