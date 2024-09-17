// Imports
import {useEffect, useRef, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {fetchDocumentsForAdmission} from '@/lib/actions/admission/globalMasters/document/document.actions';





// Main function
const StaffDocumentDetails = ({form, updateStaff, selectedDocuments, setSelectedDocuments, pdfFile, setPdfFile, pdfFileName, setPdfFileName}:any) => {

    // Documents
    const [documents, setDocuments] = useState([]);


    // File ref
    const fileInputRef = useRef(null);


    // Handle file input
    const handleFileChange = (e:any) => {
        const selectedFile = e.target.files[0];
        setPdfFile(selectedFile);
        setPdfFileName(selectedFile.name);
    };


    // Select handler
    const handleSelectClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        };
    };


    // Remove handler
    const removeHandler = () => {
        setPdfFile(null);
        setPdfFileName('');
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const documentsRes = await fetchDocumentsForAdmission();
            setDocuments(documentsRes);
        };
        fetcher();
    }, []);

    return (
        <div className='w-full h-full m-auto flex flex-col overflow-y-scroll custom-sidebar-scrollbar'>
            <div className='flex flex-col gap-6 py-2'>

                {documents.length < 1 ? (
                        <p>No documents</p>
                    ) : // @ts-ignore
                        documents[0].document_type === undefined ? (
                        <LoadingIcon />
                    ) : documents.map((document:any) => (
                        <div className='flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[2px]'>
                            <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[2px]'>{document.document_type}</h2>
                            <div className='flex flex-row flex-wrap gap-4 p-2 pl-4'>
                                {document.document_names.length === 0 ? (
                                    <p className='text-xs text-hash-color pl-[2px]'>-</p>
                                ) : document.document_names.map((n:any) => (
                                    <div className='flex flex-row items-ceter gap-[2px] min-w-[180px]'>
                                        <Checkbox
                                            className='rounded-[2px] text-hash-color'
                                            onClick={() => {
                                                if(selectedDocuments?.map((d:any) => d?.document_name).includes(n?.document_name)){
                                                    setSelectedDocuments(selectedDocuments?.filter((d:any) => d?.document_name !== n?.document_name))
                                                }else{
                                                    setSelectedDocuments([...selectedDocuments, {
                                                        document_type:n.document_type,
                                                        document_name:n.document_name
                                                    }])
                                                }
                                            }}
                                            checked={selectedDocuments?.map((d:any) => d?.document_name).includes(n?.document_name)}
                                        />
                                        <p className='text-xs text-hash-color pl-[2px]'>
                                            {n.document_name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}

                <div className='flex flex-col gap-2 pl-4'>

                    <p className='font-semibold'>Attachment: </p>

                    {pdfFileName ? <p>{pdfFileName}</p> : updateStaff.id !== '' && <a className='text-[#00F]' href={form.getValues().staff_document_details.file} target='_blank'>Staff's document details</a>}

                    <ul className='flex flex-row items-center gap-2'>
                        <li
                            onClick={handleSelectClick}
                            className='flex items-center px-[8px] h-6 text-xs text-white bg-gradient-to-r bg-[#6DFD9C] rounded-full transition border-[1px] border-white cursor-pointer
                                    hover:opacity-70'
                        >
                            Select
                        </li>
                        <li
                            onClick={removeHandler}
                            className='flex items-center px-[8px] h-6 text-xs text-white bg-gradient-to-r bg-[#f00] rounded-full transition border-[1px] border-white cursor-pointer
                                    hover:opacity-70'
                        >
                            Remove
                        </li>
                    </ul>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{display:'none'}}
                    />

                </div>

            </div>
        </div>
    );
};





// Export
export default StaffDocumentDetails;