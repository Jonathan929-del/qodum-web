'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStudents} from '@/lib/actions/admission/admission/student.actions';
import FormCom from '@/components/modules/admission/admission/admissionFormRegistration/FormCom';
import ViewCom from '@/components/modules/admission/admission/admissionFormRegistration/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Students
    const [students, setStudents] = useState([{}]);


    // Update student
    const [updateStudent, setUpdateStudent] = useState({
        id:'',
        isDeleteClicked:false,

        // Student
        student:{
            // 1
            image:'',
            reg_no:'',
            pros_no:'',
            amount:'',
            date:new Date(),
            payment_mode:'',
            admission_account:'',
            post_account:'',
            // 2
            class:'',
            board:'',
            stream:'',
            subject:'',
            optional_subject:'',
            name:'',
            middle_name:'',
            last_name:'',
            dob:new Date(),
            place_of_birth:'',
            gender:'',
            contact_person_name:'',
            contact_person_mobile:'',
            contact_person_email:'',
            secondary_contact_no:'',
            h_no_and_streets:'',
            email:'',
            city:'',
            mobile:'',
            state:'',
            pin_code:'',
            aadhar_card_no:'',
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
                mobile:'',
                phone:'',
                company_name:'',
                business_details:'',
                qualification:'',
                service_in:'',
                office_phone:'',
                office_mobile:'',
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
                mobile:'',
                phone:'',
                company_name:'',
                business_details:'',
                qualification:'',
                service_in:'',
                office_phone:'',
                office_mobile:'',
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
                distance_from_home:0,
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
            previous_school_details:{
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

    
    // Use effect
    useEffect(() => {
        const accountGroupsFetcher = async () => {
            const res = await fetchStudents();
            setStudents(res);
        };
        accountGroupsFetcher();
    }, [isViewOpened, updateStudent]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        students={students}
                        setUpdateStudent={setUpdateStudent}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        students={students}
                        updateStudent={updateStudent}
                        setUpdateStudent={setUpdateStudent}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;