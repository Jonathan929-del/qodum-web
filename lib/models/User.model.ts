// Import
import mongoose from 'mongoose';





// User schema
const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
});





// Export
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;