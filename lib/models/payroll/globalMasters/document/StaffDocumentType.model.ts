// Import
import mongoose from 'mongoose';





// Staff documnent type schema
const staffDocumentTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        document_type:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const StaffDocumentType = mongoose.models.StaffDocumentType || mongoose.model('StaffDocumentType', staffDocumentTypeSchema);
export default StaffDocumentType;