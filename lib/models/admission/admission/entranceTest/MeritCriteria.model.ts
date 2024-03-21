// Import
import mongoose from 'mongoose';





// Merit Criteria Schema
const MeritCriteriaSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true, unique:true},
        maximum_point:{type:Number, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const MeritCriteria = mongoose.models.MeritCriteria || mongoose.model('MeritCriteria', MeritCriteriaSchema);
export default MeritCriteria;