// Import
import mongoose from 'mongoose';





// User Schema
const UserSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true},
        user_name:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        is_reset_password:{type:Boolean},
        designation:{type:String},
        email:{type:String},
        employee:{type:String},
        mobile:{type:Number},
        profile_picture:{type:String},
        schools:{type:Array},
        is_active:{type:Boolean},
        enable_otp:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;