// Import
import mongoose from 'mongoose';





// Stream Schema
const StreamSchema = new mongoose.Schema(
    {
        stream_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const Stream = mongoose.models.Stream || mongoose.model('Stream', StreamSchema);
export default Stream;