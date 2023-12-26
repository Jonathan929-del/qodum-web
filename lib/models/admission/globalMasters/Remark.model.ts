// Import
import mongoose from 'mongoose';





// Remark Schema
const RemarkSchema = new mongoose.Schema(
    {
        remark:{type:String, required:true, unique:true},
    },
    {
        timestamps:true
    }
);





// Export
const Remark = mongoose.models.Remark || mongoose.model('Remark', RemarkSchema);
export default Remark;