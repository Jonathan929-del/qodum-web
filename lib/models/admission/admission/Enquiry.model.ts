// Import
import mongoose from 'mongoose';





// Enquiry Schema
const EnquirySchema = new mongoose.Schema(
    {
        enquiry_no:{type:String, required:true},
        enquiry_date:{
            year:{type:String},
            month:{type:String},
            day:{type:String}
        },
        visitor_name:{type:String, required:true},
        visitor_address:{type:String, required:true},
        mobile_no:{type:Number, required:true},
        purpose_is_admission:{type:Boolean},
        student_name:{type:String},
        class_name:{type:String},
        reason_to_visit:{type:String},
        contact_person:{type:String},
        reference_details:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
export default Enquiry;