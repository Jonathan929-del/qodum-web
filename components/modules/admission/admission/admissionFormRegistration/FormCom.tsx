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
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {StudentValidation} from '@/lib/validations/admission/admission/student.validation';
import {createStudent, deleteStudent, modifyStudent} from '@/lib/actions/admission/admission/student.actions';





// Main function
const FormCom = ({setIsViewOpened, students, updateStudent, setUpdateStudent}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        // Student
        student:{
            // 1
            class:updateStudent.student.class,
            board:updateStudent.student.board,
            reg_no:updateStudent.student.reg_no,
            pros_no:updateStudent.student.pros_no,
            amount:updateStudent.student.amount,
            date:updateStudent.student.date,
            payment_mode:updateStudent.student.payment_mode,
            admission_account:updateStudent.student.admission_account,
            post_account:updateStudent.student.post_account,
            session:updateStudent.student.session,
            // 2
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
            general_description:updateStudent.others.general_description,
            // 2
            emergency_contact:{
                person_name:updateStudent.others.emergency_contact.person_name,
                mobile_no:updateStudent.others.emergency_contact.mobile_no,
                phone_no:updateStudent.others.emergency_contact.phone_no,
                address:updateStudent.others.emergency_contact.address,
                relation:updateStudent.others.emergency_contact.relation
            },
            // 3
            emergency_contact_two:{
                person_name:updateStudent.others.emergency_contact_two.person_name,
                mobile_no:updateStudent.others.emergency_contact_two.mobile_no,
                phone_no:updateStudent.others.emergency_contact_two.phone_no,
                address:updateStudent.others.emergency_contact_two.address,
                relation:updateStudent.others.emergency_contact_two.relation,
                is_alumni:updateStudent.others.emergency_contact_two.is_alumni
            },
            // 4
            student_other_details:{
                stream:updateStudent.others.student_other_details.stream,
                optional_subject:updateStudent.others.student_other_details.optional_subject,
                medical_history:updateStudent.others.student_other_details.medical_history,
                allergies:updateStudent.others.student_other_details.allergies,
                other_medical_info:updateStudent.others.student_other_details.other_medical_info,
                family_doctor_name:updateStudent.others.student_other_details.family_doctor_name,
                family_doctor_phone:updateStudent.others.student_other_details.family_doctor_phone,
                family_doctor_address:updateStudent.others.student_other_details.family_doctor_address,
                distance_from_home:updateStudent.others.student_other_details.distance_from_home,
                no_of_living_years:updateStudent.others.student_other_details.no_of_living_years,
                only_child:updateStudent.others.student_other_details.only_child
            },
            // 5
            student_staff_relation:{
                staff_ward:updateStudent.others.student_staff_relation.staff_ward,
                staff_name:updateStudent.others.student_staff_relation.staff_name
            },
            // 6
            previous_school_details:{
                school_name:updateStudent.others.previous_school_details.school_name,
                city:updateStudent.others.previous_school_details.city,
                class:updateStudent.others.previous_school_details.class,
                year:updateStudent.others.previous_school_details.year,
                board:updateStudent.others.previous_school_details.board
            }
        },

        // Guardian details
        guardian_details:{
            // 1
            guardian_name:updateStudent.guardian_details.guardian_name,
            profession:updateStudent.guardian_details.profession,
            designation:updateStudent.guardian_details.designation,
            residence_address:updateStudent.guardian_details.residence_address,
            office_address:updateStudent.guardian_details.office_address,
            email:updateStudent.guardian_details.email,
            alternate_email:updateStudent.guardian_details.alternate_email,
            dob:updateStudent.guardian_details.dob,
            mobile:updateStudent.guardian_details.mobile,
            phone:updateStudent.guardian_details.phone,
            company_name:updateStudent.guardian_details.company_name,
            business_details:updateStudent.guardian_details.business_details,
            qualification:updateStudent.guardian_details.qualification,
            service_in:updateStudent.guardian_details.service_in,
            office_phone:updateStudent.guardian_details.office_phone,
            office_mobile:updateStudent.guardian_details.office_mobile,
            office_extension:updateStudent.guardian_details.office_extension,
            office_email:updateStudent.guardian_details.office_email,
            office_website:updateStudent.guardian_details.office_website,
            income:updateStudent.guardian_details.income,
            // 2
            if_single_parent:{
                student_lives_with:updateStudent.guardian_details.if_single_parent.student_lives_with,
                correspondence_to:updateStudent.guardian_details.if_single_parent.correspondence_to,
                legal_custody_of_the_child:updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
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
                class:updateStudent.id === '' ? '' : updateStudent.student.class,
                board:updateStudent.id === '' ? '' : updateStudent.student.board,
                reg_no:updateStudent.id === '' ? '' : updateStudent.student.reg_no,
                pros_no:updateStudent.id === '' ? '' : updateStudent.student.pros_no,
                amount:updateStudent.id === '' ? '' : updateStudent.student.amount,
                date:updateStudent.id === '' ? new Date() : updateStudent.student.date,
                payment_mode:updateStudent.id === '' ? '' : updateStudent.student.payment_mode,
                admission_account:updateStudent.id === '' ? '' : updateStudent.student.admission_account,
                post_account:updateStudent.id === '' ? '' : updateStudent.student.post_account,
                session:updateStudent.id === '' ? '' : updateStudent.student.session,
                // 2
                name:updateStudent.id === '' ? '' : updateStudent.student.name,
                middle_name:updateStudent.id === '' ? '' : updateStudent.student.middle_name,
                last_name:updateStudent.id === '' ? '' : updateStudent.student.last_name,
                dob:updateStudent.id === '' ? new Date() : updateStudent.student.dob,
                place_of_birth:updateStudent.id === '' ? '' : updateStudent.student.place_of_birth,
                gender:updateStudent.id === '' ? 'male' : updateStudent.student.gender,
                contact_person_name:updateStudent.id === '' ? '' : updateStudent.student.contact_person_name,
                contact_person_mobile:updateStudent.id === '' ? '' : updateStudent.student.contact_person_mobile,
                contact_person_email:updateStudent.id === '' ? '' : updateStudent.student.contact_person_email,
                secondary_contact_no:updateStudent.id === '' ? '' : updateStudent.student.secondary_contact_no,
                h_no_and_streets:updateStudent.id === '' ? '' : updateStudent.student.h_no_and_streets,
                email:updateStudent.id === '' ? '' : updateStudent.student.email,
                city:updateStudent.id === '' ? '' : updateStudent.student.city,
                mobile:updateStudent.id === '' ? '' : updateStudent.student.mobile,
                state:updateStudent.id === '' ? '' : updateStudent.student.state,
                pin_code:updateStudent.id === '' ? '' : updateStudent.student.pin_code,
                aadhar_card_no:updateStudent.id === '' ? '' : updateStudent.student.aadhar_card_no,
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
                    mobile:updateStudent.id === '' ? '' : updateStudent.parents.father.mobile,
                    phone:updateStudent.id === '' ? '' : updateStudent.parents.father.phone,
                    company_name:updateStudent.id === '' ? '' : updateStudent.parents.father.company_name,
                    business_details:updateStudent.id === '' ? '' : updateStudent.parents.father.business_details,
                    qualification:updateStudent.id === '' ? '' : updateStudent.parents.father.qualification,
                    service_in:updateStudent.id === '' ? '' : updateStudent.parents.father.service_in,
                    office_phone:updateStudent.id === '' ? '' : updateStudent.parents.father.office_phone,
                    office_mobile:updateStudent.id === '' ? '' : updateStudent.parents.father.office_mobile,
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
                    mobile:updateStudent.id === '' ? '' : updateStudent.parents.mother.mobile,
                    phone:updateStudent.id === '' ? '' : updateStudent.parents.mother.phone,
                    company_name:updateStudent.id === '' ? '' : updateStudent.parents.mother.company_name,
                    business_details:updateStudent.id === '' ? '' : updateStudent.parents.mother.business_details,
                    qualification:updateStudent.id === '' ? '' : updateStudent.parents.mother.qualification,
                    service_in:updateStudent.id === '' ? '' : updateStudent.parents.mother.service_in,
                    office_phone:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_phone,
                    office_mobile:updateStudent.id === '' ? '' : updateStudent.parents.mother.office_mobile,
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
                general_description:updateStudent.id === '' ? '' : updateStudent.others.general_description,
                // 2
                emergency_contact:{
                    person_name:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact.person_name,
                    mobile_no:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact.mobile_no,
                    phone_no:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact.phone_no,
                    address:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact.address,
                    relation:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact.relation
                },
                // 3
                emergency_contact_two:{
                    person_name:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact_two.person_name,
                    mobile_no:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact_two.mobile_no,
                    phone_no:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact_two.phone_no,
                    address:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact_two.address,
                    relation:updateStudent.id === '' ? '' : updateStudent.others.emergency_contact_two.relation,
                    is_alumni:updateStudent.id === '' ? false : updateStudent.others.emergency_contact_two.is_alumni
                },
                // 4
                student_other_details:{
                    stream:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.stream,
                    optional_subject:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.optional_subject,
                    medical_history:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.medical_history,
                    allergies:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.allergies,
                    other_medical_info:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.other_medical_info,
                    family_doctor_name:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_name,
                    family_doctor_phone:updateStudent.others.student_other_details.family_doctor_phone,
                    family_doctor_address:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.family_doctor_address,
                    distance_from_home:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.distance_from_home,
                    no_of_living_years:updateStudent.id === '' ? '' : updateStudent.others.student_other_details.no_of_living_years,
                    only_child:updateStudent.id === '' ? false : updateStudent.others.student_other_details.only_child
                },
                // 5
                student_staff_relation:{
                    staff_ward:updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_ward,
                    staff_name:updateStudent.id === '' ? '' : updateStudent.others.student_staff_relation.staff_name
                },
                // 6
                previous_school_details:{
                    school_name:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details.school_name,
                    city:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details.city,
                    class:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details.class,
                    year:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details.year,
                    board:updateStudent.id === '' ? '' : updateStudent.others.previous_school_details.board
                }
            },

            // Guardian details
            guardian_details:{
                // 1
                guardian_name:updateStudent.id === '' ? '' : updateStudent.guardian_details.guardian_name,
                profession:updateStudent.id === '' ? '' : updateStudent.guardian_details.profession,
                designation:updateStudent.id === '' ? '' : updateStudent.guardian_details.designation,
                residence_address:updateStudent.id === '' ? '' : updateStudent.guardian_details.residence_address,
                office_address:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_address,
                email:updateStudent.id === '' ? '' : updateStudent.guardian_details.email,
                alternate_email:updateStudent.id === '' ? '' : updateStudent.guardian_details.alternate_email,
                dob:updateStudent.id === '' ? new Date() : updateStudent.guardian_details.dob,
                mobile:updateStudent.id === '' ? '' : updateStudent.guardian_details.mobile,
                phone:updateStudent.id === '' ? '' : updateStudent.guardian_details.phone,
                company_name:updateStudent.id === '' ? '' : updateStudent.guardian_details.company_name,
                business_details:updateStudent.id === '' ? '' : updateStudent.guardian_details.business_details,
                qualification:updateStudent.id === '' ? '' : updateStudent.guardian_details.qualification,
                service_in:updateStudent.id === '' ? '' : updateStudent.guardian_details.service_in,
                office_phone:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_phone,
                office_mobile:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_mobile,
                office_extension:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_extension,
                office_email:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_email,
                office_website:updateStudent.id === '' ? '' : updateStudent.guardian_details.office_website,
                income:updateStudent.id === '' ? '' : updateStudent.guardian_details.income,
                // 2
                if_single_parent:{
                    student_lives_with:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.student_lives_with,
                    correspondence_to:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.correspondence_to,
                    legal_custody_of_the_child:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.legal_custody_of_the_child,
                    check_id_applicable:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.check_id_applicable,
                    separation_reason:updateStudent.id === '' ? '' : updateStudent.guardian_details.if_single_parent.separation_reason
                }
            }
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StudentValidation>) => {
        // Create Account Group
        if(updateStudent.id === ''){
            await createStudent({
                // Student
                student:{
                    // 1
                    class:values.student.class,
                    board:values.student.board,
                    reg_no:values.student.reg_no,
                    pros_no:values.student.pros_no,
                    amount:values.student.amount,
                    date:values.student.date,
                    payment_mode:values.student.payment_mode,
                    admission_account:values.student.admission_account,
                    post_account:values.student.post_account,
                    session:values.student.session,
                    // 2
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
                    general_description:values.others.general_description,
                    // 2
                    emergency_contact:{
                        person_name:values.others.emergency_contact.person_name,
                        mobile_no:values.others.emergency_contact.mobile_no,
                        phone_no:values.others.emergency_contact.phone_no,
                        address:values.others.emergency_contact.address,
                        relation:values.others.emergency_contact.relation
                    },
                    // 3
                    emergency_contact_two:{
                        person_name:values.others.emergency_contact_two.person_name,
                        mobile_no:values.others.emergency_contact_two.mobile_no,
                        phone_no:values.others.emergency_contact_two.phone_no,
                        address:values.others.emergency_contact_two.address,
                        relation:values.others.emergency_contact_two.relation,
                        is_alumni:values.others.emergency_contact_two.is_alumni
                    },
                    // 4
                    student_other_details:{
                        stream:values.others.student_other_details.stream,
                        optional_subject:values.others.student_other_details.optional_subject,
                        medical_history:values.others.student_other_details.medical_history,
                        allergies:values.others.student_other_details.allergies,
                        other_medical_info:values.others.student_other_details.other_medical_info,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_years:values.others.student_other_details.no_of_living_years,
                        only_child:values.others.student_other_details.only_child
                    },
                    // 5
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 6
                    previous_school_details:{
                        school_name:values.others.previous_school_details.school_name,
                        city:values.others.previous_school_details.city,
                        class:values.others.previous_school_details.class,
                        year:values.others.previous_school_details.year,
                        board:values.others.previous_school_details.board
                    }
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    residence_address:values.guardian_details.residence_address,
                    office_address:values.guardian_details.office_address,
                    email:values.guardian_details.email,
                    alternate_email:values.guardian_details.alternate_email,
                    dob:values.guardian_details.dob,
                    mobile:values.guardian_details.mobile,
                    phone:values.guardian_details.phone,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    service_in:values.guardian_details.service_in,
                    office_phone:values.guardian_details.office_phone,
                    office_mobile:values.guardian_details.office_mobile,
                    office_extension:values.guardian_details.office_extension,
                    office_email:values.guardian_details.office_email,
                    office_website:values.guardian_details.office_website,
                    income:values.guardian_details.income,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                }
            });
            toast({title:'Added Successfully!'});
        }
        // Modify Account Group
        else if(!deepEqual(comparisonObject, values)){
            // Update
            await modifyStudent({
                id:updateStudent.id,
                // Student
                student:{
                    // 1
                    class:values.student.class,
                    board:values.student.board,
                    reg_no:values.student.reg_no,
                    pros_no:values.student.pros_no,
                    amount:values.student.amount,
                    date:values.student.date,
                    payment_mode:values.student.payment_mode,
                    admission_account:values.student.admission_account,
                    post_account:values.student.post_account,
                    session:values.student.session,
                    // 2
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
                    general_description:values.others.general_description,
                    // 2
                    emergency_contact:{
                        person_name:values.others.emergency_contact.person_name,
                        mobile_no:values.others.emergency_contact.mobile_no,
                        phone_no:values.others.emergency_contact.phone_no,
                        address:values.others.emergency_contact.address,
                        relation:values.others.emergency_contact.relation
                    },
                    // 3
                    emergency_contact_two:{
                        person_name:values.others.emergency_contact_two.person_name,
                        mobile_no:values.others.emergency_contact_two.mobile_no,
                        phone_no:values.others.emergency_contact_two.phone_no,
                        address:values.others.emergency_contact_two.address,
                        relation:values.others.emergency_contact_two.relation,
                        is_alumni:values.others.emergency_contact_two.is_alumni
                    },
                    // 4
                    student_other_details:{
                        stream:values.others.student_other_details.stream,
                        optional_subject:values.others.student_other_details.optional_subject,
                        medical_history:values.others.student_other_details.medical_history,
                        allergies:values.others.student_other_details.allergies,
                        other_medical_info:values.others.student_other_details.other_medical_info,
                        family_doctor_name:values.others.student_other_details.family_doctor_name,
                        family_doctor_phone:values.others.student_other_details.family_doctor_phone,
                        family_doctor_address:values.others.student_other_details.family_doctor_address,
                        distance_from_home:values.others.student_other_details.distance_from_home,
                        no_of_living_years:values.others.student_other_details.no_of_living_years,
                        only_child:values.others.student_other_details.only_child
                    },
                    // 5
                    student_staff_relation:{
                        staff_ward:values.others.student_staff_relation.staff_ward,
                        staff_name:values.others.student_staff_relation.staff_name
                    },
                    // 6
                    previous_school_details:{
                        school_name:values.others.previous_school_details.school_name,
                        city:values.others.previous_school_details.city,
                        class:values.others.previous_school_details.class,
                        year:values.others.previous_school_details.year,
                        board:values.others.previous_school_details.board
                    }
                },

                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:values.guardian_details.guardian_name,
                    profession:values.guardian_details.profession,
                    designation:values.guardian_details.designation,
                    residence_address:values.guardian_details.residence_address,
                    office_address:values.guardian_details.office_address,
                    email:values.guardian_details.email,
                    alternate_email:values.guardian_details.alternate_email,
                    dob:values.guardian_details.dob,
                    mobile:values.guardian_details.mobile,
                    phone:values.guardian_details.phone,
                    company_name:values.guardian_details.company_name,
                    business_details:values.guardian_details.business_details,
                    qualification:values.guardian_details.qualification,
                    service_in:values.guardian_details.service_in,
                    office_phone:values.guardian_details.office_phone,
                    office_mobile:values.guardian_details.office_mobile,
                    office_extension:values.guardian_details.office_extension,
                    office_email:values.guardian_details.office_email,
                    office_website:values.guardian_details.office_website,
                    income:values.guardian_details.income,
                    // 2
                    if_single_parent:{
                        student_lives_with:values.guardian_details.if_single_parent.student_lives_with,
                        correspondence_to:values.guardian_details.if_single_parent.correspondence_to,
                        legal_custody_of_the_child:values.guardian_details.if_single_parent.legal_custody_of_the_child,
                        check_id_applicable:values.guardian_details.if_single_parent.check_id_applicable,
                        separation_reason:values.guardian_details.if_single_parent.separation_reason
                    }
                }
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Account Group
        else if(updateStudent.isDeleteClicked){
            await deleteStudent({id:updateStudent.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateStudent({
            id:'',
            isDeleteClicked:false,
    
            // Student
            student:{
                // 1
                class:'',
                board:'',
                reg_no:'',
                pros_no:'',
                amount:'',
                date:new Date(),
                payment_mode:'',
                admission_account:'',
                post_account:'',
                session:'',
                // 2
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
                general_description:'',
                // 2
                emergency_contact:{
                    person_name:'',
                    mobile_no:'',
                    phone_no:'',
                    address:'',
                    relation:'',
                },
                // 3
                emergency_contact_two:{
                    person_name:'',
                    mobile_no:'',
                    phone_no:'',
                    address:'',
                    relation:'',
                    is_alumni:false
                },
                // 4
                student_other_details:{
                    stream:'',
                    optional_subject:'',
                    medical_history:'',
                    allergies:'',
                    other_medical_info:'',
                    family_doctor_name:'',
                    family_doctor_phone:'',
                    family_doctor_address:'',
                    distance_from_home:'',
                    no_of_living_years:'',
                    only_child:false
                },
                // 5
                student_staff_relation:{
                    staff_ward:'',
                    staff_name:''
                },
                // 6
                previous_school_details:{
                    school_name:'',
                    city:'',
                    class:'',
                    year:'',
                    board:''
                }
            },
    
            // Guardian details
            guardian_details:{
                // 1
                guardian_name:'',
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
                income:'',
                // 2
                if_single_parent:{
                    student_lives_with:'',
                    correspondence_to:'',
                    legal_custody_of_the_child:'',
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
                class:'',
                board:'',
                reg_no:'',
                pros_no:'',
                amount:'',
                date:new Date(),
                payment_mode:'',
                admission_account:'',
                post_account:'',
                session:'',
                // 2
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
                general_description:'',
                // 2
                emergency_contact:{
                    person_name:'',
                    mobile_no:'',
                    phone_no:'',
                    address:'',
                    relation:'',
                },
                // 3
                emergency_contact_two:{
                    person_name:'',
                    mobile_no:'',
                    phone_no:'',
                    address:'',
                    relation:'',
                    is_alumni:false
                },
                // 4
                student_other_details:{
                    stream:'',
                    optional_subject:'',
                    medical_history:'',
                    allergies:'',
                    other_medical_info:'',
                    family_doctor_name:'',
                    family_doctor_phone:'',
                    family_doctor_address:'',
                    distance_from_home:'',
                    no_of_living_years:'',
                    only_child:false
                },
                // 5
                student_staff_relation:{
                    staff_ward:'',
                    staff_name:''
                },
                // 6
                previous_school_details:{
                    school_name:'',
                    city:'',
                    class:'',
                    year:'',
                    board:''
                }
            },
    
            // Guardian details
            guardian_details:{
                // 1
                guardian_name:'',
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
                income:'',
                // 2
                if_single_parent:{
                    student_lives_with:'',
                    correspondence_to:'',
                    legal_custody_of_the_child:'',
                    check_id_applicable:'',
                    separation_reason:''
                }
            }
        });
    };


    return (
        <div className='w-[95%] h-full max-w-[1500px] flex flex-col items-center'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full h-full flex flex-col items-center px-2 sm:px-4'
                >


                    {/* Tabs */}
                    <Tabs defaultValue='student' className='w-full h-[85%] px-2 border-[0.5px] border-[#ccc] rounded-[5px] overflow-scroll custom-sidebar-scrollbar'>
                        <TabsList className='w-full'>
                            <TabsTrigger value='student'>Student</TabsTrigger>
                            <TabsTrigger value='parent'>Parent</TabsTrigger>
                            <TabsTrigger value='other'>Other</TabsTrigger>
                            <TabsTrigger value='guardian'>Guardian</TabsTrigger>
                        </TabsList>
                        <TabsContent value='student'>
                            <Student form={form}/>
                        </TabsContent>
                        <TabsContent value='parent'>
                            <Parent form={form}/>
                        </TabsContent>
                        <TabsContent value='other'>
                            <Other form={form}/>
                        </TabsContent>
                        <TabsContent value='guardian'>
                            <Guardian form={form}/>
                        </TabsContent>
                    </Tabs>


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} students={students} updateStudent={updateStudent} setUpdateStudent={setUpdateStudent} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;