// Import
import mongoose from 'mongoose';





// Head Schema
const HeadSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        print_name:{type:String, required:true},
        pay_schedule:{type:String, required:true},
        priority_no:{type:Number},
        type:{type:String, required:true},
        show_in_certificate:{type:Boolean},
        fee_refundable:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Head = mongoose.models.Head || mongoose.model('Head', HeadSchema);
export default Head;