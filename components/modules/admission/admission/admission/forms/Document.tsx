// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {fetchDocumentsForAdmission} from '@/lib/actions/admission/globalMasters/document/document.actions';





// Main Function
const Document = ({selectedDocuments, setSelectedDocuments}:any) => {


    // Documents
    const [documents, setDocuments] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const documentsRes = await fetchDocumentsForAdmission();
            setDocuments(documentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='w-[95%] m-auto flex flex-col sm:w-[90%]'>
            <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Document Details</h2>
            <div className='flex flex-col gap-4 p-2'>



                {documents.length < 1 ? (
                        <p>No documents</p>
                    ) : // @ts-ignore
                    documents[0].document_type === undefined ? (
                        <LoadingIcon />
                    ) : documents.map((document:any) => (
                    <div className='flex flex-col gap-3 mt-4 text-xs'>
                        <h4 className='font-semibold text-[16px]'>{document.document_type}</h4>
                        <div className='flex flex-row flex-wrap gap-4'>
                            {document.document_names.map((n:any) => (
                                <div className='flex flex-row gap-[2px] min-w-[180px]'>
                                    <Checkbox
                                        className='rounded-[2px] text-hash-color'
                                        onClick={() => {
                                            if(selectedDocuments.map((d:any) => d.document_name).includes(n.document_name)){
                                                setSelectedDocuments(selectedDocuments.filter((d:any) => d.document_name !== n.document_name))
                                            }else{
                                                setSelectedDocuments([...selectedDocuments, {
                                                    document_type:n.document_type,
                                                    document_name:n.document_name
                                                }])
                                            }
                                        }}
                                        checked={selectedDocuments.map((d:any) => d.document_name).includes(n.document_name)}
                                    />
                                    {n.document_name}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}




            </div>
        </div>
    );
};





// Export
export default Document;