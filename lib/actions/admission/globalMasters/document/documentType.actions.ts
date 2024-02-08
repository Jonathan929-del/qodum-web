'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import DocumentType from '@/lib/models/admission/globalMasters/document/DocumentType.model';





// Create document type props
interface CreateDocumentProps{
    document_type:String;
};
// Create document type
export const createDocumentType = async ({document_type}:CreateDocumentProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the document type already exists
        const existingDocument = await DocumentType.findOne({document_type});
        if(existingDocument){
            throw new Error('Document type already exists');
        };


        // Creating new document type
        const newDocument = await DocumentType.create({document_type});
        newDocument.save();


        // Return
        return newDocument;


    } catch (err:any) {
        console.log(`Error creating document type: ${err.message}`);
    };
};





// Fetch document types
export const fetchDocumentTypes = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const documentTypes = await DocumentType.find();
        return documentTypes;

    } catch (err:any) {
        throw new Error(`Error fetching docyment types: ${err}`);
    };
};





// Modify document type props
interface ModifyDocumentTypeProps{
    id:String;
    document_type:String;
}
// Modify document type
export const modifyDocumentType = async ({id, document_type}:ModifyDocumentTypeProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the document type already exists
        const documents = await DocumentType.find();
        const existingDocument = await DocumentType.findById(id);
        if(existingDocument.document_type !== document_type && documents.map(d => d.document_type).includes(document_type)){throw new Error('Document type already exists')};

        
        // Update document type
        const updatedDocument = await DocumentType.findByIdAndUpdate(id, {document_type}, {new:true});


        // Return
        return updatedDocument;

    } catch (err) {
        throw new Error(`Error updating document type: ${err}`);
    };
};





// Delete document type
export const deleteDocumentType = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting document type
        await DocumentType.findByIdAndDelete(id);
        return 'Document type deleted';

    } catch (err) {
        throw new Error(`Error deleting document type: ${err}`);      
    };
};