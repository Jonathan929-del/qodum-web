'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Subject from '@/lib/models/admission/globalMasters/Subject.model';
import AdmittedStudent from '@/lib/models/admission/admission/AdmittedStudent.model';





// Create admitted student props
interface CreateAdmittedStudentProps{
    // Student
    student:{
        // Admission data
        section:String;
        adm_no:String;
        pen_no:String;
        roll_no:String;
        bill_no:String;
        is_university:Boolean;
        re_adm_no:String;
        is_minority:Boolean;
        is_disability:Boolean;
        dis_disc:String;
        is_new:Boolean;
        is_active:Boolean;
        reason:String;
        is_only_child:Boolean;
        student_status:String;
        house:String;
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
        subjects:string[];
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
// Create admitted student
export const createAdmittedStudent = async ({student, parents, others, guardian_details}:CreateAdmittedStudentProps) => {
    try {


        // Database connection
        connectToDb('accounts');


        // Checking if the register number already exists
        const existingStudent = await AdmittedStudent.findOne({'student.reg_no':student.reg_no});
        if(existingStudent){
            throw new Error('Register no. already exists');
        };


        // Creating new student
        const newStudent = await AdmittedStudent.create({
            student:{
                // Admission data
                section:student.section,
                adm_no:student.adm_no,
                pen_no:student.pen_no,
                roll_no:student.roll_no,
                bill_no:student.bill_no,
                is_university:student.is_university,
                re_adm_no:student.re_adm_no,
                is_minority:student.is_minority,
                is_disability:student.is_disability,
                dis_disc:student.dis_disc,
                is_new:student.is_new,
                is_active:student.is_active,
                reason:student.reason,
                is_only_child:student.is_only_child,
                student_status:student.student_status,
                house:student.house,
                // 1
                is_up_for_admission:true,
                is_online:student.is_online,
                image:student.image,
                enquiry_no:student.enquiry_no,
                reg_no:student.reg_no,
                pros_no:student.pros_no,
                amount:student.amount,
                date:student.date,
                payment_mode:student.payment_mode,
                admission_account:student.admission_account,
                post_account:student.post_account,
                // 2
                class:student.class,
                board:student.board,
                stream:student.stream,
                subjects:student.subjects,
                optional_subject:student.optional_subject,
                name:student.name,
                middle_name:student.middle_name,
                last_name:student.last_name,
                dob:student.dob,
                place_of_birth:student.place_of_birth,
                gender:student.gender,
                contact_person_name:student.contact_person_name,
                contact_person_mobile:student.contact_person_mobile,
                contact_person_email:student.contact_person_email,
                secondary_contact_no:student.secondary_contact_no,
                h_no_and_streets:student.h_no_and_streets,
                email:student.email,
                city:student.city,
                mobile:student.mobile,
                state:student.state,
                pin_code:student.pin_code,
                aadhar_card_no:student.aadhar_card_no,
                religion:student.religion,
                blood_group:student.blood_group,
                caste:student.caste,
                category:student.category,
                is_ews:student.is_ews,
                sibling:student.sibling,
                transport:student.transport,
                nationality:student.nationality
            },
            parents,
            others,
            guardian_details
        });
        newStudent.save().then(async () => {
            await AdmittedStudent.findOneAndUpdate({'student.reg_no':student.reg_no}, {'student.subjects':student.subjects});
        });


        // Updating subjects
        const subjectsAffected = await Subject.find({subject_name:student.subjects, is_university:true});
        subjectsAffected.map(async s => {
            await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats - 1});
        });


        // Return
        return newStudent;


    } catch (err:any) {
        console.log(`Error creating admitted student: ${err.message}`);
    };
};





// Fetch admitted students
export const fetchAdmittedStudents = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const students = await AdmittedStudent.find();
        return students;

    } catch (err:any) {
        throw new Error(`Error fetching admitted students: ${err}`);
    };
};





// Modify admitted student props
interface ModifyAdmittedStudentProps{
    id:String;
    // Student
    student:{
        // Admission data
        section:String;
        adm_no:String;
        pen_no:String;
        roll_no:String;
        bill_no:String;
        is_university:Boolean;
        re_adm_no:String;
        is_minority:Boolean;
        is_disability:Boolean;
        dis_disc:String;
        is_new:Boolean;
        is_active:Boolean;
        reason:String;
        is_only_child:Boolean;
        student_status:String;
        house:String;
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
        subjects:string[];
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
// Modify admitted student
export const modifyAdmittedStudent = async ({id, student, parents, others, guardian_details}:ModifyAdmittedStudentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the register no. already exists
        const students = await AdmittedStudent.find();
        const existingStudent = await AdmittedStudent.findById(id);
        if(existingStudent.student.reg_no !== student.reg_no && students.map(student => student.student.reg_no).includes(student.reg_no)){throw new Error('Register no. already exists')};


        // Update student
        const updatedStudent = await AdmittedStudent.findByIdAndUpdate(id, {student, parents, others, guardian_details}, {new:true});
        
        
        // Subjects handling
        const previousSubjects = await Subject.find({subject_name:existingStudent.student.subjects, is_university:true});
        const newSubjects = await Subject.find({subject_name:student.subjects, is_university:true});
        

        // Additional subjects
        const additionalSubjects = newSubjects.filter(s => !previousSubjects.map(subject => subject.subject_name).includes(s.subject_name));
        if(additionalSubjects.length > 0){
            additionalSubjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats - 1});
            });
        };


        // Substracted subjects
        const subtractedSubjects = previousSubjects.filter(s => !newSubjects.map(subject => subject.subject_name).includes(s.subject_name));
        if(subtractedSubjects.length > 0){
            subtractedSubjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats + 1});
            });
        };


        // Return
        return updatedStudent;
    

    } catch (err) {
        throw new Error(`Error updating admitted student: ${err}`);
    };
};





// Delete admitted student
export const deleteAdmittedStudent = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Adding subject available seats
        const student = await AdmittedStudent.findById(id);
        const subjects = await Subject.find({subject_name:student.student.subjects, is_university:true});
        if(subjects.length > 0){
            subjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats + 1});
            });
        };


        // Deleting student
        await AdmittedStudent.findByIdAndDelete(id);
        return 'Student Deleted';

    } catch (err) {
        throw new Error(`Error deleting student: ${err}`);
    };
};