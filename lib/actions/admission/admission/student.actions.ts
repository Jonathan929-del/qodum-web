'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Student from '@/lib/models/admission/admission/Student.model';





// Create student props
interface CreateStudentProps{
    // Student
    student:{
        // 1
        class:String;
        board:String;
        reg_no:Number;
        pros_no:Number;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        session:String;
        // 2
        name:String;
        middle_name:String;
        last_name:String;
        dob:Date;
        place_of_birth:String;
        gender:String;
        contact_person_name:String;
        contact_person_mobile:Number;
        contact_person_email:String;
        secondary_contact_no:Number;
        h_no_and_streets:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        religion:String;
        blood_group:String;
        caste:String;
        category:String;
        is_ews:Boolean;
        sibling:Boolean;
        transport:String;
        nationality:String;
    };

    // Parents
    parents:{
        // Father
        father:{
            father_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date,
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            parent_status:String;
        },
        // Mother
        mother:{
            mother_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date;
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            anniversary_date:Date;
        }
    };

    // Other details
    others:{
        // 1
        general_description:String;
        // 2
        emergency_contact:{
            person_name:String;
            mobile_no:Number;
            phone_no:Number;
            address:String;
            relation:String;
        },
        // 3
        emergency_contact_two:{
            person_name:String;
            mobile_no:Number;
            phone_no:Number;
            address:String;
            relation:String;
            is_alumni:Boolean;
        },
        // 4
        student_other_details:{
            stream:String;
            optional_subject:String;
            medical_history:String;
            allergies:String;
            other_medical_info:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:Number;
            no_of_living_years:Number;
            only_child:Boolean;
        },
        // 5
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        // 6
        previous_school_details:{
            school_name:String;
            city:String;
            class:String;
            year:String;
            board:String;
        }
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        residence_address:String;
        office_address:String;
        email:String;
        alternate_email:String;
        dob:Date;
        mobile:Number;
        phone:Number;
        company_name:String;
        business_details:String;
        qualification:String;
        service_in:String;
        office_phone:Number;
        office_mobile:Number;
        office_extension:String;
        office_email:String;
        office_website:String;
        income:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            correspondence_to:String;
            legal_custody_of_the_child:String;
            check_id_applicable:String;
            separation_reason:String;
        }
    }
};
// Create student
export const createStudent = async ({student, parents, others, guardian_details}:CreateStudentProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new student
        const newStudent = await Student.create({
            student,
            parents,
            others,
            guardian_details
        });
        newStudent.save();


        // Return
        return newStudent;


    } catch (err:any) {
        console.log(`Error creating student: ${err.message}`);
    };
};





// Fetch students
export const fetchStudents = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const students = await Student.find();
        return students;

    } catch (err:any) {
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Modify student props
interface ModifyStudentProps{
    id:String;
    // Student
    student:{
        // 1
        class:String;
        board:String;
        reg_no:Number;
        pros_no:Number;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        session:String;
        // 2
        name:String;
        middle_name:String;
        last_name:String;
        dob:Date;
        place_of_birth:String;
        gender:String;
        contact_person_name:String;
        contact_person_mobile:Number;
        contact_person_email:String;
        secondary_contact_no:Number;
        h_no_and_streets:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        religion:String;
        blood_group:String;
        caste:String;
        category:String;
        is_ews:Boolean;
        sibling:Boolean;
        transport:String;
        nationality:String;
    };

    // Parents
    parents:{
        // Father
        father:{
            father_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date,
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            parent_status:String;
        },
        // Mother
        mother:{
            mother_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date;
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            anniversary_date:Date;
        }
    };

    // Other details
    others:{
        // 1
        general_description:String;
        // 2
        emergency_contact:{
            person_name:String;
            mobile_no:Number;
            phone_no:Number;
            address:String;
            relation:String;
        },
        // 3
        emergency_contact_two:{
            person_name:String;
            mobile_no:Number;
            phone_no:Number;
            address:String;
            relation:String;
            is_alumni:Boolean;
        },
        // 4
        student_other_details:{
            stream:String;
            optional_subject:String;
            medical_history:String;
            allergies:String;
            other_medical_info:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:Number;
            no_of_living_years:Number;
            only_child:Boolean;
        },
        // 5
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        // 6
        previous_school_details:{
            school_name:String;
            city:String;
            class:String;
            year:String;
            board:String;
        }
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        residence_address:String;
        office_address:String;
        email:String;
        alternate_email:String;
        dob:Date;
        mobile:Number;
        phone:Number;
        company_name:String;
        business_details:String;
        qualification:String;
        service_in:String;
        office_phone:Number;
        office_mobile:Number;
        office_extension:String;
        office_email:String;
        office_website:String;
        income:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            correspondence_to:String;
            legal_custody_of_the_child:String;
            check_id_applicable:String;
            separation_reason:String;
        }
    }
}
// Modify student
export const modifyStudent = async ({id, student, parents, others, guardian_details}:ModifyStudentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update student
        const updatedStudent = await Student.findByIdAndUpdate(id, {student, parents, others, guardian_details}, {new:true});
        return updatedStudent;


    } catch (err) {
        throw new Error(`Error updating student: ${err}`);
    };
};





// Delete student
export const deleteStudent = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting student
        await Student.findByIdAndDelete(id);
        return 'Student Deleted';

    } catch (err) {
        throw new Error(`Error deleting student: ${err}`);
    };
};