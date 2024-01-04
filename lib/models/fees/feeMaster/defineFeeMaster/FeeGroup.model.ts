// Import
import mongoose from 'mongoose';





// Group Schema
const GroupSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        is_special:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;