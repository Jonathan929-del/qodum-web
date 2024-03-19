// Import
import mongoose from 'mongoose';





// Term Master Schema
const TermSchema = new mongoose.Schema(
    {
        term_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const newTermMaster = mongoose.models.newTermMaster || mongoose.model('Term', TermSchema);
export default newTermMaster;