// Import
import mongoose from 'mongoose';





// Student Schema
const StudentSchema = new mongoose.Schema(
    {
        // 1
        class:{type:String, required:true},
        board:{type:String},
        reg_no:{type:Number, required:true},
        pros_no:{type:Number},
        amount:{type:Number},
        date:{type:Date},
        payment_mode:{type:String},
        admission_account:{type:String},
        post_account:{type:String},
        session:{type:String},


        // 2
        name:{type:String, required:true},
        middle_name:{type:String},
        last_name:{type:String},
        dob:{type:Date},
        place_of_birth:{type:String},
        gender:{type:String},
        contact_person_name:{type:String},
        contact_person_mobile:{type:Number},
        contact_person_email:{type:String},
        secondary_contact_no:{type:Number},
        h_no_and_streets:{type:String},
        email:{type:String},
        city:{type:String},
        mobile:{type:Number},
        state:{type:String},
        pin_code:{type:Number},
        aadhar_card_no:{type:Number},
        religion:{type:String},
        blood_group:{type:String},
        caste:{type:String},
        category:{type:String},
        is_ews:{type:Boolean},
        sibling:{type:Boolean},
        transport:{type:String},
        nationality:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;