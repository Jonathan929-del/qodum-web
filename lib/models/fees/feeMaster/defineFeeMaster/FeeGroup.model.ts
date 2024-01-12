// Import
import mongoose from 'mongoose';





// Group Schema
const GroupSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        is_special:{type:Boolean},
        affiliated_heads:[{
            type_name:{type:String},
            head_name:{type:String},
            schedule_type:{type:String},
            installment:{type:String},
            account:{type:String},
            post_account:{type:String}
        }]
    },
    {
        timestamps:true
    }
);





// Export
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;