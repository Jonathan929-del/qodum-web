// Import
import mongoose from 'mongoose';





// Term Master Schema
const TermMasterSchema = new mongoose.Schema(
    {
        term_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const TermMaster = mongoose.models.TermMaster || mongoose.model('TermMaster', TermMasterSchema);
export default TermMaster;