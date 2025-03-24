import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import moment from 'moment/moment';
import { fetchMagSingle, UserReadSubdMag } from '../../../../helpers/articlesHelpers/MagazinesFetch';

export default function ReadMagazine() {
    const { id } = useParams();
        const [singleIssue, setSingleIssue] = useState({});
    const [magazine, setMagazine] = useState({}); 
    const [readerEntry, setReaderEntry] = useState({}); 
    const [formData, setFormData] = useState({ token: "" });
    const [pdfVisible, setPdfVisible] = useState(false);

    const toolbarPluginInstance = toolbarPlugin();
    const fullScreenPluginInstance = fullScreenPlugin();

    useEffect(() => {
        const fetchMaga = async () => {
            try {
              const data =  await fetchMagSingle(id);
              if(data && !data.error) {
                setSingleIssue(data?.singleIssue)
              }
            } catch (error) {
                console.error("There was a problem");
            }
        };
        fetchMaga();
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    console.log(formData)


    const handleSubmit = async (e) => {
        e.preventDefault();
      const data =  await UserReadSubdMag(formData)

      console.log(data)

      setMagazine(data?.magazine)
      setReaderEntry(data?.readerEntry)
    
        
        if (magazine) {
            
            const token = formData.token;
            console.log(token)
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
