// Import
import mongoose from 'mongoose';





// Documnent type schema
const DocumentTypeSchema = new mongoose.Schema(
    {
        document_type:{type:String, required:true, unique:true},
    },
    {
        timestamps:true
    }
);





// Export
const DocumentType = mongoose.models.DocumentType || mongoose.model('DocumentType', DocumentTypeSchema);
export default DocumentType;