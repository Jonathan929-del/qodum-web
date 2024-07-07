// Import
import mongoose from 'mongoose';





// Religion Schema
const ReligionSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        religion_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const Religion = mongoose.models.Religion || mongoose.model('Religion', ReligionSchema);
export default Religion;