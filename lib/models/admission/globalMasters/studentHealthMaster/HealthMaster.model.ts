// Import
import mongoose from 'mongoose';





// Health Master Schema
const HealthMasterSchema = new mongoose.Schema(
    {
        health_parameter:{type:String, required:true, unique:true},
        unit:{type:String, required:true},
    },
    {
        timestamps:true
    }
);





// Export
const HealthMaster = mongoose.models.HealthMaster || mongoose.model('HealthMaster', HealthMasterSchema);
export default HealthMaster;