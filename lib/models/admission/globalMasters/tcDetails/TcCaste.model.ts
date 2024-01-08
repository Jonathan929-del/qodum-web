// Import
import mongoose from 'mongoose';





// Tc Caste Schema
const TcCasteSchema = new mongoose.Schema(
    {
        caste_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const TcCaste = mongoose.models.TcCaste || mongoose.model('TcCaste', TcCasteSchema);
export default TcCaste;