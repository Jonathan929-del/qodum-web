// Import
import mongoose from 'mongoose';





// Parish Schema
const ParishSchema = new mongoose.Schema(
    {
        parish:{type:String, required:true, unique:true},
        religion:[{type:String}]
    },
    {
        timestamps:true
    }
);





// Export
const Parish = mongoose.models.Parish || mongoose.model('Parish', ParishSchema);
export default Parish;