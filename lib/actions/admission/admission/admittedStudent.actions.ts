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
        doa:Date;
        doj:Date;
        admitted_class:String;
        // 1
        image:String;
        // 2
        stream:String;
        subjects:string[];
        optional_subject:String;
        class:String;
        board:String;
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
        locality:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        whats_app_no:Number;
        religion:String;
        parish:String;
        caste:String;
        category:String;
        blood_group:String;
        cadet_type:String;
        club:String;
        is_ews:Boolean;
        is_rte:Boolean;
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
    };

    // Documents
    documents:{
        document_type:String;
        document_name:String;
    }[]
};
// Create admitted student
export const createAdmittedStudent = async ({student, parents, others, guardian_details, documents}:CreateAdmittedStudentProps) => {
    try {


        // Database connection
        connectToDb('accounts');


        // Checking if the admission number already exists
        const existingStudent = await AdmittedStudent.findOne({'student.adm_no':student.adm_no});
        if(existingStudent){
            throw new Error('Admission no. already exists');
        };


        // Creating new student
        const newStudent = await AdmittedStudent.create({
            student,
            parents,
            others,
            guardian_details,
            health_details:{
                height:0,
                weight:0
            }
        });
        newStudent.save().then(async () => {
            await AdmittedStudent.findOneAndUpdate({'student.adm_no':student.adm_no}, {'student.subjects':student.subjects, documents, affiliated_heads:[]});
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
        doa:Date;
        doj:Date;
        admitted_class:String;
        // 1
        image:String;
        // 2
        stream:String;
        subjects:string[];
        optional_subject:String;
        class:String;
        board:String;
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
        locality:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        whats_app_no:Number;
        religion:String;
        parish:String;
        caste:String;
        category:String;
        blood_group:String;
        cadet_type:String;
        club:String;
        is_ews:Boolean;
        is_rte:Boolean;
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
    };


    // Documents
    documents:{
        document_type:String;
        document_name:String;
    }[];
}
// Modify admitted student
export const modifyAdmittedStudent = async ({id, student, parents, others, guardian_details, documents}:ModifyAdmittedStudentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the admission no. already exists
        const students = await AdmittedStudent.find();
        const existingStudent = await AdmittedStudent.findById(id);
        if(existingStudent.student.adm_no !== student.adm_no && students.map(student => student.student.adm_no).includes(student.adm_no)){throw new Error('Admission no. already exists')};


        // Update student
        const updatedStudent = await AdmittedStudent.findByIdAndUpdate(id, {student, parents, others, guardian_details, documents, affiliated_heads:[]}, {new:true});
        
        
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





// Siblings search
export const siblingsSearch = async ({class_name, section, adm_no}:{class_name:String; section:String; adm_no:String;}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching student
        const students = await AdmittedStudent.find({'student.class':class_name, 'student.section':section, 'student.adm_no':adm_no});


        // Returing
        return students;

    } catch (err) {
        throw new Error(`Error fetching student: ${err}`);
    };
};





// Fetch student by admission no
export const fetchStudentByAdmNo = async ({adm_no}:{adm_no:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching student
        const student = await AdmittedStudent.findOne({'student.adm_no':adm_no});


        // Return
        return student;

    } catch (err) {
        throw new Error(`Error fetching student: ${err}`);
    };
};





// Fetch students by class and section
export const fetchStudentsByClassAndSection = async ({class_name, section}:{class_name:String; section:String;}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching student
        const students = await AdmittedStudent.find({'student.class':class_name, 'student.section':section});


        // Return
        return students;

    } catch (err) {
        throw new Error(`Error deleting students: ${err}`);
    };
};





// Modify students' health details props
interface ModifyStudentsHealthDetails{
    students:{
        adm_no:String;
        height:Number;
        weight:Number;
    }[]
};
// Modify students' health details
export const modifyStudentsHealthDetails = async ({students}:ModifyStudentsHealthDetails) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating students
        students.map(async student => {
            await AdmittedStudent.updateMany({'student.adm_no':student.adm_no}, {'health_details.height':student.height, 'health_details.weight':student.weight});
        });

        // Return
        return 'Students updated';

    } catch (err) {
        throw new Error(`Error updating students: ${err}`);
    };
};





// Fetch students by all data props
interface fetchStudentsByAllDataProps{
    name:String;
    father_name:String;
    adm_no:String;
    mobile:String;
};
// Fetch students by all data
export const fetchStudentsByAllData = async ({name, father_name, adm_no, mobile}:fetchStudentsByAllDataProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Regex
        // @ts-ignore
        const nameRegex = new RegExp(name, 'i');
        // @ts-ignore
        const fatherNameRegex = new RegExp(father_name, 'i');
        // @ts-ignore
        const admNoRegex = new RegExp(adm_no, 'i');


        // Students
        let students; 


        // Values
        const containsAnyLetters = (str:any) => {
            return /[a-zA-Z]/.test(str);
        }

        if(!containsAnyLetters(mobile)){

            // Mobile number
            const mobileRes = await AdmittedStudent.find({'student.mobile':mobile});

            // Admission number res
            const admNoRes = await AdmittedStudent.find({'student.adm_no':{$regex:admNoRegex}});

            // All res
            const allRes = mobileRes.concat(admNoRes);
            const uniqueBy = (a:any, key:any) => {
                var seen:any = {};
                return a.filter(function(item:any) {
                    var k = key(item);
                    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                })
            }
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);

            students = filteredAllRes;
        }else{

            // Name res
            const nameRes = await AdmittedStudent.find({'student.name':{$regex:nameRegex}});

            // // Father's name res
            const fatherNameRes = await AdmittedStudent.find({'parents.father.father_name':{$regex:fatherNameRegex}});

            // Admission number res
            const admNoRes = await AdmittedStudent.find({'student.adm_no':{$regex:admNoRegex}});


            const allRes = nameRes.concat(fatherNameRes, admNoRes);
            const uniqueBy = (a:any, key:any) => {
                var seen:any = {};
                return a.filter(function(item:any) {
                    var k = key(item);
                    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                })
            }
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);
            students = filteredAllRes;
        }


        // Return
        return students;

    } catch (err) {
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Fetch student by classes
export const fetchStudentsByClasses = async ({classes}:{classes:string[]}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching students
        const students = await AdmittedStudent.find({'student.class':{$in:classes}});


        // Return
        return students;

    } catch (err) {
        throw new Error(`Error fetching students: ${err}`);
    };
};