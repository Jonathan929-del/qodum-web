// Import
import mongoose from 'mongoose';





// BloodGroup Schema
const BloodGroupSchema = new mongoose.Schema(
    {
        blood_group:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const BloodGroup = mongoose.models.BloodGroup || mongoose.model('BloodGroup', BloodGroupSchema);
export default BloodGroup;