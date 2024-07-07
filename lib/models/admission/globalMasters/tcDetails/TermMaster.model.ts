// Import
import mongoose from 'mongoose';





// Term Master Schema
const TermSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        term_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const newTermMaster = mongoose.models.newTermMaster || mongoose.model('Term', TermSchema);
export default newTermMaster;