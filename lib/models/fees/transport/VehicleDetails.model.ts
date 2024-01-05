// Import
import mongoose from 'mongoose';





// Vehicle Details Schema
const VehicleDetailsSchema = new mongoose.Schema(
    {
        vehicle_owner:{type:String},
        vehicle_type:{type:String, required:true},
        vehicle_name:{type:String, required:true},
        vehicle_reg_no:{type:String, required:true},
        driver_name:{type:String},
        driver_mobile_no:{type:String},
        gps_no:{type:String},
        serice_due_date:{type:String},
        insurance_due_date:{type:String},
        vendor:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const VehicleDetails = mongoose.models.VehicleDetails || mongoose.model('VehicleDetails', VehicleDetailsSchema);
export default VehicleDetails;