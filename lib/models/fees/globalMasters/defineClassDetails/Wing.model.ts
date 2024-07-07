// Import
import mongoose from 'mongoose';





// Wing Schema
const WingSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        wing:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const Wing = mongoose.models.Wing || mongoose.model('Wing', WingSchema);
export default Wing;