'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStudents} from '@/lib/actions/admission/admission/student.actions';
import {fetchCastes} from '@/lib/actions/admission/globalMasters/caste.actions';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchStaffNames} from '@/lib/actions/payroll/globalMasters/staff.actions';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchCategories} from '@/lib/actions/admission/globalMasters/category.actions';
import {fetchProfessions} from '@/lib/actions/payroll/globalMasters/profession.actions';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchAdmissionEnquiries} from '@/lib/actions/admission/admission/enquiry.actions';
import {fetchBloodGroups} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import {fetchDesignations} from '@/lib/actions/payroll/globalMasters/designation.actions';
import {fetchGeneralLedgers} from '@/lib/actions/accounts/accounts/generalLedger.actions';
import {fetchNationalities} from '@/lib/actions/admission/globalMasters/nationality.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import FormCom from '@/components/modules/admission/admission/admissionFormRegistration/FormCom';
import ViewCom from '@/components/modules/admission/admission/admissionFormRegistration/ViewCom';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import EnquiryViewCom from '@/components/modules/admission/admission/admissionFormRegistration/EnquiryViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState('');


    // Students
    const [students, setStudents] = useState([{}]);


    // Admission Enquiries
    const [admissionEnquiries, setAdmissionEnquiries] = useState([{}]);


    // Update student
    const [updateStudent, setUpdateStudent] = useState({
        id:'',
        isDeleteClicked:false,

        // Student
        student:{
            // 1
            is_online:false,
            image:'',
            enquiry_no:'',
            reg_no:'',
            pros_no:'',
            amount:0,
            date:new Date(),
            payment_mode:localStorage.getItem('pay_mode') !== null ? localStorage.getItem('pay_mode') : '',
            admission_account:localStorage.getItem('admission_account') !== null ? localStorage.getItem('admission_account') : '',
            post_account:localStorage.getItem('post_account') !== null ? localStorage.getItem('post_account') : '',
            // 2
            class:'',
            board:'',
            stream:'',
            subjects:[''],
            optional_subject:'',
            name:'',
            middle_name:'',
            last_name:'',
            dob:new Date(),
            place_of_birth:'',
            gender:'Male',
            contact_person_name:'',
            contact_person_mobile:0,
            contact_person_email:'',
            secondary_contact_no:0,
            h_no_and_streets:'',
            email:'',
            city:'',
            mobile:0,
            state:'',
            pin_code:0,
            aadhar_card_no:0,
            religion:'',
            blood_group:'',
            caste:'',
            category:'',
            is_ews:false,
            sibling:false,
            transport:'',
            nationality:''
        },

        // Parents
        parents:{
            // Father
            father:{
                father_name:'',
                middle_name:'',
                last_name:'',
                profession:'',
                designation:'',
                residence_address:'',
                office_address:'',
                email:'',
                alternate_email:'',
                dob:new Date(),
                mobile:0,
                phone:0,
                company_name:'',
                business_details:'',
                qualification:'',
                service_in:'',
                office_phone:0,
                office_mobile:0,
                office_extension:'',
                office_email:'',
                office_website:'',
                annual_income:'',
                parent_status:''
            },
            // Mother
            mother:{
                mother_name:'',
                middle_name:'',
                last_name:'',
                profession:'',
                designation:'',
                residence_address:'',
                office_address:'',
                email:'',
                alternate_email:'',
                dob:new Date(),
                mobile:0,
                phone:0,
                company_name:'',
                business_details:'',
                qualification:'',
                service_in:'',
                office_phone:0,
                office_mobile:0,
                office_extension:'',
                office_email:'',
                office_website:'',
                annual_income:'',
                anniversary_date:new Date()
            }
        },

        // Other details
        others:{
            // 1
            student_other_details:{
                medical_history:'',
                descriptions:'',
                allergies:'',
                allergies_causes:'',
                family_doctor_name:'',
                family_doctor_phone:0,
                family_doctor_address:'',
                distance_from_home:'',
                no_of_living_year:0,
                only_child:'',
                general_description:''
            },
            // 2
            student_staff_relation:{
                staff_ward:'',
                staff_name:''
            },
            // 3
            is_alumni:{
                is_alumni:false,
                academic_session:'',
                class_name:'',
                admission_number:0
            },
            // 4
            previous_school_details:[
                {
                    school_name:'',
                    board:'',
                    passing_year:'',
                    total_marks:'',
                    percentage:'',
                    result:'',
                    is_alumni:'',
                    father_name:'',
                    father_passing_year:'',
                    mother_name:'',
                    mother_passing_year:''
                },
                {
                    school_name:'',
                    board:'',
                    passing_year:'',
                    total_marks:'',
                    percentage:'',
                    result:'',
                    is_alumni:'',
                    father_name:'',
                    father_passing_year:'',
                    mother_name:'',
                    mother_passing_year:''
                },
                {
                    school_name:'',
                    board:'',
                    passing_year:'',
                    total_marks:'',
                    percentage:'',
                    result:'',
                    is_alumni:'',
                    father_name:'',
                    father_passing_year:'',
                    mother_name:'',
                    mother_passing_year:''
                }
            ]
        },

        // Guardian details
        guardian_details:{
            // 1
            guardian_name:'',
            profession:'',
            designation:'',
            company_name:'',
            business_details:'',
            qualification:'',
            // 2
            if_single_parent:{
                student_lives_with:'',
                legal_custody_of_the_child:'',
                correspondence_to:'',
                check_id_applicable:'',
                separation_reason:''
            }
        }
    });


    // Values from enquiry
    const [valuesFromEnquiry, setValuesFromEnquiry] = useState({
        enquiry_no:'',
        visitor_name:'',
        visitor_address:'',
        mobile_no:0,
        student_name:'',
        class_name:'',
        contact_person:''
    });


    // Selected subjects
    const [selectedSubjects, setSelectedSubjects] = useState([]);


    // Subjects
    const [subjects, setSubjects] = useState([{}]);


    // Optional subjects
    const [optionalSubjects, setOptionalSubjects] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Streams
    const [streams, setStreams] = useState([{}]);


    // Religions
    const [religions, setReligions] = useState([{}]);


    // Categories
    const [categories, setCategories] = useState([{}]);


    // Bank Ledgers
    const [bankLedgers, setBankLedgers] = useState([{}]);


    // Admission Accounts
    const [admissionAccounts, setAdmissionAccounts] = useState([{}]);


    // Blood groups
    const [bloodGroups, setBloodGroups] = useState([{}]);


    // Casts
    const [casts, setCasts] = useState([{}]);


    // Nationalities
    const [nationalities, setNationlaities] = useState([{}]);


    // Designations
    const [designations, setDesignations] = useState([{}]);


    // Professions
    const [professions, setProfessions] = useState([{}]);


    // Staff
    const [staff, setStaff] = useState([{}]);


    // Previous schools details
    const [previousSchoolsDetails, setPreviousSchoolsDetails] = useState([{
        class:'',
        school_name:'',
        board:'',
        passing_year:'',
        total_marks:'',
        obtain_marks:'',
        percentage:'',
        result:''
    }]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const enquiriesRes = await fetchAdmissionEnquiries();
            const studentsRes = await fetchStudents();
            setAdmissionEnquiries(enquiriesRes.filter((e:any) => !studentsRes.map((s:any) => s.student?.enquiry_no).includes(e?.enquiry_no)));
            setStudents(studentsRes);
            const classesRes = await fetchClasses();
            const boardsRes = await fetchBoards();
            const streamsRes = await fetchStreams();
            const subjectsRes = await fetchSubjects();
            const optionalSubjectsRes = await fetchOptionalSubjects();
            const religionsRes = await fetchReligions();
            const categoriesRes = await fetchCategories();
            const bankLedgerRes = await fetchBankLedgers();
            const admissionAccountRes = await fetchGeneralLedgers();
            const bloodGroupsRes = await fetchBloodGroups();
            const castsRes = await fetchCastes();
            const nationalitiesRes = await fetchNationalities();
            const designationsRes = await fetchDesignations();
            const professionsRes = await fetchProfessions();
            const staffRes = await fetchStaffNames();
            setClasses(classesRes);
            setBoards(boardsRes);
            setStreams(streamsRes);
            setSubjects(subjectsRes);
            setOptionalSubjects(optionalSubjectsRes);
            setReligions(religionsRes);
            setCategories(categoriesRes);
            setBankLedgers(bankLedgerRes);
            setAdmissionAccounts(admissionAccountRes);
            setBloodGroups(bloodGroupsRes);
            setCasts(castsRes);
            setNationlaities(nationalitiesRes);
            setDesignations(designationsRes);
            setProfessions(professionsRes);
            setStaff(staffRes);
        };
        fetcher();
    }, [isViewOpened, updateStudent]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-2 bg-white overflow-hidden'>
            {
                isViewOpened === 'admission' ? (
                    <ViewCom
                        students={students}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateStudent={setUpdateStudent}
                        setValuesFromEnquiry={setValuesFromEnquiry}
                        setSelectedSubjects={setSelectedSubjects}
                        setPreviousSchoolsDetails={setPreviousSchoolsDetails}
                    />
                ) : isViewOpened === 'enquiry' ? (
                    <EnquiryViewCom
                        setUpdateStudent={setUpdateStudent}
                        enquiries={admissionEnquiries}
                        setIsViewOpened={setIsViewOpened}
                        setSelectedSubjects={setSelectedSubjects}
                        setValuesFromEnquiry={setValuesFromEnquiry}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        students={students}
                        updateStudent={updateStudent}
                        valuesFromEnquiry={valuesFromEnquiry}
                        setUpdateStudent={setUpdateStudent}
                        admissionEnquiries={admissionEnquiries}
                        setValuesFromEnquiry={setValuesFromEnquiry}
                        selectedSubjects={selectedSubjects}
                        setSelectedSubjects={setSelectedSubjects}
                        subjects={subjects}
                        optionalSubjects={optionalSubjects}
                        classes={classes}
                        boards={boards}
                        streams={streams}
                        religions={religions}
                        categories={categories}
                        bankLedgers={bankLedgers}
                        admissionAccounts={admissionAccounts}
                        bloodGroups={bloodGroups}
                        casts={casts}
                        nationalities={nationalities}
                        previousSchoolsDetails={previousSchoolsDetails}
                        setPreviousSchoolsDetails={setPreviousSchoolsDetails}
                        designations={designations}
                        professions={professions}
                        staff={staff}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;