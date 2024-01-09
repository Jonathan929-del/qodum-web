// Import
import mongoose from 'mongoose';





// House Schema
const HouseSchema = new mongoose.Schema(
    {
        house_name:{type:String, required:true, unique:true}
    },
    {
        timestamps:true
    }
);





// Export
const House = mongoose.models.House || mongoose.model('House', HouseSchema);
export default House;