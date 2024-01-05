// Import
import mongoose from 'mongoose';





// Vehicle Type Schema
const VehicleTypeSchema = new mongoose.Schema(
    {
        vehicle_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const VehicleType = mongoose.models.VehicleType || mongoose.model('VehicleType', VehicleTypeSchema);
export default VehicleType;