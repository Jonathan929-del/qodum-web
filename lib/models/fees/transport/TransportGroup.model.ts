// Import
import mongoose from 'mongoose';





// Transport Group Schema
const TransportGroupSchema = new mongoose.Schema(
    {
        distance_name:{type:String, required:true, unique:true},
        distance_amount:{type:Number, required:true},
        distance_from:{type:Number},
        distance_to:{type:Number}
    },
    {
        timestamps:true
    }
);





// Export
const TransportGroup = mongoose.models.TransportGroup || mongoose.model('TransportGroup', TransportGroupSchema);
export default TransportGroup;