// Import
import mongoose from 'mongoose';





// Term Schema
const TermSchema = new mongoose.Schema(
    {
        term_name:{type:String, required:true, unique:true},
    },
    {
        timestamps:true
    }
);





// Export
const Term = mongoose.models.Term || mongoose.model('Term', TermSchema);
export default Term;