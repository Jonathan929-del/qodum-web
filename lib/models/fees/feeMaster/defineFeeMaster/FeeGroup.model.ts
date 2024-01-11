// Import
import mongoose from 'mongoose';





// Group Schema
const GroupSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        is_special:{type:Boolean},
        affiliated_heads:{
            fee_type:{type:String},
            head:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Head'
            },
            installment:{type:String},
            account:{type:String},
            post_account:{type:String}
        }
    },
    {
        timestamps:true
    }
);





// Export
const Group = mongoose.models.Group || mongoose.model('Group', GroupSchema);
export default Group;