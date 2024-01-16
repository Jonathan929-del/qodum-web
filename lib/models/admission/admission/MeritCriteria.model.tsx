// Import
import mongoose from 'mongoose';





// Merit Criteria Schema
const MeritCriteriaSchema = new mongoose.Schema(
    {
        category_name:{type:String, required:true, unique:true},
        is_default:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const MeritCriteria = mongoose.models.MeritCriteria || mongoose.model('MeritCriteria', MeritCriteriaSchema);
export default MeritCriteria;