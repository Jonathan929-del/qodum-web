// Import
import mongoose from 'mongoose';





// Account Group Schema
const AccountGroupSchema = new mongoose.Schema(
    {
        group_name:{type:String, required:true, unique:true},
        category:{type:String, required:true},
        group_type:{type:String, required:true},
        group_no:{type:Number, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const AccountGroup = mongoose.models.AccountGroup || mongoose.model('AccountGroup', AccountGroupSchema);
export default AccountGroup;