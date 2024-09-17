'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStaff} from '@/lib/actions/payroll/globalMasters/staff.actions';
import FormCom from '@/components/modules/payroll/globalMasters/staff/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/staff/ViewCom';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Staff
    const [staff, setStaff] = useState([{}]);


    // Selected documents
    const [selectedDocuments, setSelectedDocuments] = useState([]);


    // Educational details
    const [educationalDetails, setEducationalDetails] = useState([{
        qualification:'',
        name_of_school_or_college:'',
        name_of_board_or_universtity:'',
        rc:'',
        subjects:'',
        percentage_of_marks:0,
        year_of_passing:''
    }]);


    // Update staff
    const [updateStaff, setUpdateStaff] = useState({
        id:'',
        isDeleteClicked:false,

        // Staff registration
        staff_registration:{
            pref_no:0,
            first_name_title:'Mr.',
            first_name:'',
            middle_name:'',
            last_name:'',
            gender:'Male',
            email:'',
            alternate_email:'',
            phone:0,
            mobile:0,
            alternate_mobile:0,
            emergency_mobile:0,
            wing:'',
            is_active:false,
            profile_picture:'',
            maritial_status:'Married',
            qualification:'',
            date_of_birth:new Date(),
            date_of_anniversary:new Date(),
            date_of_joining:new Date(),
            date_of_retire:new Date(),
            date_of_retire_is_extend:false,
            address:'',
            current_address:'',
            father_or_spouse_name:'',
            father_or_spouse_mobile:0,
            father_or_spouse_relation:'Father',
            blood_group:'',
            staff_type:'',
            designation:'',
            department:'',
            religion:'',
            aadhar_card_no:0
        },

        //Staff salary details
        staff_salary_details:{
            emp_no:'',
            pan_no:'',
            bank_name:'',
            bank_account_no:'',
            is_generate_salary:false,
            is_salary_to_bank:false,
            machine_no:0,
            pf_no:'',
            esi_no:'',
            uan_no:'',
            emp_acc_no:'',
            status:'',
            salary_group:'',
            basic_salary_part:{
                basic:{
                    value:0,
                    applied_on:new Date()
                },
                grade_pay:{
                    value:0,
                    applied_on:new Date()
                }
            },
            confirmation_date:new Date(),
            permanent_date:new Date(),
            leaving_date:new Date(),
            joining_date_epf:new Date(),
            joining_date_eps:new Date(),
            leaving_date_epf:new Date(),
            leaving_date_eps:new Date(),
            probation_date:new Date(),
            increment_date:new Date(),
            reason_of_leaving:'',
            short_name:''
        },

        // Staff salary head
        staff_salary_heads:[],

        // Staff educational details
        staff_educational_details:[{
            qualification:'',
            name_of_school_or_college:'',
            name_of_board_or_university:'',
            rc:'',
            subjects:'',
            percentage_of_marks:0,
            year_of_passing:''
        }],

        // Staff document details
        staff_document_details:{
            documents:[],
            file:''
        }
    });


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const staffRes = await fetchStaff();
            setStaff(staffRes);
        };
        fetcher();
    }, [isViewOpened, updateStaff]);
    useEffect(() => {
        const fetcher = async () => {

        };
        fetcher();
    }, []);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-2 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        staff={staff}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateStaff={setUpdateStaff}
                        setSelectedDocuments={setSelectedDocuments}
                        setEducationalDetails={setEducationalDetails}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        staff={staff}
                        updateStaff={updateStaff}
                        setUpdateStaff={setUpdateStaff}
                        selectedDocuments={selectedDocuments}
                        setSelectedDocuments={setSelectedDocuments}
                        educationalDetails={educationalDetails}
                        setEducationalDetails={setEducationalDetails}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;