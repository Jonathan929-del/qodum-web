'use client';
// Imports
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchDocuments} from '@/lib/actions/admission/globalMasters/document/document.actions';
import FormCom from '@/components/modules/admission/globalMasters/document/documentType/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/document/documentType/ViewCom';
import {fetchDocumentTypes} from '@/lib/actions/admission/globalMasters/document/documentType.actions';
import DocumentFormCom from '@/components/modules/admission/globalMasters/document/documentName/FormCom';
import DocumentViewCom from '@/components/modules/admission/globalMasters/document/documentName/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState('');


    // Opened page
    const [openedPage, setOpenedPage] = useState('define-document-type');


    // Document types
    const [documentTypes, setDocumentTypes] = useState([{}]);


    // Update document type
    const [updateDocumentType, setUpdateDocumentType] = useState({
        id:'',
        isDeleteClicked:false,
        document_type:''
    });


    // Documents
    const [documents, setDocuments] = useState([{}]);


    // Update document
    const [updateDocument, setUpdateDocument] = useState({
        id:'',
        isDeleteClicked:false,
        document_type:'',
        document_name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const documentTypesRes = await fetchDocumentTypes();
            const documentsRes = await fetchDocuments();
            setDocumentTypes(documentTypesRes);
            setDocuments(documentsRes)
        };
        fetcher();
    }, [isViewOpened, updateDocumentType, updateDocument]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened !== '' ? isViewOpened === 'document-type' ? (
                    <ViewCom
                        documentTypes={documentTypes}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateDocumentType={setUpdateDocumentType}
                    />
                ) : (
                    <DocumentViewCom
                        documents={documents}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateDocument={setUpdateDocument}
                    />
                )
                 : (
                    <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
                        <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Document Type</h2>

                        <RadioGroup
                            className='flex flex-row mt-4'
                            defaultValue={openedPage}
                            disabled={updateDocument.id !== '' || updateDocumentType.id !== ''}
                        >
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='define-document-type' id='define-document-type' onClick={() => setOpenedPage('define-document-type')}/>
                                <Label htmlFor='define-document-type' className='text-xs'>Define Document Type</Label>
                            </div>
                            <div className='flex items-center space-x-[2px]'>
                                <RadioGroupItem value='define-document' id='define-document' onClick={() => setOpenedPage('define-document')}/>
                                <Label htmlFor='define-document' className='text-xs'>Define Document</Label>
                            </div>
                        </RadioGroup>

                        {openedPage === 'define-document-type' ? (
                            <FormCom
                                documentTypes={documentTypes}
                                isViewOpened={isViewOpened}
                                setIsViewOpened={setIsViewOpened}
                                updateDocumentType={updateDocumentType}
                                setUpdateDocumentType={setUpdateDocumentType}
                            />
                        ) : (
                            <DocumentFormCom
                                documents={documents}
                                isViewOpened={isViewOpened}
                                documentTypes={documentTypes}
                                setIsViewOpened={setIsViewOpened}
                                updateDocument={updateDocument}
                                setUpdateDocument={setUpdateDocument}
                            />
                        )}
                    </div>
                )
            }
        </div>
    );
};





// Export
export default page;