// Import
import mongoose from 'mongoose';





// Stationary Details Schema
const StationaryDetailsSchema = new mongoose.Schema(
    {
        stationary_name:{type:String, required:true, unique:true},
        amount:{type:Number, required:true},
        account_name:{type:String, required:true},
        school_name:{type:String, required:true},
        session:{type:String},
        is_online:{type:Boolean, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const StationaryDetails = mongoose.models.StationaryDetails || mongoose.model('StationaryDetails', StationaryDetailsSchema);
export default StationaryDetails;