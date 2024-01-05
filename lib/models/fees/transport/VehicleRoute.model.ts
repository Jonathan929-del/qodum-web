// Import
import mongoose from 'mongoose';





// Vehicle Route Schema
const VehicleRouteSchema = new mongoose.Schema(
    {
        route_no:{type:String, required:true, unique:true},
        route_description:{type:String},
        route_in_charge_name:{type:String},
        route_in_charge_mobile_no:{type:Number}
    },
    {
        timestamps:true
    }
);





// Export
const VehicleRoute = mongoose.models.VehicleRoute || mongoose.model('VehicleRoute', VehicleRouteSchema);
export default VehicleRoute;