'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import Other from './forms/Others';
import Parent from './forms/Parent';
import {deepEqual} from '@/lib/utils';
import Student from './forms/Student';
import Guardian from './forms/Guardian';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {uploadStudentImage} from '@/lib/actions/image.actions';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {StudentValidation} from '@/lib/validations/admission/admission/student.validation';
import {createStudent, deleteStudent, modifyStudent} from '@/lib/actions/admission/admission/student.actions';





// Main function
const FormCom = ({setIsViewOpened, students, updateStudent, setUpdateStudent, setValuesFromEnquiry, valuesFromEnquiry, admissionEnquiries}:any) => {


    // Toast
    const {toast} = useToast();

    // Is Loading
    const [isLoading, setIsLoading] = useState(false);


    // File
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');



    // Comparison object
    const comparisonObject = {
        // Student
        student:{
            // 1
            image:updateStudent.student.image,
            enquiry_no:updateStudent.student.enquiry_no,
            reg_no:updateStudent.student.reg_no,
            pros_no:updateStudent.student.pros_no,
            amount:updateStudent.student.amount,
            date:updateStudent.student.date,
            payment_mode:updateStudent.student.payment_mode,
            admission_account:updateStudent.student.admission_account,
            post_account:updateStudent.student.post_account,
            // 2
            class:updateStudent.student.class,
            board:updateStudent.student.board,
            stream:updateStudent.student.stream,
            subject:updateStudent.student.subject,
            optional_subject:updateStudent.student.optional_subject,
            name:updateStudent.student.name,
            middle_name:updateStudent.student.middle_name,
            last_name:updateStudent.student.last_name,
            dob:updateStudent.student.dob,
            place_of_birth:updateStudent.student.place_of_birth,
            gender:updateStudent.student.gender,
            contact_person_name:updateStudent.student.contact_person_name,
            contact_person_mobile:updateStudent.student.contact_person_mobile,
            contact_person_email:updateStudent.student.contact_person_email,
            secondary_contact_no:updateStudent.student.secondary_contact_no,
            h_no_and_streets:updateStudent.student.h_no_and_streets,
            email:updateStudent.student.email,
            city:updateStudent.student.city,
            mobile:updateStudent.student.mobile,
            state:updateStudent.student.state,
            pin_code:updateStudent.student.pin_code,
            aadhar_card_no:updateStudent.student.aadhar_card_no,
            religion:updateStudent.student.religion,
            blood_group:updateStudent.student.blood_group,
            caste:updateStudent.student.caste,
            category:updateStudent.student.category,
            is_ews:updateStudent.student.is_ews,
            sibling:updateStudent.student.sibling,
            transport:updateStudent.student.transport,
            nationality:updateStudent.student.nationality
        },

        // Parents
        parents:{
            // Father
            father:{
                father_name:updateStudent.parents.father.father_name,
                middle_name:updateStudent.parents.father.middle_name,
                last_name:updateStudent.parents.father.last_name,
                profession:updateStudent.parents.father.profession,
                designation:updateStudent.parents.father.designation,
                residence_address:updateStudent.parents.father.residence_address,
                office_address:updateStudent.parents.father.office_address,
                email:updateStudent.parents.father.email,
                alternate_email:updateStudent.parents.father.alternate_email,
                dob:updateStudent.parents.father.dob,
                mobile:updateStudent.parents.father.mobile,
                phone:updateStudent.parents.father.phone,
                company_name:updateStudent.parents.father.company_name,
                business_details:updateStudent.parents.father.business_details,
                qualification:updateStudent.parents.father.qualification,
                service_in:updateStudent.parents.father.service_in,
                office_phone:updateStudent.parents.father.office_phone,
                office_mobile:updateStudent.parents.father.office_mobile,
                office_extension:updateStudent.parents.father.office_extension,
                office_email:updateStudent.parents.father.office_email,
                office_website:updateStudent.parents.father.office_website,
                annual_income:updateStudent.parents.father.annual_income,
                parent_status:updateStudent.parents.father.parent_status
            },
            // Mother
            mother:{
                mother_name:updateStudent.parents.mother.mother_name,
                middle_name:updateStudent.parents.mother.middle_name,
                last_name:updateStudent.parents.mother.last_name,
                profession:updateStudent.parents.mother.profession,
                designation:updateStudent.parents.mother.designation,
                residence_address:updateStudent.parents.mother.residence_address,
                office_address:updateStudent.parents.mother.office_address,
                email:updateStudent.parents.mother.email,
                alternate_email:updateStudent.parents.mother.alternate_email,
                dob:updateStudent.parents.mother.dob,
                mobile:updateStudent.parents.mother.mobile,
                phone:updateStudent.parents.mother.phone,
                company_name:updateStudent.parents.mother.company_name,
                business_details:updateStudent.parents.mother.business_details,
                qualification:updateStudent.parents.mother.qualification,
                service_in:updateStudent.parents.mother.service_in,
                office_phone:updateStudent.parents.mother.office_phone,
                office_mobile:updateStudent.parents.mother.office_mobile,
                office_extension:updateStudent.parents.mother.office_extension,
                office_email:updateStudent.parents.mother.office_email,
                office_website:updateStudent.parents.mother.office_website,
                annual_income:updateStudent.parents.mother.annual_income,
                anniversary_date:updateStudent.parents.mother.anniversary_date
            }
        },

        // Other details
        others:{
            // 1
            student_other_details:{
                medical_history:updateStudent.others.student_other_details.medical_history,
                descriptions:updateStudent.others.student_other_details.descriptions,
                allergies:updateStudent.others.student_other_details.allergies,
                allergies_causes:updateStudent.others.student_other_details.allergies_causes,
                family_doctor_name:updateStudent.others.student_other_details.family_doctor_name,
                family_doctor_phone:updateStudent.others.student_other_details.family_doctor_phone,
                family_doctor_address:updateStudent.others.student_other_details.family_doctor_address,
                distance_from_home:updateStudent.others.student_other_details.distance_from_home,
                no_of_living_year:updateStudent.others.student_other_details.no_of_living_year,
                only_child:updateStudent.others.student_other_details.only_child,
                general_description:updateStudent.others.student_other_details.general_description,
            },
            // 2
            student_staff_relation:{
                staff_ward:updateStudent.others.student_staff_relation.staff_ward,
                staff_name:updateStudent.others.student_staff_relation.staff_name
            },
            // 3
            is_alumni:{
                is_alumni:updateStudent.others.is_alumni.is_alumni,
                academic_session:updateStudent.others.is_alumni.academic_session,
                class_name:updateStudent.others.is_alumni.class_name,
                admission_number:updateStudent.others.is_alumni.admission_number
            },
            // 4
            previous_school_details:[
                {
                    school_name:updateStudent.others.previous_school_details[0].school_name,
                    board:updateStudent.others.previous_school_details[0].board,
                    passing_year:updateStudent.others.previous_school_details[0].passing_year,
                    total_marks:updateStudent.others.previous_school_details[0].total_marks,
                    percentage:updateStudent.others.previous_school_details[0].percentage,
                    result:updateStudent.others.previous_school_details[0].result,
                    is_alumni:updateStudent.others.previous_school_details[0].is_alumni,
                    father_name:updateStudent.others.previous_school_details[0].father_name,
                    father_passing_year:updateStudent.others.previous_school_details[0].father_passing_year,
                    mother_name:updateStudent.others.previous_school_details[0].mother_name,
                    mother_passing_year:updateStudent.others.previous_school_details[0].mother_passing_year
                },
                {
                    school_name:updateStudent.others.previous_school_details[1].school_name,
                    board:updateStudent.others.previous_school_details[1].board,
                    passing_year:updateStudent.others.previous_school_details[1].passing_year,
                    total_marks:updateStudent.others.previous_school_details[1].total_marks,
                    percentage:updateStudent.others.previous_school_details[1].percentage,
                    result:updateStudent.others.previous_school_details[1].result,
                    is_alumni:updateStudent.others.previous_school_details[1].is_alumni,
                    father_name:updateStudent.others.previous_school_details[1].father_name,
                    father_passing_year:updateStudent.others.previous_school_details[1].father_passing_year,
                    mother_name:updateStudent.others.previous_school_details[1].mother_name,
                    mother_passing_year:updateStudent.others.previous_school_details[1].mother_passing_year
                },
                {
                    school_name:updateStudent.others.previous_school_details[2].school_name,
                    board:updateStudent.others.previous_school_details[2].board,
                    passing_year:updateStudent.others.previous_school_details[2].passing_year,
                    total_marks:updateStudent.others.previous_school_details[2].total_marks,
                    percentage:updateStudent.others.previous_school_details[2].percentage,
                    result:updateStudent.others.previous_school_details[2].result,
                    is_alumni:updateStudent.others.previous_school_details[2].is_alumni,
                    father_name:updateStudent.others.previous_school_details[2].father_name,
                    father_passing_year:updateStudent.others.previous_school_details[2].father_passing_year,
                    mother_name:updateStudent.others.previous_school_details[2].mother_name,
                    mother_passing_year:updateStudent.others.previous_school_details[2].mother_passing_year
                }
            ]
        },

        // Guardian details
        guardian_details:{
            // 1
            guardian_name:updateStudent.guardian_details.guardian_name,
            profession:updateStudent.guardian_details.profession,
            designation:updateStudent.guardian_details.designation,
            company_name:updateStudent.guardian_details.company_name,
            business_details:updateStudent.guardian_details.business_details,
            qualification:updateStudent.guardian_details.qualification,
            // 2
            if_single_parent:{
                student_lives_with:updateStudent.guardian_details.if_single_parent.student_lives_with,
                legal_custody_of_the_child:updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
                correspondence_to:updateStudent.guardian_details.if_single_parent.correspondence_to,
                check_id_applicable:updateStudent.guardian_details.if_single_parent.check_id_applicable,
                separation_reason:updateStudent.guardian_details.if_single_parent.separation_reason
            }
        }
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StudentValidation),
        defaultValues:{
            // Student
            student:{
                // 1
                image:updateStudent.id === '' ? '' : updateStudent.student.image,
                enquiry_no:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.enquiry_no : updateStudent.id === '' ? '' : updateStudent.student.enquiry_no,
                reg_no:updateStudent.id === '' ? '' : updateStudent.student.reg_no,
                pros_no:updateStudent.id === '' ? '' : updateStudent.student.pros_no,
                amount:updateStudent.id === '' ? 0 : updateStudent.student.amount,
                date:updateStudent.id === '' ? new Date() : updateStudent.student.date,
                payment_mode:updateStudent.id === '' ? '' : updateStudent.student.payment_mode,
                admission_account:updateStudent.id === '' ? '' : updateStudent.student.admission_account,
                post_account:updateStudent.id === '' ? '' : updateStudent.student.post_account,
                // 2
                with_enquiry:true,
                class:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.class_name : updateStudent.id === '' ? '' : updateStudent.student.class,
                board:updateStudent.id === '' ? '' : updateStudent.student.board,
                stream:updateStudent.id === '' ? '' : updateStudent.student.stream,
                subject:updateStudent.id === '' ? '' : updateStudent.student.subject,
                optional_subject:updateStudent.id === '' ? '' : updateStudent.student.optional_subject,
                name:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.student_name : updateStudent.id === '' ? '' : updateStudent.student.name,
                middle_name:updateStudent.id === '' ? '' : updateStudent.student.middle_name,
                last_name:updateStudent.id === '' ? '' : updateStudent.student.last_name,
                dob:updateStudent.id === '' ? new Date() : updateStudent.student.dob,
                place_of_birth:updateStudent.id === '' ? '' : updateStudent.student.place_of_birth,
                gender:updateStudent.id === '' ? 'Male' : updateStudent.student.gender,
                contact_person_name:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.contact_person : updateStudent.id === '' ? '' : updateStudent.student.contact_person_name,
                contact_person_mobile:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.mobile_no : updateStudent.id === '' ? 0 : updateStudent.student.contact_person_mobile,
                contact_person_email:updateStudent.id === '' ? '' : updateStudent.student.contact_person_email,
                secondary_contact_no:updateStudent.id === '' ? 0 : updateStudent.student.secondary_contact_no,
                h_no_and_streets:valuesFromEnquiry.enquiry_no !== '' ? valuesFromEnquiry.visitor_address : updateStudent.id === '' ? '' : updateStudent.student.h_no_and_streets,
                email:updateStudent.id === '' ? '' : updateStudent.student.email,
                city:updateStudent.id === '' ? '' : updateStudent.student.city,
                mobile:updateStudent.id === '' ? 0 : updateStudent.student.mobile,
                state:updateStudent.id === '' ? '' : updateStudent.student.state,
                pin_code:updateStudent.id === '' ? 0 : updateStudent.student.pin_code,
                aadhar_card_no:updateStudent.id === '' ? 0 : updateStudent.student.aadhar_card_no,
                religion:updateStudent.id === '' ? '' : updateStudent.student.religion,
                blood_group:updateStudent.id === '' ? '' : updateStudent.student.blood_group,
                caste:updateStudent.id === '' ? '' : updateStudent.student.caste,
                category:updateStudent.id === '' ? '' : updateStudent.student.category,
                is_ews:updateStudent.id === '' ? false : updateStudent.student.is_ews,
                sibling:updateStudent.id === '' ? false : updateStudent.student.sibling,
                transport:updateStudent.id === '' ? '' : updateStudent.student.transport,
                nationality:updateStudent.id === '' ? '' : updateStudent.student.nationality
            },

            // Parents
            parents:{
                // Father
                father:{
                    father_name:updateStudent.id === '' ? '' : updateStudent.parents.father.father_name,
                    middle_name:updateStudent.id === '' ? '' : updateStudent.parents.father.middle_name,
                    last_name:updateStudent.id === '' ? '' : updateStudent.parents.father.last_name,
                    profession:updateStudent.id === '' ? '' : updateStudent.parents.father.profession,
                    designation:updateStudent.id === '' ? '' : updateStudent.parents.father.designation,
                    residence_address:updateStudent.id === '' ? '' : updateStudent.parents.father.residence_address,
                    office_address:updateStudent.id === '' ? '' : updateStudent.parents.father.office_address,
                    email:updateStudent.id === '' ? '' : updateStudent.parents.father.email,
                    alternate_email:updateStudent.id === '' ? '' : updateStudent.parents.father.alternate_email,
                    dob:updateStudent.id === '' ? new Date() : updateStudent.parents.father.dob,
                    mobile:updateStudent.id === '' ? 0 : updateStudent.parents.father.mobile,
                    phone:updateStudent.id === '' ? 0 : updateStudent.parents.father.phone,
                    company_name:updateStudent.id === '' ? '' : updateStudent.parents.father.company_name,
                    business_details:updateStudent.id === '' ? '' : updateStudent.parents.father.business_details,
                    qualification:updateStudent.id === '' ? '' : updateStudent.parents.father.qualification,
                    service_in:updateStudent.id === '' ? '' : updateStudent.parents.father.service_in,
                    office_phone:updateStudent.id === '' ? 0 : updateStudent.parents.father.office_phone,
                    office_mobile:updateStudent.id === '' ? 0 : updateStudent.parents.father.office_mobile,
                    office_extension:updateStudent.id === '' ? '' : updateStudent.parents.father.office_extension,
                    office_email:updateStudent.id === '' ? '' : updateStudent.parents.father.office_email,
                    office_website:updateStudent.id === '' ? '' : updateStudent.parents.father.office_website,
                    annual_income:updateStudent.id === '' ? '' : updateStudent.parents.father.annual_income,
                    parent_status:updateStudent.id === '' ? '' : updateStudent.parents.father.parent_status
                },
                // Mother
                mother:{
                    mother_name:updateStudent.id === '' ? '' : updateStudent.parents.mother.mother_name,
                    middle_name:updateStudent.id === '' ? '' : updateStudent.parents.mother.middle_name,
                    last_name:updateStudent.id === '' ? '' : updateStudent.parents.mother.last_name,
                    profession:updateStudent.id === '' ? '' : updateStudent.parents.mother.profession,
                    designation:updateStudent.id === '' ? '' : updateStudent.parents.mother.designation,
                    residence_address:updateStudent.id === '' ? '' : updateStudent.parents.mother.residence_address,
                    office_address:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_address,
                    email:updateStudent.id === '' ? '' : updateStudent.parents.mother.email,
                    alternate_email:updateStudent.id === '' ? '' : updateStudent.parents.mother.alternate_email,
                    dob:updateStudent.id === '' ? new Date() : updateStudent.parents.mother.dob,
                    mobile:updateStudent.id === '' ? 0 : updateStudent.parents.mother.mobile,
                    phone:updateStudent.id === '' ? 0 : updateStudent.parents.mother.phone,
                    company_name:updateStudent.id === '' ? '' : updateStudent.parents.mother.company_name,
                    business_details:updateStudent.id === '' ? '' : updateStudent.parents.mother.business_details,
                    qualification:updateStudent.id === '' ? '' : updateStudent.parents.mother.qualification,
                    service_in:updateStudent.id === '' ? '' : updateStudent.parents.mother.service_in,
                    office_phone:updateStudent.id === '' ? 0 : updateStudent.parents.mother.office_phone,
                    office_mobile:updateStudent.id === '' ? 0 : updateStudent.parents.mother.office_mobile,
                    office_extension:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_extension,
                    office_email:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_email,
                    office_website:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_website,
                    annual_income:updateStudent.id === '' ? '' : updateStudent.parents.mother.annual_income,
                    anniversary_date:updateStudent.id === '' ? new Date() : updateStudent.parents.mother.anniversary_date
                }
            },

            // Other details
            others:{
                // 1
                student_other_details:{
                    medical_history:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.medical_history,
                    descriptions:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.descriptions,
                    allergies:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.allergies,
                    allergies_causes:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.allergies_causes,
                    family_doctor_name:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_name,
                    family_doctor_phone:updateStudent.id === '' ? 0 : updateStudent.others.student_other_details.family_doctor_phone,
                    family_doctor_address:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_address,
                    distance_from_home:updateStudent.id === '' ? 0 : updateStudent.others.student_other_details.distance_from_home,
                    no_of_living_year:updateStudent.id === '' ? 0 : updateStudent.others.student_other_details.no_of_living_year,
                    only_child:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.only_child,
                    general_description:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.general_description
                },
                // 2
                student_staff_relation:{
                    staff_ward:updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_ward,
                    staff_name:updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_name
                },
                // 3
                is_alumni:{
                    is_alumni:updateStudent.id === '' ? '' : updateStudent.others.is_alumni.is_alumni,
                    academic_session:updateStudent.id === '' ? '' : updateStudent.others.is_alumni.academic_session,
                    class_name:updateStudent.id === '' ? '' : updateStudent.others.is_alumni.class_name,
                    admission_number:updateStudent.id === '' ? 0 : updateStudent.others.is_alumni.admission_number
                },
                // 4
                previous_school_details:[
                    {
                        school_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].school_name,
                        board:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].board,
                        passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].passing_year,
                        total_marks:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].total_marks,
                        percentage:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].percentage,
                        result:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].result,
                        is_alumni:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].is_alumni,
                        father_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].father_name,
                        father_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].father_passing_year,
                        mother_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].mother_name,
                        mother_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[0].mother_passing_year
                    },
                    {
                        school_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].school_name,
                        board:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].board,
                        passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].passing_year,
                        total_marks:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].total_marks,
                        percentage:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].percentage,
                        result:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].result,
                        is_alumni:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].is_alumni,
                        father_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].father_name,
                        father_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].father_passing_year,
                        mother_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].mother_name,
                        mother_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[1].mother_passing_year
                    },
                    {
                        school_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].school_name,
                        board:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].board,
                        passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].passing_year,
                        total_marks:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].total_marks,
                        percentage:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].percentage,
                        result:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].result,
                        is_alumni:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].is_alumni,
                        father_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].father_name,
                        father_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].father_passing_year,
                        mother_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].mother_name,
                        mother_passing_year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details[2].mother_passing_year
                    }
                ]
            },

            // Guardian details
            guardian_details:{
                // 1
                guardian_name:updateStudent.id === '' ? '' : updateStudent.guardian_details.guardian_name,
                profession:updateStudent.id === '' ? '' : updateStudent.guardian_details.profession,
                designation:updateStudent.id === '' ? '' : updateStudent.guardian_details.designation,
                company_name:updateStudent.id === '' ? '' : updateStudent.guardian_details.company_name,
                business_details:updateStudent.id === '' ? '' : updateStudent.guardian_details.business_details,
                qualification:updateStudent.id === '' ? '' : updateStudent.guardian_details.qualification,
                // 2
                if_single_parent:{
                    student_lives_with:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.student_lives_with,
                    legal_custody_of_the_child:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
                    correspondence_to:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.correspondence_to,
                    check_id_applicable:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.check_id_applicable,
                    separation_reason:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.separation_reason
                }
            }
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StudentValidation>) => {
        setIsLoading(true);
        // Create Student
        if(updateStudent.id === ''){
            if(students.map((student:any) => student.student.enquiry_no).includes(values.student.enquiry_no)){
                toast({title:'Enquiry no. already exists', variant:'error'});
                return;
            };
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStudentImage({data:formData, reg_no:values.student.reg_no});
            };
            await createStudent({
                // Student
                student:{
                    // 1
                    image:file !== null ? `https://qodum.s3.amazonaws.com/students/${values.student.reg_no}` : '',
                    enquiry_no:values.student.enquiry_no,
                    reg_no:values.student.reg_no,
                    pros_no:values.student.pros_no,
                    amount:values.student.amount,
                    date:values.student.date,
                    payment_mode:values.student.payment_mode,
                    admission_account:values.student.admission_account,
                    post_account:values.student.post_account,
                    // 2
                    class:values.student.class,
                    board:values.student.board,
                    stream:values.student.stream,
                    subject:values.student.subject,
                    optional_subject:values.student.optional_subject,
                    name:values.student.name,
                    middle_name:values.student.middle_name,
                    last_name:values.student.last_name,
                    dob:values.student.dob,
                    place_of_birth:values.student.place_of_birth,
                    gender:values.student.gender,
                    contact_person_name:values.student.contact_person_name,
                    contact_person_mobile:values.student.contact_person_mobile,
                    contact_person_email:values.student.contact_person_email,
                    secondary_contact_no:values.student.secondary_contact_no,
                    h_no_and_streets:values.student.h_no_and_streets,
                    email:values.student.email,
                    city:values.student.city,
                    mobile:values.student.mobile,
                    state:values.student.state,
                    pin_code:values.student.pin_code,
                    aadhar_card_no:values.student.aadhar_card_no,
                    religion:values.student.religion,
                    blood_group:values.student.blood_group,
                    caste:values.student.caste,
                    category:values.student.category,
                    is_ews:values.student.is_ews,
                    sibling:values.student.sibling,
                    transport:values.student.transport,
                    nationality:values.student.nationality
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:values.parents.father.father_name,
                        middle_name:values.parents.father.middle_name,
                        last_name:values.parents.father.last_name,
                        profession:values.parents.father.profession,
                        designation:values.parents.father.designation,
                        residence_address:values.parents.father.residence_address,
                        office_address:values.parents.father.office_address,
                        email:values.parents.father.email,
                        alternate_email:values.parents.father.alternate_email,
                        dob:values.parents.father.dob,
                        mobile:values.parents.father.mobile,
                        phone:values.parents.father.phone,
                        company_name:values.parents.father.company_name,
                        business_details:values.parents.father.business_details,
                        qualification:values.parents.father.qualification,
                        service_in:values.parents.father.service_in,
                        office_phone:values.parents.father.office_phone,
                        office_mobile:values.parents.father.office_mobile,
                        office_extension:values.parents.father.office_extension,
                        office_email:values.parents.father.office_email,
                        office_website:values.parents.father.office_website,
                        annual_income:values.parents.father.annual_income,
                        parent_status:values.parents.father.parent_status
                    },
                    // Mother
                    mother:{
                        mother_name:values.parents.mother.mother_name,
                        middle_name:values.parents.mother.middle_name,
                        last_name:values.parents.mother.last_name,
                        profession:values.parents.mother.profession,
                        designation:values.parents.mother.designation,
                        residence_address:values.parents.mother.residence_address,
                        office_address:values.parents.mother.office_address,
                        email:values.parents.mother.email,
                        alternate_email:values.parents.mother.alternate_email,
                        dob:values.parents.mother.dob,
                        mobile:values.parents.mother.mobile,
                        phone:values.parents.mother.phone,
                        company_name:values.parents.mother.company_name,
                        business_details:values.parents.mother.business_details,
                        qualification:values.parents.mother.qualification,
                        service_in:values.parents.mother.service_in,
                        office_phone:values.parents.mother.office_phone,
                        office_mobile:values.parents.mother.office_mobile,
                        office_extension:values.parents.mother.office_extension,
                        office_email:values.parents.mother.office_email,
                        office_website:values.parents.mother.office_website,
                        annual_income:values.parents.mother.annual_income,
                        anniversary_date:values.parents.mother.anniversary_date
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:values.others.student_other_details.medical_history,
                        descriptions:values.others.student_other_details.descriptions,
                        allergies:values.others.student_other_details.allergies,
                        allergies_causes:values.others.student_other_details.allergies_causes,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_year:values.others.student_other_details.no_of_living_year,
                        only_child:values.others.student_other_details.only_child,
                        general_description:values.others.student_other_details.general_description,
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 3
                    is_alumni:{
                        is_alumni:values.others.is_alumni.is_alumni,
                        academic_session:values.others.is_alumni.academic_session,
                        class_name:values.others.is_alumni.class_name,
                        admission_number:values.others.is_alumni.admission_number
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:values.others.previous_school_details[0].school_name,
                            board:values.others.previous_school_details[0].board,
                            passing_year:values.others.previous_school_details[0].passing_year,
                            total_marks:values.others.previous_school_details[0].total_marks,
                            percentage:values.others.previous_school_details[0].percentage,
                            result:values.others.previous_school_details[0].result,
                            is_alumni:values.others.previous_school_details[0].is_alumni,
                            father_name:values.others.previous_school_details[0].father_name,
                            father_passing_year:values.others.previous_school_details[0].father_passing_year,
                            mother_name:values.others.previous_school_details[0].mother_name,
                            mother_passing_year:values.others.previous_school_details[0].mother_passing_year
                        },
                        {
                            school_name:values.others.previous_school_details[1].school_name,
                            board:values.others.previous_school_details[1].board,
                            passing_year:values.others.previous_school_details[1].passing_year,
                            total_marks:values.others.previous_school_details[1].total_marks,
                            percentage:values.others.previous_school_details[1].percentage,
                            result:values.others.previous_school_details[1].result,
                            is_alumni:values.others.previous_school_details[1].is_alumni,
                            father_name:values.others.previous_school_details[1].father_name,
                            father_passing_year:values.others.previous_school_details[1].father_passing_year,
                            mother_name:values.others.previous_school_details[1].mother_name,
                            mother_passing_year:values.others.previous_school_details[1].mother_passing_year
                        },
                        {
                            school_name:values.others.previous_school_details[2].school_name,
                            board:values.others.previous_school_details[2].board,
                            passing_year:values.others.previous_school_details[2].passing_year,
                            total_marks:values.others.previous_school_details[2].total_marks,
                            percentage:values.others.previous_school_details[2].percentage,
                            result:values.others.previous_school_details[2].result,
                            is_alumni:values.others.previous_school_details[2].is_alumni,
                            father_name:values.others.previous_school_details[2].father_name,
                            father_passing_year:values.others.previous_school_details[2].father_passing_year,
                            mother_name:values.others.previous_school_details[2].mother_name,
                            mother_passing_year:values.others.previous_school_details[2].mother_passing_year
                        }
                    ]
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                }
            });
            toast({title:'Added Successfully!'});
        }
        // Modify Student
        else if(!deepEqual(comparisonObject, values) || file){
            if(comparisonObject.student.enquiry_no !== values.student.enquiry_no && students.map((student:any) => student.student.enquiry_no).includes(values.student.enquiry_no)){
                toast({title:'Enquiry no. already exists', variant:'error'});
                return;
            };
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadStudentImage({data:formData, reg_no:values.student.reg_no});
            };
            // Update
            await modifyStudent({
                id:updateStudent.id,
                // Student
                student:{
                    // 1
                    image:file !== null ? `https://qodum.s3.amazonaws.com/students/${values.student.reg_no}` : comparisonObject.student.image,
                    enquiry_no:values.student.enquiry_no,
                    reg_no:values.student.reg_no,
                    pros_no:values.student.pros_no,
                    amount:values.student.amount,
                    date:values.student.date,
                    payment_mode:values.student.payment_mode,
                    admission_account:values.student.admission_account,
                    post_account:values.student.post_account,
                    // 2
                    class:values.student.class,
                    board:values.student.board,
                    stream:values.student.stream,
                    subject:values.student.subject,
                    optional_subject:values.student.optional_subject,
                    name:values.student.name,
                    middle_name:values.student.middle_name,
                    last_name:values.student.last_name,
                    dob:values.student.dob,
                    place_of_birth:values.student.place_of_birth,
                    gender:values.student.gender,
                    contact_person_name:values.student.contact_person_name,
                    contact_person_mobile:values.student.contact_person_mobile,
                    contact_person_email:values.student.contact_person_email,
                    secondary_contact_no:values.student.secondary_contact_no,
                    h_no_and_streets:values.student.h_no_and_streets,
                    email:values.student.email,
                    city:values.student.city,
                    mobile:values.student.mobile,
                    state:values.student.state,
                    pin_code:values.student.pin_code,
                    aadhar_card_no:values.student.aadhar_card_no,
                    religion:values.student.religion,
                    blood_group:values.student.blood_group,
                    caste:values.student.caste,
                    category:values.student.category,
                    is_ews:values.student.is_ews,
                    sibling:values.student.sibling,
                    transport:values.student.transport,
                    nationality:values.student.nationality
                },

                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:values.parents.father.father_name,
                        middle_name:values.parents.father.middle_name,
                        last_name:values.parents.father.last_name,
                        profession:values.parents.father.profession,
                        designation:values.parents.father.designation,
                        residence_address:values.parents.father.residence_address,
                        office_address:values.parents.father.office_address,
                        email:values.parents.father.email,
                        alternate_email:values.parents.father.alternate_email,
                        dob:values.parents.father.dob,
                        mobile:values.parents.father.mobile,
                        phone:values.parents.father.phone,
                        company_name:values.parents.father.company_name,
                        business_details:values.parents.father.business_details,
                        qualification:values.parents.father.qualification,
                        service_in:values.parents.father.service_in,
                        office_phone:values.parents.father.office_phone,
                        office_mobile:values.parents.father.office_mobile,
                        office_extension:values.parents.father.office_extension,
                        office_email:values.parents.father.office_email,
                        office_website:values.parents.father.office_website,
                        annual_income:values.parents.father.annual_income,
                        parent_status:values.parents.father.parent_status
                    },
                    // Mother
                    mother:{
                        mother_name:values.parents.mother.mother_name,
                        middle_name:values.parents.mother.middle_name,
                        last_name:values.parents.mother.last_name,
                        profession:values.parents.mother.profession,
                        designation:values.parents.mother.designation,
                        residence_address:values.parents.mother.residence_address,
                        office_address:values.parents.mother.office_address,
                        email:values.parents.mother.email,
                        alternate_email:values.parents.mother.alternate_email,
                        dob:values.parents.mother.dob,
                        mobile:values.parents.mother.mobile,
                        phone:values.parents.mother.phone,
                        company_name:values.parents.mother.company_name,
                        business_details:values.parents.mother.business_details,
                        qualification:values.parents.mother.qualification,
                        service_in:values.parents.mother.service_in,
                        office_phone:values.parents.mother.office_phone,
                        office_mobile:values.parents.mother.office_mobile,
                        office_extension:values.parents.mother.office_extension,
                        office_email:values.parents.mother.office_email,
                        office_website:values.parents.mother.office_website,
                        annual_income:values.parents.mother.annual_income,
                        anniversary_date:values.parents.mother.anniversary_date
                    }
                },

                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:values.others.student_other_details.medical_history,
                        descriptions:values.others.student_other_details.descriptions,
                        allergies:values.others.student_other_details.allergies,
                        allergies_causes:values.others.student_other_details.allergies_causes,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_year:values.others.student_other_details.no_of_living_year,
                        only_child:values.others.student_other_details.only_child,
                        general_description:values.others.student_other_details.general_description,
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 3
                    is_alumni:{
                        is_alumni:values.others.is_alumni.is_alumni,
                        academic_session:values.others.is_alumni.academic_session,
                        class_name:values.others.is_alumni.class_name,
                        admission_number:values.others.is_alumni.admission_number
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:values.others.previous_school_details[0].school_name,
                            board:values.others.previous_school_details[0].board,
                            passing_year:values.others.previous_school_details[0].passing_year,
                            total_marks:values.others.previous_school_details[0].total_marks,
                            percentage:values.others.previous_school_details[0].percentage,
                            result:values.others.previous_school_details[0].result,
                            is_alumni:values.others.previous_school_details[0].is_alumni,
                            father_name:values.others.previous_school_details[0].father_name,
                            father_passing_year:values.others.previous_school_details[0].father_passing_year,
                            mother_name:values.others.previous_school_details[0].mother_name,
                            mother_passing_year:values.others.previous_school_details[0].mother_passing_year
                        },
                        {
                            school_name:values.others.previous_school_details[1].school_name,
                            board:values.others.previous_school_details[1].board,
                            passing_year:values.others.previous_school_details[1].passing_year,
                            total_marks:values.others.previous_school_details[1].total_marks,
                            percentage:values.others.previous_school_details[1].percentage,
                            result:values.others.previous_school_details[1].result,
                            is_alumni:values.others.previous_school_details[1].is_alumni,
                            father_name:values.others.previous_school_details[1].father_name,
                            father_passing_year:values.others.previous_school_details[1].father_passing_year,
                            mother_name:values.others.previous_school_details[1].mother_name,
                            mother_passing_year:values.others.previous_school_details[1].mother_passing_year
                        },
                        {
                            school_name:values.others.previous_school_details[2].school_name,
                            board:values.others.previous_school_details[2].board,
                            passing_year:values.others.previous_school_details[2].passing_year,
                            total_marks:values.others.previous_school_details[2].total_marks,
                            percentage:values.others.previous_school_details[2].percentage,
                            result:values.others.previous_school_details[2].result,
                            is_alumni:values.others.previous_school_details[2].is_alumni,
                            father_name:values.others.previous_school_details[2].father_name,
                            father_passing_year:values.others.previous_school_details[2].father_passing_year,
                            mother_name:values.others.previous_school_details[2].mother_name,
                            mother_passing_year:values.others.previous_school_details[2].mother_passing_year
                        }
                    ]
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                }
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Student
        else if(updateStudent.isDeleteClicked){
            await deleteStudent({id:updateStudent.id});
            toast({title:'Deleted Successfully!'});
        };


        setValuesFromEnquiry({
            enquiry_no:'',
            visitor_name:'',
            visitor_address:'',
            mobile_no:0,
            student_name:'',
            class_name:'',
            contact_person:''
        });
        // Reseting update entity
        setUpdateStudent({
            id:'',
            isDeleteClicked:false,
    
            // Student
            student:{
                // 1
                image:'',
                enquiry_no:'',
                reg_no:'',
                pros_no:'',
                amount:0,
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
        // Reseting form
        form.reset({
            // Student
            student:{
                // 1
                image:'',
                enquiry_no:'',
                reg_no:'',
                pros_no:'',
                amount:0,
                date:new Date(),
                payment_mode:'',
                admission_account:'',
                post_account:'',
                // 2
                with_enquiry:true,
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
        // Image
        setFile(null);
        setImageSrc('');
        setIsLoading(false);
    };


    // Use Effect
    useEffect(() => {
        if(updateStudent.id !== ''){
            // Student
            form.setValue('student.image', updateStudent.student.image);
            form.setValue('student.enquiry_no', updateStudent.student.enquiry_no);
            form.setValue('student.reg_no', updateStudent.student.reg_no);
            form.setValue('student.pros_no', updateStudent.student.pros_no);
            form.setValue('student.amount', updateStudent.student.amount);
            form.setValue('student.date', updateStudent.student.date);
            form.setValue('student.payment_mode', updateStudent.student.payment_mode);
            form.setValue('student.admission_account', updateStudent.student.admission_account);
            form.setValue('student.post_account', updateStudent.student.post_account);
            form.setValue('student.class', updateStudent.student.class);
            form.setValue('student.board', updateStudent.student.board);
            form.setValue('student.stream', updateStudent.student.stream);
            form.setValue('student.subject', updateStudent.student.subject);
            form.setValue('student.optional_subject', updateStudent.student.optional_subject);
            form.setValue('student.name', updateStudent.student.name);
            form.setValue('student.middle_name', updateStudent.student.middle_name);
            form.setValue('student.last_name', updateStudent.student.last_name);
            form.setValue('student.dob', updateStudent.student.dob);
            form.setValue('student.place_of_birth', updateStudent.student.place_of_birth);
            form.setValue('student.gender', updateStudent.student.gender);
            form.setValue('student.contact_person_name', updateStudent.student.contact_person_name);
            form.setValue('student.contact_person_mobile', updateStudent.student.contact_person_mobile);
            form.setValue('student.contact_person_email', updateStudent.student.contact_person_email);
            form.setValue('student.secondary_contact_no', updateStudent.student.secondary_contact_no);
            form.setValue('student.h_no_and_streets', updateStudent.student.h_no_and_streets);
            form.setValue('student.email', updateStudent.student.email);
            form.setValue('student.city', updateStudent.student.city);
            form.setValue('student.mobile', updateStudent.student.mobile);
            form.setValue('student.state', updateStudent.student.state);
            form.setValue('student.pin_code', updateStudent.student.pin_code);
            form.setValue('student.aadhar_card_no', updateStudent.student.aadhar_card_no);
            form.setValue('student.religion', updateStudent.student.religion);
            form.setValue('student.blood_group', updateStudent.student.blood_group);
            form.setValue('student.caste', updateStudent.student.caste);
            form.setValue('student.category', updateStudent.student.category);
            form.setValue('student.is_ews', updateStudent.student.is_ews);
            form.setValue('student.sibling', updateStudent.student.sibling);
            form.setValue('student.transport', updateStudent.student.transport);
            form.setValue('student.nationality', updateStudent.student.nationality);





            // Parents
            form.setValue('parents.father.father_name', updateStudent.parents.father.father_name);
            form.setValue('parents.father.middle_name', updateStudent.parents.father.middle_name);
            form.setValue('parents.father.last_name', updateStudent.parents.father.last_name);
            form.setValue('parents.father.profession', updateStudent.parents.father.profession);
            form.setValue('parents.father.designation', updateStudent.parents.father.designation);
            form.setValue('parents.father.residence_address', updateStudent.parents.father.residence_address);
            form.setValue('parents.father.office_address', updateStudent.parents.father.office_address);
            form.setValue('parents.father.email', updateStudent.parents.father.email);
            form.setValue('parents.father.alternate_email', updateStudent.parents.father.alternate_email);
            form.setValue('parents.father.dob', updateStudent.parents.father.dob);
            form.setValue('parents.father.mobile', updateStudent.parents.father.mobile);
            form.setValue('parents.father.phone', updateStudent.parents.father.phone);
            form.setValue('parents.father.company_name', updateStudent.parents.father.company_name);
            form.setValue('parents.father.business_details', updateStudent.parents.father.business_details);
            form.setValue('parents.father.qualification', updateStudent.parents.father.qualification);
            form.setValue('parents.father.service_in', updateStudent.parents.father.service_in);
            form.setValue('parents.father.office_phone', updateStudent.parents.father.office_phone);
            form.setValue('parents.father.office_mobile', updateStudent.parents.father.office_mobile);
            form.setValue('parents.father.office_extension', updateStudent.parents.father.office_extension);
            form.setValue('parents.father.office_email', updateStudent.parents.father.office_email);
            form.setValue('parents.father.office_website', updateStudent.parents.father.office_website);
            form.setValue('parents.father.annual_income', updateStudent.parents.father.annual_income);
            form.setValue('parents.father.parent_status', updateStudent.parents.father.parent_status);
            form.setValue('parents.mother.mother_name', updateStudent.parents.mother.mother_name);
            form.setValue('parents.mother.middle_name', updateStudent.parents.mother.middle_name);
            form.setValue('parents.mother.last_name', updateStudent.parents.mother.last_name);
            form.setValue('parents.mother.profession', updateStudent.parents.mother.profession);
            form.setValue('parents.mother.designation', updateStudent.parents.mother.designation);
            form.setValue('parents.mother.residence_address', updateStudent.parents.mother.residence_address);
            form.setValue('parents.mother.office_address', updateStudent.parents.mother.office_address);
            form.setValue('parents.mother.email', updateStudent.parents.mother.email);
            form.setValue('parents.mother.alternate_email', updateStudent.parents.mother.alternate_email);
            form.setValue('parents.mother.dob', updateStudent.parents.mother.dob);
            form.setValue('parents.mother.mobile', updateStudent.parents.mother.mobile);
            form.setValue('parents.mother.phone', updateStudent.parents.mother.phone);
            form.setValue('parents.mother.company_name', updateStudent.parents.mother.company_name);
            form.setValue('parents.mother.business_details', updateStudent.parents.mother.business_details);
            form.setValue('parents.mother.qualification', updateStudent.parents.mother.qualification);
            form.setValue('parents.mother.service_in', updateStudent.parents.mother.service_in);
            form.setValue('parents.mother.office_phone', updateStudent.parents.mother.office_phone);
            form.setValue('parents.mother.office_mobile', updateStudent.parents.mother.office_mobile);
            form.setValue('parents.mother.office_extension', updateStudent.parents.mother.office_extension);
            form.setValue('parents.mother.office_email', updateStudent.parents.mother.office_email);
            form.setValue('parents.mother.office_website', updateStudent.parents.mother.office_website);
            form.setValue('parents.mother.annual_income', updateStudent.parents.mother.annual_income);
            form.setValue('parents.mother.dob', updateStudent.parents.mother.dob);





            // Others
            form.setValue('others.student_other_details.medical_history', updateStudent.others.student_other_details.medical_history);
            form.setValue('others.student_other_details.descriptions', updateStudent.others.student_other_details.descriptions);
            form.setValue('others.student_other_details.allergies', updateStudent.others.student_other_details.allergies);
            form.setValue('others.student_other_details.allergies_causes', updateStudent.others.student_other_details.allergies_causes);
            form.setValue('others.student_other_details.family_doctor_name', updateStudent.others.student_other_details.family_doctor_name);
            form.setValue('others.student_other_details.family_doctor_phone', updateStudent.others.student_other_details.family_doctor_phone);
            form.setValue('others.student_other_details.family_doctor_address', updateStudent.others.student_other_details.family_doctor_address);
            form.setValue('others.student_other_details.distance_from_home', updateStudent.others.student_other_details.distance_from_home);
            form.setValue('others.student_other_details.no_of_living_year', updateStudent.others.student_other_details.no_of_living_year);
            form.setValue('others.student_other_details.only_child', updateStudent.others.student_other_details.only_child);
            form.setValue('others.student_other_details.general_description', updateStudent.others.student_other_details.general_description);
            form.setValue('others.student_staff_relation.staff_ward', updateStudent.others.student_staff_relation.staff_ward);
            form.setValue('others.student_staff_relation.staff_name', updateStudent.others.student_staff_relation.staff_name);
            form.setValue('others.is_alumni.is_alumni', updateStudent.others.is_alumni.is_alumni);
            form.setValue('others.is_alumni.academic_session', updateStudent.others.is_alumni.academic_session);
            form.setValue('others.is_alumni.class_name', updateStudent.others.is_alumni.class_name);
            form.setValue('others.is_alumni.admission_number', updateStudent.others.is_alumni.admission_number);

            form.setValue('others.previous_school_details.0.school_name', updateStudent.others.previous_school_details[0].school_name);
            form.setValue('others.previous_school_details.0.board', updateStudent.others.previous_school_details[0].board);
            form.setValue('others.previous_school_details.0.passing_year', updateStudent.others.previous_school_details[0].passing_year);
            form.setValue('others.previous_school_details.0.total_marks', updateStudent.others.previous_school_details[0].total_marks);
            form.setValue('others.previous_school_details.0.percentage', updateStudent.others.previous_school_details[0].percentage);
            form.setValue('others.previous_school_details.0.result', updateStudent.others.previous_school_details[0].result);
            form.setValue('others.previous_school_details.0.is_alumni', updateStudent.others.previous_school_details[0].is_alumni);
            form.setValue('others.previous_school_details.0.father_name', updateStudent.others.previous_school_details[0].father_name);
            form.setValue('others.previous_school_details.0.father_passing_year', updateStudent.others.previous_school_details[0].father_passing_year);
            form.setValue('others.previous_school_details.0.mother_name', updateStudent.others.previous_school_details[0].mother_name);
            form.setValue('others.previous_school_details.0.mother_passing_year', updateStudent.others.previous_school_details[0].mother_passing_year);

            form.setValue('others.previous_school_details.1.school_name', updateStudent.others.previous_school_details[1].school_name);
            form.setValue('others.previous_school_details.1.board', updateStudent.others.previous_school_details[1].board);
            form.setValue('others.previous_school_details.1.passing_year', updateStudent.others.previous_school_details[1].passing_year);
            form.setValue('others.previous_school_details.1.total_marks', updateStudent.others.previous_school_details[1].total_marks);
            form.setValue('others.previous_school_details.1.percentage', updateStudent.others.previous_school_details[1].percentage);
            form.setValue('others.previous_school_details.1.result', updateStudent.others.previous_school_details[1].result);
            form.setValue('others.previous_school_details.1.is_alumni', updateStudent.others.previous_school_details[1].is_alumni);
            form.setValue('others.previous_school_details.1.father_name', updateStudent.others.previous_school_details[1].father_name);
            form.setValue('others.previous_school_details.1.father_passing_year', updateStudent.others.previous_school_details[1].father_passing_year);
            form.setValue('others.previous_school_details.1.mother_name', updateStudent.others.previous_school_details[1].mother_name);
            form.setValue('others.previous_school_details.1.mother_passing_year', updateStudent.others.previous_school_details[1].mother_passing_year);

            form.setValue('others.previous_school_details.2.school_name', updateStudent.others.previous_school_details[2].school_name);
            form.setValue('others.previous_school_details.2.board', updateStudent.others.previous_school_details[2].board);
            form.setValue('others.previous_school_details.2.passing_year', updateStudent.others.previous_school_details[2].passing_year);
            form.setValue('others.previous_school_details.2.total_marks', updateStudent.others.previous_school_details[2].total_marks);
            form.setValue('others.previous_school_details.2.percentage', updateStudent.others.previous_school_details[2].percentage);
            form.setValue('others.previous_school_details.2.result', updateStudent.others.previous_school_details[2].result);
            form.setValue('others.previous_school_details.2.is_alumni', updateStudent.others.previous_school_details[2].is_alumni);
            form.setValue('others.previous_school_details.2.father_name', updateStudent.others.previous_school_details[2].father_name);
            form.setValue('others.previous_school_details.2.father_passing_year', updateStudent.others.previous_school_details[2].father_passing_year);
            form.setValue('others.previous_school_details.2.mother_name', updateStudent.others.previous_school_details[2].mother_name);
            form.setValue('others.previous_school_details.2.mother_passing_year', updateStudent.others.previous_school_details[2].mother_passing_year);





            // Guardian
            form.setValue('guardian_details.guardian_name', updateStudent.guardian_details.guardian_name);
            form.setValue('guardian_details.profession', updateStudent.guardian_details.profession);
            form.setValue('guardian_details.designation', updateStudent.guardian_details.designation);
            form.setValue('guardian_details.company_name', updateStudent.guardian_details.company_name);
            form.setValue('guardian_details.business_details', updateStudent.guardian_details.business_details);
            form.setValue('guardian_details.qualification', updateStudent.guardian_details.qualification);
            form.setValue('guardian_details.if_single_parent.student_lives_with', updateStudent.guardian_details.if_single_parent.student_lives_with);
            form.setValue('guardian_details.if_single_parent.legal_custody_of_the_child', updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child);
            form.setValue('guardian_details.if_single_parent.correspondence_to', updateStudent.guardian_details.if_single_parent.correspondence_to);
            form.setValue('guardian_details.if_single_parent.check_id_applicable', updateStudent.guardian_details.if_single_parent.check_id_applicable);
            form.setValue('guardian_details.if_single_parent.separation_reason', updateStudent.guardian_details.if_single_parent.separation_reason);
        }
    }, [updateStudent]);
    useEffect(() => {
        if(valuesFromEnquiry.enquiry_no !== ''){
            form.setValue('student.enquiry_no', valuesFromEnquiry.enquiry_no);
            form.setValue('student.class', valuesFromEnquiry.class_name);
            form.setValue('student.name', valuesFromEnquiry.student_name);
            form.setValue('student.contact_person_name', valuesFromEnquiry.contact_person);
            form.setValue('student.contact_person_mobile', valuesFromEnquiry.mobile_no);
            form.setValue('student.h_no_and_streets', valuesFromEnquiry.visitor_address);
        }
    }, [valuesFromEnquiry]);
    useEffect(() => {}, [form.watch('others')]);


    return (
        <div className='w-[95%] h-full max-w-[1500px] flex flex-col items-center'>
            <Form
                {...form}
            >
                {isLoading ? (
                    <LoadingIcon />
                ) : (
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full h-full flex flex-col items-center px-2 sm:px-4'
                    >


                        {/* Tabs */}
                        <Tabs
                            defaultValue='student'
                            className='relative w-full h-[85%] pr-2 pl-16 border-[0.5px] border-[#ccc] rounded-[5px] overflow-scroll custom-sidebar-scrollbar'
                        >
                            <TabsList className='-rotate-90 absolute left-[-130px] top-[45%]'>
                                <TabsTrigger value='student'>Student</TabsTrigger>
                                <TabsTrigger value='parent'>Parent</TabsTrigger>
                                <TabsTrigger value='other'>Other</TabsTrigger>
                                <TabsTrigger value='guardian'>Guardian</TabsTrigger>
                            </TabsList>
                            <TabsContent value='student' className='w-full'>
                                <Student
                                    form={form}
                                    setFile={setFile}
                                    students={students}
                                    admissionEnquiries={admissionEnquiries}
                                    imageSrc={imageSrc}
                                    setImageSrc={setImageSrc}
                                    setIsViewOpened={setIsViewOpened}
                                    setUpdateStudent={setUpdateStudent}
                                    updateStudent={updateStudent}
                                    setIsLoading={setIsLoading}
                                    setValuesFromEnquiry={setValuesFromEnquiry}
                                />
                            </TabsContent>
                            <TabsContent value='parent'>
                                <Parent form={form}/>
                            </TabsContent>
                            <TabsContent value='other'>
                                <Other
                                    form={form}
                                    updateStudent={updateStudent}
                                />
                            </TabsContent>
                            <TabsContent value='guardian'>
                                <Guardian form={form}/>
                            </TabsContent>
                        </Tabs>


                        {/* Buttons */}
                        <div className='sm:px-10'>
                            <Buttons setIsViewOpened={setIsViewOpened} students={students} updateStudent={updateStudent} setUpdateStudent={setUpdateStudent} onSubmit={onSubmit} form={form} setFile={setFile} setImageSrc={setImageSrc} setValuesFromEnquiry={setValuesFromEnquiry}/>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    );
};





// Export
export default FormCom;