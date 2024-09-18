'use client';
// Imports
import moment from 'moment';
import PrintButton from './PrintButton';
import {Button} from '../../../../ui/button';
import {AlertDialogAction} from '@radix-ui/react-alert-dialog';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main Function
const Buttons = ({setIsViewOpened, staff, updateStaff, setUpdateStaff, onSubmit, form, setFile, setImageSrc, setDateOfBirth, setDateOfAnniversary, setDateOfJoining, setDateOfRetire, setConfirmationDate, setPermanentDate, setLeavingDate, setJoiningDateEpf, setJoiningDateEps, setLeavingDateEpf, setLeavingDateEps, setProbationDate, setIncrementDate, setSelectedDocuments, setEducationalDetails}:any) => {

    // Cancel click
    const cancelClick = () => {

        // Reseting update entity
        setUpdateStaff({
            id:'',
            isDeleteClicked:false,

            // Staff registration
            staff_registration:{
                pref_no:staff.length,
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
            staff_educational_details:[],

            // Staff document details
            staff_document_details:[]
        });


        // Reseting form
        form.reset({
            // Staff registration
            staff_registration:{
                pref_no:staff.length,
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
            staff_educational_details:[],

            staff_document_details:[]
        });


        // Reseting other variables
        setFile(null);
        setImageSrc('');
        setDateOfBirth(moment());
        setDateOfAnniversary(moment());
        setDateOfJoining(moment());
        setDateOfRetire(moment());
        setConfirmationDate(moment());
        setPermanentDate(moment());
        setLeavingDate(moment());
        setJoiningDateEpf(moment());
        setJoiningDateEps(moment());
        setLeavingDateEpf(moment());
        setLeavingDateEps(moment());
        setProbationDate(moment());
        setIncrementDate(moment());
        setSelectedDocuments([]);
        setEducationalDetails([{
            qualification:'',
            name_of_school_or_college:'',
            name_of_board_or_universtity:'',
            rc:'',
            subjects:'',
            percentage_of_marks:0,
            year_of_passing:''
        }]);

    };


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();

    return (
        <div className='flex flex-row items-center justify-between pb-4 pt-8 gap-2 ml-0'>
            {
                updateStaff.id === '' ? (
                    <Button
                        type='submit'
                        className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>
                ) : (
                    <>


                        {/* Modify button */}
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white
                                hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0] sm:text-[16px] sm:px-4'
                            >
                                Modify
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to modify this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button
                                            className='border-[0.5px] border-black'
                                            onClick={handleSubmit}
                                        >
                                            Yes
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>


                        {/* Delete button */}
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white
                                hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b] sm:text-[16px] sm:px-4'
                                onClick={() => setUpdateStaff({...updateStaff, isDeleteClicked:true})}
                            >
                                Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={() => setUpdateStaff({...updateStaff, isDeleteClicked:false})}
                                    >
                                        No
                                    </AlertDialogCancel>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={handleSubmit}
                                    >
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            }


            {/* View button */}
            <span
                onClick={() => setIsViewOpened('admission')}
                className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                         hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'
            >
                View
            </span>


            {/* Print button */}
            <PrintButton staff={staff}/>


            {/* Cancel button */}
            <span
                className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
                onClick={cancelClick}
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default Buttons;