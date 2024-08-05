// Import
import mongoose from 'mongoose';





// Cadet type Schema
const CadetTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const CadetType = mongoose.models.CadetType || mongoose.model('CadetType', CadetTypeSchema);
export default CadetType;