'use client';
// Imports
import PrintButton from './PrintButton';
import {Button} from '../../../../ui/button';
import {AlertDialogAction} from '@radix-ui/react-alert-dialog';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main Function
const Buttons = ({setIsViewOpened, students, updateStudent, setUpdateStudent, onSubmit, form, setFile, setImageSrc}:any) => {


    // Cancel click
    const cancelClick = () => {
        // Reseting form
        form.reset({
            // Student
            student:{
                // 1
                image:'',
                enquiry_no:'',
                reg_no:'',
                pros_no:'',
                amount:'',
                date:new Date(),
                payment_mode:'',
                admission_account:'',
                post_account:'',
                // 2
                with_enquiry:false,
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
                    family_doctor_phone:'',
                    family_doctor_address:'',
                    distance_from_home:'',
                    no_of_living_year:'',
                    only_child:'',
                    general_description:'',
                },
                // 2
                student_staff_relation:{
                    staff_ward:'',
                    staff_name:''
                },
                // 3
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
        // Reseting updte entity
        setUpdateStudent({
            id:'',
            isDeleteClicked:false,
            // Student
            student:{
                // 1
                reg_no:'',
                enquiry_no:'',
                pros_no:'',
                amount:'',
                date:new Date(),
                payment_mode:'',
                admission_account:'',
                post_account:'',
                // 2
                with_enquiry:false,
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
                    family_doctor_phone:'',
                    family_doctor_address:'',
                    distance_from_home:'',
                    no_of_living_year:'',
                    only_child:'',
                    general_description:'',
                },
                // 2
                student_staff_relation:{
                    staff_ward:'',
                    staff_name:''
                },
                // 3
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
        // Image
        setFile(null);
        setImageSrc('');
    };


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();


    return (
        <div className='flex flex-row items-center justify-between pb-4 pt-8 gap-2 ml-0'>
            {
                updateStudent.id === '' ? (
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
                                onClick={() => setUpdateStudent({...updateStudent, isDeleteClicked:true})}
                            >
                                Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={() => setUpdateStudent({...updateStudent, isDeleteClicked:false})}
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
                onClick={() => setIsViewOpened(true)}
                className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                         hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'
            >
                View
            </span>


            {/* Print button */}
            <PrintButton students={students}/>


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