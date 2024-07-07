// Import
import mongoose from 'mongoose';





// Transport Medium Schema
const TransportMediumSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        transport_medium:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const TransportMedium = mongoose.models.TransportMedium || mongoose.model('TransportMedium', TransportMediumSchema);
export default TransportMedium;