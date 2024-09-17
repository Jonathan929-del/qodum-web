// Import
import mongoose from 'mongoose';





// Staff Schema
const StaffSchema = new mongoose.Schema(
    {
        // Session
        session:{type:String, required:true},

        // Staff registration
        staff_registration:{
            pref_no:{type:Number, required:true, unique:true},
            first_name_title:{type:String, required:true},
            first_name:{type:String, required:true},
            middle_name:{type:String},
            last_name:{type:String},
            gender:{type:String},
            email:{type:String},
            alternate_email:{type:String},
            phone:{type:Number},
            mobile:{type:Number, required:true},
            alternate_mobile:{type:Number},
            emergency_mobile:{type:Number},
            wing:{type:String},
            is_active:{type:Boolean},
            profile_picture:{type:String},
            maritial_status:{type:String},
            qualification:{type:String},
            date_of_birth:{type:Date, required:true},
            date_of_anniversary:{type:Date},
            date_of_joining:{type:Date},
            date_of_retire:{type:Date},
            date_of_retire_is_extend:{type:Boolean},
            address:{type:String},
            current_address:{type:String},
            father_or_spouse_name:{type:String, required:true},
            father_or_spouse_mobile:{type:Number},
            father_or_spouse_relation:{type:String},
            blood_group:{type:String},
            staff_type:{type:String, required:true},
            designation:{type:String, required:true},
            department:{type:String, required:true},
            religion:{type:String},
            aadhar_card_no:{type:Number},
        },

        //Staff salary details
        staff_salary_details:{
            emp_no:{type:String},
            pan_no:{type:String},
            bank_name:{type:String},
            bank_account_no:{type:String},
            is_generate_salary:{type:Boolean},
            is_salary_to_bank:{type:Boolean},
            machine_no:{type:Number},
            pf_no:{type:String},
            esi_no:{type:String},
            uan_no:{type:String},
            emp_acc_no:{type:String},
            status:{type:String},
            salary_group:{type:String},
            basic_salary_part:{
                basic:{
                    value:{type:Number},
                    applied_on:{type:Date}
                },
                grade_pay:{
                    value:{type:Number},
                    applied_on:{type:Date}
                }
            },
            confirmation_date:{type:Date},
            permanent_date:{type:Date},
            leaving_date:{type:Date},
            joining_date_epf:{type:Date},
            joining_date_eps:{type:Date},
            leaving_date_epf:{type:Date},
            leaving_date_eps:{type:Date},
            probation_date:{type:Date},
            increment_date:{type:Date},
            reason_of_leaving:{type:String},
            short_name:{type:String}
        },

        // Staff salary head
        staff_salary_heads:{type:Array},


        // Staff educational details
        staff_educational_details:{
            qualification:{type:String},
            name_of_school_or_college:{type:String},
            name_of_board_or_university:{type:String},
            rc:{type:String},
            subjects:{type:String},
            percentage_of_marks:{type:Number},
            year_of_passing:{type:String}
        },


        // Staff document details
        staff_document_details:{
            documents:{type:Array},
            file:{type:String}
        }

    },
    {
        timestamps:true
    }
);





// Export
const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
export default Staff;