// Import
import mongoose from 'mongoose';





// Narration Master Schema
const NarrationMasterSchema = new mongoose.Schema(
        {
            voucher_type:{type:String, required:true},
            narration:{type:String, required:true}
        },
        {
            timestamps:true
        }
    );





// Export
const NarrationMaster = mongoose.models.NarrationMaster || mongoose.model('NarrationMaster', NarrationMasterSchema);
export default NarrationMaster;