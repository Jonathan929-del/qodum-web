// Import
import mongoose from 'mongoose';





// Caste Schema
const CasteSchema = new mongoose.Schema(
    {
        caste_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const Caste = mongoose.models.Caste || mongoose.model('Caste', CasteSchema);
export default Caste;