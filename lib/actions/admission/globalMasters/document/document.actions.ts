'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Document from '@/lib/models/admission/globalMasters/document/Document.model';





// Create document props
interface CreateDocumentProps{
    document_type:String;
    document_name:String;
};
// Create document
export const createDocument = async ({document_type, document_name}:CreateDocumentProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the document already exists
        const existingDocument = await Document.findOne({document_name});
        if(existingDocument){
            throw new Error('Document name already exists');
        };


        // Creating new document
        const newDocument = await Document.create({document_type, document_name});
        newDocument.save();


        // Return
        return newDocument;


    } catch (err:any) {
        console.log(`Error creating document: ${err.message}`);
    };
};





// Fetch documents
export const fetchDocuments = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const documents = await Document.find();
        return documents;

    } catch (err:any) {
        throw new Error(`Error fetching documents: ${err}`);
    };
};





// Modify document props
interface ModifyDocumentProps{
    id:String;
    document_type:String;
    document_name:String;
}
// Modify document
export const modifyDocument = async ({id, document_type, document_name}:ModifyDocumentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the document name already exists
        const documents = await Document.find();
        const existingDocument = await Document.findById(id);
        if(existingDocument.document_name !== document_name && documents.map(d => d.document_name).includes(document_name)){throw new Error('Document name already exists')};

    
        // Update document
        const updatedDocument = await Document.findByIdAndUpdate(id, {document_type, document_name}, {new:true});


        // Return
        return updatedDocument;

    } catch (err) {
        throw new Error(`Error updating document: ${err}`);
    };
};





// Delete document
export const deleteDocument = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting document
        await Document.findByIdAndDelete(id);
        return 'Document deleted';

    } catch (err) {
        throw new Error(`Error deleting document: ${err}`);      
    };
};