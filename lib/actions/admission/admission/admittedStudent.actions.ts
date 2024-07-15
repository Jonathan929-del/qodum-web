'use server';
// Imports
import moment from 'moment';
import {connectToDb} from '@/lib/mongoose';
import RouteStop from '@/lib/models/fees/transport/RouteStop.model';
import Subject from '@/lib/models/admission/globalMasters/Subject.model';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';
import TransportGroup from '@/lib/models/fees/transport/TransportGroup.model';
import Class from '@/lib/models/fees/globalMasters/defineClassDetails/Class.model';
import {fetchInstallments} from '../../fees/feeMaster/feeMaster/installment.actions';
import AdmittedStudent from '@/lib/models/admission/admission/AdmittedStudent.model';
import Installment from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeInstallment.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isStudentsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await AdmittedStudent.find({session:activeSession.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Students session transfer
export const studentsSesssionTransfer = async ({next_session, classes}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        // students.map(async (s:any) => {
        //     await AdmittedStudent.findOneAndUpdate({'student.adm_no':s.adm_no}, {'student.class':s.class, 'student.section':s.section, session:next_session});
        // });
        // Records
        classes.map(async (c:any) => {
            await AdmittedStudent.findOneAndUpdate({'student.class':c.class_name}, {'student.class':c.next_class, 'student.section':c.next_section, session:next_session})
        });


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





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


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the admission number already exists
        const existingStudent = await AdmittedStudent.findOne({'student.adm_no':student.adm_no});
        if(existingStudent){
            throw new Error('Admission no. already exists');
        };


        // Class fees
        const theClass = await Class.findOne({class_name:student.class});


        // Creating new student
        const newStudent = await AdmittedStudent.create({
            session:activeSession.year_name,
            student,
            parents,
            others,
            guardian_details,
            health_details:{
                height:0,
                weight:0
            },
            transport_details:{
                route:'',
                stop:'',
                vehicle:'',
                months:[]
            }
        });
        newStudent.save().then(async () => {
            await AdmittedStudent.findOneAndUpdate({'student.adm_no':student.adm_no}, {'student.subjects':student.subjects, documents, affiliated_heads:{group_name:theClass.affiliated_heads.group_name, heads:theClass.affiliated_heads.heads}});
        });


        // Updating subjects
        const subjectsAffected = await Subject.find({subject_name:student.subjects, is_university:true});
        subjectsAffected.map(async s => {
            await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats - 1});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating admitted student: ${err.message}`);
    };
};





// Fetch admitted students
export const fetchAdmittedStudents = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const students = await AdmittedStudent.find({session:activeSession.year_name});
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


        // Class fees
        const theClass = await Class.findOne({class_name:student.class});


        // Update student
        const updatedStudent = await AdmittedStudent.findByIdAndUpdate(id, {student, parents, others, guardian_details, documents}, {new:true});
        
        
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
        return 'Updated';

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


        // Return
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
        const studentRes = {
            ...student._doc,
            _id:student._doc._id.toString()
        };


        // Return
        return studentRes;

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
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Fetch students by class and section Transport
export const fetchStudentsByClassAndSectionTransport = async ({class_name, section}:{class_name:String; section:String;}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Students
        let students;


        if(section || section !== ''){
            students = await AdmittedStudent.find({'student.class':class_name, 'student.section':section});
        }else{
            students = await AdmittedStudent.find({'student.class':class_name});
        };


        // Return
        return students;

    } catch (err) {
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Modify students' health details props
interface ModifyStudentsHealthDetails{
    students:any
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
    class_name:String;
    section_name:String;
};
// Fetch students by all data
export const fetchStudentsByAllData = async ({name, father_name, adm_no, mobile, class_name, section_name}:fetchStudentsByAllDataProps) => {
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
            };
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);

            if(class_name !== '' || section_name !== ''){
                if(class_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.class === class_name);
                };
                if(section_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.section === section_name);
                };
                if(class_name !== '' && section_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.class === class_name && s.student.section === section_name);
                };
            }else{
                students = filteredAllRes;
            };
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
            };
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);

            if(class_name !== '' || section_name !== ''){
                if(class_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.class === class_name);
                };
                if(section_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.section === section_name);
                };
                if(class_name !== '' && section_name !== ''){
                    students = filteredAllRes.filter((s:any) => s.student.class === class_name && s.student.section === section_name);
                };
            }else{
                students = filteredAllRes;
            };
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





// Modify student affiliated heads props
interface ModifyStudentAffiliatedHeadsProps{
    id:String;
    affiliated_heads:any;
};
// Modify student affiliated heads
export const ModifyStudentAffiliatedHeads = async ({id, affiliated_heads}:ModifyStudentAffiliatedHeadsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating
        await AdmittedStudent.findByIdAndUpdate(id, {affiliated_heads});

    } catch (err) {
        throw new Error(`Error updating student affiliated heads: ${err}`);
    };
};





// Fetch students count by class and section
export const fetchStudentsCountByClassAndSection = async ({class_name, section}:{class_name:String; section:String;}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Res
        let res;


        // Class res
        const classRes = await AdmittedStudent.countDocuments({'student.class':class_name});


        // Section res
        const sectionRes = await AdmittedStudent.countDocuments({'student.section':section === '' ? 'empty' : section});


        // All res
        const allRes = await AdmittedStudent.countDocuments({'student.class':class_name, 'student.section':section === '' ? 'empty' : section});


        // All res
        if(classRes > 0 && !section){
            res = classRes;
        }else if(section && classRes === 0){
            res = sectionRes;
        }else if(classRes > 0 && section){
            res = allRes;
        }


        // Return
        return res || [0];

    } catch (err) {
        throw new Error(`Error fetching students count: ${err}`);
    };
};





// Modify student transport details props
interface ModifyStudentTransportDetailsProps{
    adm_no:any;
    transport_details:any;
};
// Modify students transport details
export const ModifyStudentsTransportDetails = async ({adm_no, transport_details}:ModifyStudentTransportDetailsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching installments
        const installments  = await fetchInstallments();


        // Fetching route stop
        const routeStop = await RouteStop.findOne({stop_name:transport_details.stop})


        // Transport group amount
        const transportGroup = await TransportGroup.findOne({distance_name:routeStop.transport_groups.jan});


        // Fetching transport fee
        const transportFee = await Head.findOne({type:'transport'});
        const submitTransporFee = {
            type_name:transportFee.affiliated_fee_type || '',
            head_name:transportFee.name || '',
            schedule_type:transportFee.pay_schedule || '',
            installment:'All installments',
            account:'---',
            post_account:'---',
            fee_type:transportFee.type || '',
            amounts:installments.map((i:any) => {
                            return {
                                name:i.name,
                                value:transportGroup.distance_amount
                            }
                        })
        };


        // Updating
        await AdmittedStudent.findOneAndUpdate(
            {'student.adm_no':adm_no},
            {
                transport_details,
                $push:{'affiliated_heads.heads':submitTransporFee}
            }
        );

    } catch (err) {
        throw new Error(`Error updating student transport details: ${err}`);
    };
};





// Fee defaulter list filter props
interface FeeDefaulterListFilterProps{
    school:String;
    wing:String;
    class_name:String;
    section:String;
    classes:any;
    board:String;
    fee_type:String;
    installments:any;
    from_date:Date;
    till_date:Date;
    heads:any;
    range:String;
    range_value:Number;
};
// Fee defaulter list filter
export const FeeDefaulterListFilter = async ({school, wing, class_name, section, classes, board, fee_type, installments, from_date, till_date, heads, range, range_value}:FeeDefaulterListFilterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Students
        const students = await AdmittedStudent.find();


        // Installments
        const installmentsRes = await Installment.find();
        const pastDueDateInstallments = installmentsRes?.filter((i:any) => {
            const installmentDueDate = moment(`${i.due_date.day}-${i.due_date.month}-${i.due_date.year}`);
            return installmentDueDate.isBetween(from_date, till_date, null, '[]');
        }).map((i:any) => i.name).filter((i:any) => installments.map((item:any) => item.name).includes(i));


        // Students filter
        const filteredStudnets = students
            // Installments filter
            ?.filter((s:any) => s.affiliated_heads.heads.map((h:any) => h.amounts.map((a:any) => a.name)).flat().filter((i:any) => pastDueDateInstallments.includes(i)).length > 0)
            // Schools filter
            ?.filter((s:any) => school === 'All Schools' ? s : s)
            // Wing filter
            ?.filter((s:any) => wing === 'All Wings' ? s : s)
            // Class filter
            ?.filter((s:any) => class_name === 'Select All' ? s : s.student.class === class_name)
            // Section filter
            ?.filter((s:any) => section === 'Select All' ? s : s.student.section === section)
            // Classes filter
            ?.filter((s:any) => classes.map((c:any) => c.class_name).includes(s.student.class))
            // Board filter
            ?.filter((s:any) => board === 'All Boards' ? s : s.student.board === board)
            // Fee type filter
            ?.filter((s:any) => fee_type === 'All fee types' ? s : s.affiliated_heads.heads.map((h:any) => h.type_name).includes(fee_type))
            // Heads filter
            ?.filter((s:any) => s.affiliated_heads.heads.filter((h:any) => heads.map((head:any) => head.name).includes(h.head_name)).length > 0)


        // Return
        return filteredStudnets;


    } catch (err) {
        throw new Error(`Error filtering defaulter list: ${err}`);
    };
};





// Student details filter props
interface StudentDetailsFilterProps{
    school:String;
    classes:any;
    genders:any;
    religions:any;
    categories:any;
    seniorities:any;
    activities:any;
    statuses:any;
    is_ews:any;
    transports:any;
    is_sibling:any;
    streams:any;
    optional_subjects:any;
    professions:any;
    designations:any;
};
// Student details filter
export const studentDetailsFilter = async ({school, classes, genders, religions, categories, seniorities, activities, statuses, is_ews, transports, is_sibling, streams, optional_subjects, professions, designations}:StudentDetailsFilterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Students
        const students = await AdmittedStudent.find();


        // Filtered students
        const filteredStudents = students
            // Schools filter
            .filter((s:any) => school === 'All schools' ? s : s)
            // Classes filter
            .filter((s:any) => classes.includes(s.student.class))
            // Genders filter
            .filter((s:any) => genders.includes(s.student.gender))
            // Religions filter
            .filter((s:any) => religions.includes(s.student.religion))
            // Categories filter
            .filter((s:any) => categories.includes(s.student.category))
            // Is new filter
            .filter((s:any) => {
                if(seniorities.includes('New') && seniorities.includes('Old')){
                    return s;
                }else if(seniorities.includes('New')){
                    return s.student.is_new;
                }else{
                    return !s.student.is_new;
                };
            })
            // Is active filter
            .filter((s:any) => {
                if(activities.includes('Yes') && activities.includes('No')){
                    return s;
                }else if(activities.includes('Yes')){
                    return s.student.is_active;
                }else{
                    return !s.student.is_active;
                };
            })
            // Status filter
            .filter((s:any) => statuses.includes(s.student.student_status))
            // Is ews filter
            .filter((s:any) => {
                if(is_ews.includes('Yes') && is_ews.includes('No')){
                    return s;
                }else if(is_ews.includes('Yes')){
                    return s.student.is_ews;
                }else{
                    return !s.student.is_ews;
                };
            })
            // Transport filter
            .filter((s:any) => s)
            // Is sibling filter
            .filter((s:any) => {
                if(is_sibling.includes('Yes') && is_sibling.includes('No')){
                    return s;
                }else if(is_sibling.includes('Yes')){
                    return s.student.is_sibling;
                }else{
                    return !s.student.is_sibling;
                };
            })
            // Streams filter
            .filter((s:any) => streams.includes(s.student.stream))
            // Optional subject filter
            .filter((s:any) => optional_subjects.includes(s.student.optional_subject))
            // Profession filter
            .filter((s:any) => professions.includes(s.parents.father.profession))
            // Designations filter
            .filter((s:any) => designations.includes(s.parents.father.designation))


        // Return
        return filteredStudents;
        
    }catch (err){
        throw new Error(`Error filtering student details: ${err}`);  
    };
};





// Class wise student strength filter props
interface ClassWiseStudentStrengthFilterProps{
    date_of_adm:Date;
    class_name:String;
    is_new_students:Boolean;
    section:String;
};
// Class wise student strength filter
export const classWiseStudentStrengthFilter = async ({date_of_adm, class_name, is_new_students, section}:ClassWiseStudentStrengthFilterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Students
        const students = await AdmittedStudent.find();


        // Filtered students
        const filteredStudents = students
            // Date of admission filter
            .filter((s:any) => s.student.doa < date_of_adm)
            // Class filter
            .filter((s:any) => class_name === 'All classes' ? s : s.student.class === class_name)
            // Is new filter
            .filter((s:any) => is_new_students ? s.student.is_new : s)
            // Section filter
            .filter((s:any) => section === 'All sections' ? s : s.student.section === section)


        // Return
        return filteredStudents;
        
    }catch (err){
        throw new Error(`Error filtering student details: ${err}`);  
    };
};