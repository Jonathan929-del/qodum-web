// Import
import mongoose from 'mongoose';





// Student Schema
const StudentSchema = new mongoose.Schema(
    {
        // Student
        student:{
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



        // Parents
        parents:{
            // Father
            father:{
                father_name:{type:String},
                middle_name:{type:String},
                last_name:{type:String},
                profession:{type:String},
                designation:{type:String},
                residence_address:{type:String},
                office_address:{type:String},
                email:{type:String},
                alternate_email:{type:String},
                dob:{type:Date},
                mobile:{type:Number},
                phone:{type:Number},
                company_name:{type:String},
                business_details:{type:String},
                qualification:{type:String},
                service_in:{type:String},
                office_phone:{type:Number},
                office_mobile:{type:Number},
                office_extension:{type:String},
                office_email:{type:String},
                office_website:{type:String},
                annual_income:{type:String},
                parent_status:{type:String}
            },
            // Mother
            mother:{
                mother_name:{type:String},
                middle_name:{type:String},
                last_name:{type:String},
                profession:{type:String},
                designation:{type:String},
                residence_address:{type:String},
                office_address:{type:String},
                email:{type:String},
                alternate_email:{type:String},
                dob:{type:Date},
                mobile:{type:Number},
                phone:{type:Number},
                company_name:{type:String},
                business_details:{type:String},
                qualification:{type:String},
                service_in:{type:String},
                office_phone:{type:Number},
                office_mobile:{type:Number},
                office_extension:{type:String},
                office_email:{type:String},
                office_website:{type:String},
                annual_income:{type:String},
                anniversary_date:{type:Date}
            }
        },



        // Other details
        others:{
            // 1
            general_description:{type:String},
            // 2
            emergency_contact:{
                person_name:{type:String},
                mobile_no:{type:Number},
                phone_no:{type:Number},
                address:{type:String},
                relation:{type:String}
            },
            // 3
            emergency_contact_two:{
                person_name:{type:String},
                mobile_no:{type:Number},
                phone_no:{type:Number},
                address:{type:String},
                relation:{type:String},
                is_alumni:{type:Boolean}
            },
            // 4
            student_other_details:{
                stream:{type:String},
                optional_subject:{type:String},
                medical_history:{type:String},
                allergies:{type:String},
                other_medical_info:{type:String},
                family_doctor_name:{type:String},
                family_doctor_phone:{type:Number},
                family_doctor_address:{type:String},
                distance_from_home:{type:Number},
                no_of_living_years:{type:Number},
                only_child:{type:Boolean},
            },
            // 5
            student_staff_relation:{
                staff_ward:{type:String},
                staff_name:{type:String}
            },
            // 6
            previous_school_details:{
                school_name:{type:String},
                city:{type:String},
                class:{type:String},
                year:{type:String},
                board:{type:String}
            }
        },



        // Guardian details
        guardian_details:{
            // 1
            guardian_name:{type:String},
            profession:{type:String},
            designation:{type:String},
            residence_address:{type:String},
            office_address:{type:String},
            email:{type:String},
            alternate_email:{type:String},
            dob:{type:Date},
            mobile:{type:Number},
            phone:{type:Number},
            company_name:{type:String},
            business_details:{type:String},
            qualification:{type:String},
            service_in:{type:String},
            office_phone:{type:Number},
            office_mobile:{type:Number},
            office_extension:{type:String},
            office_email:{type:String},
            office_website:{type:String},
            income:{type:String},
            // 2
            if_single_parent:{
                student_lives_with:{type:String},
                correspondence_to:{type:String},
                legal_custody_of_the_child:{type:String},
                check_id_applicable:{type:String},
                separation_reason:{type:String}
            }
        }
    },
    {
        timestamps:true
    }
);





// Export
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
export default Student;