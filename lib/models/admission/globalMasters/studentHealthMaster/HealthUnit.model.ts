// Import
import mongoose from 'mongoose';





// Health Unit Schema
const HealthUnitSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        unit_name:{type:String, required:true, unique:true},
        unit_type:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const HealthUnit = mongoose.models.HealthUnit || mongoose.model('HealthUnit', HealthUnitSchema);
export default HealthUnit;