// Import
import mongoose from 'mongoose';





// Staff Schema
const StaffSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        staff_type:{type:String, required:true},
        is_hourly_paid:{type:Boolean},
        show_on_ecare:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
export default Staff;