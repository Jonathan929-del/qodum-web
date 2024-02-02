'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Student from '@/lib/models/admission/admission/Student.model';





// Create student props
interface CreateStudentProps{
    // Student
    student:{
        // 1
        is_online:Boolean;
        image:String;
        enquiry_no:String;
        reg_no:String;
        pros_no:String;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        // 2
        class:String;
        board:String;
        stream:String;
        subject:String;
        optional_subject:String;
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
        student_other_details:{
            medical_history:String;
            descriptions:String;
            allergies:String;
            allergies_causes:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:Number;
            no_of_living_year:Number;
            only_child:String;
            general_description:String;
        },
        // 2
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        // 3
        is_alumni:{
            is_alumni:Boolean;
            academic_session:String;
            class_name:String;
            admission_number:Number;
        },
        // 4
        previous_school_details:{
            school_name:String;
            board:String;
            passing_year:String;
            total_marks:String;
            percentage:String;
            result:String;
            is_alumni:String;
            father_name:String;
            father_passing_year:String;
            mother_name:String;
            mother_passing_year:String;
        }[]
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        company_name:String;
        business_details:String;
        qualification:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            legal_custody_of_the_child:String;
            correspondence_to:String;
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


        // Checking if the register number already exists
        const existingStudent = await Student.findOne({'student.reg_no':student.reg_no});
        if(existingStudent){
            throw new Error('Register no. already exists');
        };


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
        is_online:Boolean;
        image:String;
        enquiry_no:String;
        reg_no:String;
        pros_no:String;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        // 2
        class:String;
        board:String;
        stream:String;
        subject:String;
        optional_subject:String;
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
        student_other_details:{
            medical_history:String;
            descriptions:String;
            allergies:String;
            allergies_causes:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:Number;
            no_of_living_year:Number;
            only_child:String;
            general_description:String;
        },
        // 2
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        is_alumni:{
            is_alumni:Boolean;
            academic_session:String;
            class_name:String;
            admission_number:Number;
        },
        // 3
        previous_school_details:{
            school_name:String;
            board:String;
            passing_year:String;
            total_marks:String;
            percentage:String;
            result:String;
            is_alumni:String;
            father_name:String;
            father_passing_year:String;
            mother_name:String;
            mother_passing_year:String;
        }[]
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        company_name:String;
        business_details:String;
        qualification:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            legal_custody_of_the_child:String;
            correspondence_to:String;
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


        // Checking if the register no. already exists
        const students = await Student.find();
        const existingStudent = await Student.findById(id);
        if(existingStudent.student.reg_no !== student.reg_no && students.map(student => student.student.reg_no).includes(student.reg_no)){throw new Error('Register no. already exists')};


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