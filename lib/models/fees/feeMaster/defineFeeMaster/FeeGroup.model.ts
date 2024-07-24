// Import
import mongoose from 'mongoose';





// Group Schema
const GroupSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true},
        is_special:{type:Boolean},
        affiliated_heads:{type:Array}
    },
    {
        timestamps:true
    }
);





// Export
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;