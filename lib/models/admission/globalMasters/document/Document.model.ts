// Import
import mongoose from 'mongoose';





// Document schema
const DocumentSchema = new mongoose.Schema(
    {
        document_type:{type:String, required:true},
        document_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);
export default Document;