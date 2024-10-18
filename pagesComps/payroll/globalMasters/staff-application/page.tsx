'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/payroll/globalMasters/staff-application/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/staff-application/ViewCom';
import {fetchStaffApplication} from '@/lib/actions/payroll/globalMasters/staffApplication.actions';





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
        subjects:[],
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

        // Staff educational details
        staff_educational_details:[{
            qualification:'',
            name_of_school_or_college:'',
            name_of_board_or_university:'',
            rc:'',
            subjects:[],
            percentage_of_marks:0,
            year_of_passing:''
        }],

        // Staff document details
        staff_document_details:[]

    });


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const staffRes = await fetchStaffApplication();
            setStaff(staffRes);
        };
        fetcher();
    }, [isViewOpened, updateStaff]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-2 bg-white overflow-hidden'>
            {
                // @ts-ignore
                localStorage.getItem('isStaffAdmissionStateOpened') && localStorage.getItem('isStaffAdmissionStateOpened') === 'true' ?
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
                ) : (
                    <p className='text-xs text-red-500'>Admission is Closed!</p>
                )
            }
        </div>
    );
};





// Export
export default page;