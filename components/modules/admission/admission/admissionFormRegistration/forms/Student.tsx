'use client';
// Imports
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import StudentImage from './StudentImage';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {CalendarIcon, ChevronDown, Search} from 'lucide-react';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import { fetchStreams } from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchCategories} from '@/lib/actions/admission/globalMasters/category.actions';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchStudentByEnquiryNo} from '@/lib/actions/admission/admission/student.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { fetchBankLedgers } from '@/lib/actions/accounts/accounts/bankLedger.actions';
import { Item } from '@radix-ui/react-accordion';





// Main function
const Student = ({form, students, setIsViewOpened, setUpdateStudent, setFile, updateStudent, imageSrc, setImageSrc, setIsLoading}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Streams
    const [streams, setStreams] = useState([{}]);


    // Subjects
    const [subjects, setSubjects] = useState([{}]);


    // Religions
    const [religions, setReligions] = useState([{}]);


    // Categories
    const [categories, setCategories] = useState([{}]);


    // Bank Ledgers
    const [bankLedgers, setBankLedgers] = useState([{}]);


    // Search
    const [search, setSearch] = useState('');


    // Enquiry number
    const [enquiryNumber, setEnquiryNumber] = useState('');


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        if(students?.map((student:any) => student?.student?.enquiry_no)?.includes(search)){
            const student = await fetchStudentByEnquiryNo({enquiry_no:search});
            setUpdateStudent({
                id:student?._id,
                isDeleteClicked:false,
                // Student
                student:{
                    // 1
                    image:student?.student?.image,
                    enquiry_no:student?.student?.enquiry_no,
                    reg_no:student?.student?.reg_no,
                    pros_no:student?.student?.pros_no,
                    amount:student?.student?.amount,
                    date:student?.student?.date,
                    payment_mode:student?.student?.payment_mode,
                    admission_account:student?.student?.admission_account,
                    post_account:student?.student?.post_account,
                    session:student?.student?.session,
                    // 2
                    class:student?.student?.class,
                    board:student?.student?.board,
                    stream:student?.student?.stream,
                    subject:student?.student?.subject,
                    optional_subject:student?.student?.optional_subject,
                    name:student?.student?.name,
                    middle_name:student?.student?.middle_name,
                    last_name:student?.student?.last_name,
                    dob:student?.student?.dob,
                    place_of_birth:student?.student?.place_of_birth,
                    gender:student?.student?.gender,
                    contact_person_name:student?.student?.contact_person_name,
                    contact_person_mobile:student?.student?.contact_person_mobile,
                    contact_person_email:student?.student?.contact_person_email,
                    secondary_contact_no:student?.student?.secondary_contact_no,
                    h_no_and_streets:student?.student?.h_no_and_streets,
                    email:student?.student?.email,
                    city:student?.student?.city,
                    mobile:student?.student?.mobile,
                    state:student?.student?.state,
                    pin_code:student?.student?.pin_code,
                    aadhar_card_no:student?.student?.aadhar_card_no,
                    religion:student?.student?.religion,
                    blood_group:student?.student?.blood_group,
                    caste:student?.student?.caste,
                    category:student?.student?.category,
                    is_ews:student?.student?.is_ews,
                    sibling:student?.student?.sibling,
                    transport:student?.student?.transport,
                    nationality:student?.student?.nationality
                },
    
                // Parents
                parents:{
                    // Father
                    father:{
                        father_name:student?.parents?.father?.father_name,
                        middle_name:student?.parents?.father?.middle_name,
                        last_name:student?.parents?.father?.last_name,
                        profession:student?.parents?.father?.profession,
                        designation:student?.parents?.father?.designation,
                        residence_address:student?.parents?.father?.residence_address,
                        office_address:student?.parents?.father?.office_address,
                        email:student?.parents?.father?.email,
                        alternate_email:student?.parents?.father?.alternate_email,
                        dob:student?.parents?.father?.dob,
                        mobile:student?.parents?.father?.mobile,
                        phone:student?.parents?.father?.phone,
                        company_name:student?.parents?.father?.company_name,
                        business_details:student?.parents?.father?.business_details,
                        qualification:student?.parents?.father?.qualification,
                        service_in:student?.parents?.father?.service_in,
                        office_phone:student?.parents?.father?.office_phone,
                        office_mobile:student?.parents?.father?.office_mobile,
                        office_extension:student?.parents?.father?.office_extension,
                        office_email:student?.parents?.father?.office_email,
                        office_website:student?.parents?.father?.office_website,
                        annual_income:student?.parents?.father?.annual_income,
                        parent_status:student?.parents?.father?.parent_status
                    },
                    // Mother
                    mother:{
                        mother_name:student?.parents?.mother?.mother_name,
                        middle_name:student?.parents?.mother?.middle_name,
                        last_name:student?.parents?.mother?.last_name,
                        profession:student?.parents?.mother?.profession,
                        designation:student?.parents?.mother?.designation,
                        residence_address:student?.parents?.mother?.residence_address,
                        office_address:student?.parents?.mother?.office_address,
                        email:student?.parents?.mother?.email,
                        alternate_email:student?.parents?.mother?.alternate_email,
                        dob:student?.parents?.mother?.dob,
                        mobile:student?.parents?.mother?.mobile,
                        phone:student?.parents?.mother?.phone,
                        company_name:student?.parents?.mother?.company_name,
                        business_details:student?.parents?.mother?.business_details,
                        qualification:student?.parents?.mother?.qualification,
                        service_in:student?.parents?.mother?.service_in,
                        office_phone:student?.parents?.mother?.office_phone,
                        office_mobile:student?.parents?.mother?.office_mobile,
                        office_extension:student?.parents?.mother?.office_extension,
                        office_email:student?.parents?.mother?.office_email,
                        office_website:student?.parents?.mother?.office_website,
                        annual_income:student?.parents?.mother?.annual_income,
                        anniversary_date:student?.parents?.mother?.anniversary_date
                    }
                },
    
                // Other details
                others:{
                    // 1
                    student_other_details:{
                        medical_history:student?.others?.student_other_details?.medical_history,
                        descriptions:student?.others?.student_other_details?.descriptions,
                        allergies:student?.others?.student_other_details?.allergies,
                        allergies_causes:student?.others?.student_other_details?.allergies_causes,
                        family_doctor_name:student?.others?.student_other_details?.family_doctor_name,
                        family_doctor_phone:student?.others?.student_other_details?.family_doctor_phone,
                        family_doctor_address:student?.others?.student_other_details?.family_doctor_address,
                        distance_from_home:student?.others?.student_other_details?.distance_from_home,
                        no_of_living_year:student?.others?.student_other_details?.no_of_living_year,
                        only_child:student?.others?.student_other_details?.only_child,
                        general_description:student?.others?.student_other_details?.general_description,
                    },
                    // 2
                    student_staff_relation:{
                        staff_ward:student?.others?.student_staff_relation?.staff_ward,
                        staff_name:student?.others?.student_staff_relation?.staff_name
                    },
                    // 3
                    is_alumni:{
                        is_alumni:student?.others?.is_alumni?.is_alumni,
                        academic_session:student?.others?.is_alumni?.academic_session,
                        class_name:student?.others?.is_alumni?.class_name,
                        admission_number:student?.others?.is_alumni?.admission_number,
                    },
                    // 4
                    previous_school_details:[
                        {
                            school_name:student?.others?.previous_school_details[0]?.school_name,
                            board:student?.others?.previous_school_details[0]?.board,
                            passing_year:student?.others?.previous_school_details[0]?.passing_year,
                            total_marks:student?.others?.previous_school_details[0]?.total_marks,
                            percentage:student?.others?.previous_school_details[0]?.percentage,
                            result:student?.others?.previous_school_details[0]?.result,
                            is_alumni:student?.others?.previous_school_details[0]?.is_alumni,
                            father_name:student?.others?.previous_school_details[0]?.father_name,
                            father_passing_year:student?.others?.previous_school_details[0]?.father_passing_year,
                            mother_name:student?.others?.previous_school_details[0]?.mother_name,
                            mother_passing_year:student?.others?.previous_school_details[0]?.mother_passing_year
                        },
                        {
                            school_name:student?.others?.previous_school_details[1]?.school_name,
                            board:student?.others?.previous_school_details[1]?.board,
                            passing_year:student?.others?.previous_school_details[1]?.passing_year,
                            total_marks:student?.others?.previous_school_details[1]?.total_marks,
                            percentage:student?.others?.previous_school_details[1]?.percentage,
                            result:student?.others?.previous_school_details[1]?.result,
                            is_alumni:student?.others?.previous_school_details[1]?.is_alumni,
                            father_name:student?.others?.previous_school_details[1]?.father_name,
                            father_passing_year:student?.others?.previous_school_details[1]?.father_passing_year,
                            mother_name:student?.others?.previous_school_details[1]?.mother_name,
                            mother_passing_year:student?.others?.previous_school_details[1]?.mother_passing_year
                        },
                        {
                            school_name:student?.others?.previous_school_details[2]?.school_name,
                            board:student?.others?.previous_school_details[2]?.board,
                            passing_year:student?.others?.previous_school_details[2]?.passing_year,
                            total_marks:student?.others?.previous_school_details[2]?.total_marks,
                            percentage:student?.others?.previous_school_details[2]?.percentage,
                            result:student?.others?.previous_school_details[2]?.result,
                            is_alumni:student?.others?.previous_school_details[2]?.is_alumni,
                            father_name:student?.others?.previous_school_details[2]?.father_name,
                            father_passing_year:student?.others?.previous_school_details[2]?.father_passing_year,
                            mother_name:student?.others?.previous_school_details[2]?.mother_name,
                            mother_passing_year:student?.others?.previous_school_details[2]?.mother_passing_year
                        }
                    ]
                },
    
                // Guardian details
                guardian_details:{
                    // 1
                    guardian_name:student?.guardian_details?.guardian_name,
                    profession:student?.guardian_details?.profession,
                    designation:student?.guardian_details?.designation,
                    company_name:student?.guardian_details?.company_name,
                    business_details:student?.guardian_details?.business_details,
                    qualification:student?.guardian_details?.qualification,
                    // 2
                    if_single_parent:{
                        student_lives_with:student?.guardian_details?.if_single_parent?.student_lives_with,
                        legal_custody_of_the_child:student?.guardian_details?.if_single_parent?.legal_custody_of_the_child,
                        correspondence_to:student?.guardian_details?.if_single_parent?.correspondence_to,
                        check_id_applicable:student?.guardian_details?.if_single_parent?.check_id_applicable,
                        separation_reason:student?.guardian_details?.if_single_parent?.separation_reason
                    }
                }
            });
        }else{
            setIsViewOpened(true);
        }
        setSearch('');
        setIsLoading(false);
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const boardsRes = await fetchBoards();
            const streamsRes = await fetchStreams();
            const subjectsRes = await fetchOptionalSubjects();
            const religionsRes = await fetchReligions();
            const categoriesRes = await fetchCategories();
            const bankLedgerRes = await fetchBankLedgers();
            setClasses(classesRes);
            setBoards(boardsRes);
            setStreams(streamsRes);
            setSubjects(subjectsRes);
            setReligions(religionsRes);
            setCategories(categoriesRes);
            setBankLedgers(bankLedgerRes);
        };
        fetcher();
    }, []);


    return (
        <div className='flex flex-row'>
            <div className='basis-[30%] flex flex-col gap-2 border-r-[0.5px] border-[#ccc] pr-[4px]'>



                {/* Image */}
                <StudentImage
                    setFile={setFile}
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                    updateStudent={updateStudent}
                />


                {/* Enquiry No. */}
                {form.getValues().student.with_enquiry && (
                    <FormField
                        control={form?.control}
                        disabled
                        name='student.enquiry_no'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Enquiry No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-[11px]' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                )}


                {/* Reg. No. */}
                <FormField
                    control={form?.control}
                    name='student.reg_no'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Reg. No.</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />


                {/* Pros. No. */}
                <FormField
                    control={form?.control}
                    name='student.pros_no'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 sm:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Pros. No.</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />


                {/* Amount */}
                <FormField
                    control={form?.control}
                    name='student.amount'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 sm:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Amount</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />


                {/* Date */}
                <FormField
                    control={form?.control}
                    name='student.date'
                    render={() => (
                        <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                            <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Date</FormLabel>
                            <Popover open={isCalendarOpened === 'date'} onOpenChange={() => isCalendarOpened === 'date' ? setIsCalendarOpened('') : setIsCalendarOpened('date')}>
                                <PopoverTrigger asChild className='h-7'>
                                    <Button
                                        variant='outline'
                                        className='flex flex-row items-center w-full h-7 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:basis-[65%]'
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {
                                            form?.getValues()?.student?.date
                                                    ? <span className='text-[11px]'>{format(form?.getValues()?.student?.date, 'PPP')}</span>
                                                    : <span className='text-[11px]'>Pick a date</span>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0'>
                                    <Calendar
                                        mode='single'
                                        selected={form?.getValues()?.student?.date}
                                        onSelect={v => {setIsCalendarOpened(''); form?.setValue('student?.date', v)}}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />


                {/* Payment Mode */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Payment Mode</FormLabel>
                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='student.payment_mode'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Cash'>Cash</SelectItem>
                                                <SelectItem value='Cheque'>Cheque</SelectItem>
                                                <SelectItem value='Credit Card'>Credit Card</SelectItem>
                                                <SelectItem value='DD'>DD</SelectItem>
                                                <SelectItem value='Debit Card'>Debit Card</SelectItem>
                                                <SelectItem value='NEFT'>NEFT</SelectItem>
                                                <SelectItem value='Net Banking'>Net Banking</SelectItem>
                                                <SelectItem value='Swiped Card'>Swiped Card</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Admission Account */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Admission Account</FormLabel>
                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='student.admission_account'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                            disabled={true}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='item'>item</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Post Account */}
                <div className='w-full flex flex-col items-center sm:flex-row'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Post Account</FormLabel>
                    <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='student.post_account'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bankLedgers.length < 1 ? (
                                                        <p>No bank ledgers yet</p>
                                                    ) : // @ts-ignore
                                                    !bankLedgers[0].account_name ? (
                                                        <LoadingIcon />
                                                    ) : bankLedgers.map((ledger:any) => (
                                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>











































            <div className='basis-[70%] flex-1 flex flex-col pr-2 gap-2'>
                {/* Search */}
                <div className='flex flex-col p-2 ml-2 border-[0.5px] border-[#ccc] bg-[#F7F7F7] gap-2 rounded-[5px] text-xs text-hash-color lg:flex-row'>
                    {/* With Enquiry */}
                    <FormField
                        control={form?.control}
                        name='student.with_enquiry'
                        render={({field}) => (
                            <FormItem className='flex flex-row min-w-[200px] mx-2 items-start justify-start sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label htmlFor='with_enquiry' className='text-[11px]'>
                                                With Enquiry
                                            </Label>
                                            <Switch
                                                id='with_enquiry'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.getValues().student.with_enquiry && (
                        <div className='flex flex-row justify-center min-w-[200px] max-w-[600px] w-[100%] bg-white rounded-[5px] border-[0.5px] border-[#E4E4E4]'>
                            <Input
                                value={search}
                                onChange={(e:any) => setSearch(e?.target?.value)}
                                className='h-7 border-[0] text-xs placeholder:text-xs'
                                placeholder='Search enquiry no.'
                            />
                            <div
                                onClick={searchClick}
                                className='group flex flex-row items-center justify-center gap-[2px] px-2 border-[0.5px] border-[#2EABE5] rounded-r-[5px] transition cursor-pointer hover:opacity-80 hover:bg-[#2EABE5]'
                            >
                                <Search size={15} className='text-[#2EABE5] transition group-hover:text-white'/>
                                <p className='transition text-[#2EABE5] group-hover:text-white'>Search</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2 lg:flex-row'>
                    {/* Class */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                        <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='student.class'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes?.length < 1 ? (
                                                        <p>No classes</p>
                                                        // @ts-ignore
                                                    ) : !classes[0]?.class_name ? (
                                                        <LoadingIcon />
                                                    ) : classes?.map((item:any) => (
                                                        <SelectItem value={item?.class_name} key={item?._id}>{item?.class_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Board */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Board</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField 
                                control={form?.control}
                                name='student.board'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {boards?.length < 1 ? (
                                                        <p>No boards</p>
                                                        // @ts-ignore
                                                    ) : !boards[0]?.board ? (
                                                        <LoadingIcon />
                                                    ) : boards?.map((item:any) => (
                                                        <SelectItem value={item?.board} key={item?._id}>{item?.board}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Stream */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Stream</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField 
                                control={form?.control}
                                name='student.stream'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {streams?.length < 1 ? (
                                                        <p>No streams</p>
                                                        // @ts-ignore
                                                    ) : !streams[0]?.stream_name ? (
                                                        <LoadingIcon />
                                                    ) : streams?.map((item:any) => (
                                                        <SelectItem value={item?.stream_name} key={item?._id}>{item?.stream_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Subject */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Subject</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField 
                                control={form?.control}
                                name='student.subject'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                        <SelectItem value='Subject'>Subject</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Optional Subject */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Optional Subject</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField 
                                control={form?.control}
                                name='student.optional_subject'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects?.length < 1 ? (
                                                        <p>No subjects</p>
                                                        // @ts-ignore
                                                    ) : !subjects[0]?.subject_name ? (
                                                        <LoadingIcon />
                                                    ) : subjects?.map((item:any) => (
                                                        <SelectItem value={item?.subject_name} key={item?._id}>{item?.subject_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Name */}
                        <FormField
                            control={form?.control}
                            name='student.name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Name</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Middle Name */}
                        <FormField
                            control={form?.control}
                            name='student.middle_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Middle Name</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Last Name */}
                        <FormField
                            control={form?.control}
                            name='student.last_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Last Name</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* DOB */}
                        <FormField
                            control={form?.control}
                            name='student.dob'
                            render={() => (
                                <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto h-2 pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>DOB</FormLabel>
                                    <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                                        <PopoverTrigger asChild className='h-7'>
                                            <Button
                                                variant='outline'
                                                className='flex flex-row items-center w-full h-7 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:basis-[65%]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    form?.getValues()?.student?.dob
                                                            ? <span>{format(form?.getValues()?.student?.dob, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={form?.getValues()?.student?.dob}
                                                onSelect={v => {setIsCalendarOpened(''); form?.setValue('student?.dob', v)}}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Place Of Birth */}
                        <FormField
                            control={form?.control}
                            name='student.place_of_birth'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Place Of Birth</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Gender */}
                        <FormField
                            control={form?.control}
                            name='student.gender'
                            render={() => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Gender</FormLabel>
                                        <div className='h-full w-full flex flex-col gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                            <RadioGroup
                                                value={form?.getValues()?.student?.gender}
                                                className='h-full flex flex-row'
                                            >
                                                <div className='flex items-center space-x-[2px]'>
                                                    <RadioGroupItem value='male' id='male' onClick={() => form?.setValue('student?.gender', 'male')}/>
                                                    <Label htmlFor='male' className='text-[11px] text-hash-color'>Male</Label>
                                                </div>
                                                <div className='flex items-center space-x-[2px]'>
                                                    <RadioGroupItem value='female' id='femal' onClick={() => form?.setValue('student?.gender', 'female')}/>
                                                    <Label htmlFor='male' className='text-[11px] text-hash-color'>Female</Label>
                                                </div>
                                            </RadioGroup>
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Contact Person Name */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_name'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Name</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Contact Person Mobile */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_mobile'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Mobile</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Contact Person Email */}
                        <FormField
                            control={form?.control}
                            name='student.contact_person_email'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Contact Person Email</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Secondary Contact No. */}
                        <FormField
                            control={form?.control}
                            name='student.secondary_contact_no'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Secondary Contact No.</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>





                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* H. No. and Streets */}
                        <FormField
                            control={form?.control}
                            name='student.h_no_and_streets'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>H. No. and Streets</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Email */}
                        <FormField
                            control={form?.control}
                            name='student.email'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Email</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* City */}
                        <FormField
                            control={form?.control}
                            name='student.city'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>City</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* Mobile */}
                        <FormField
                            control={form?.control}
                            name='student.mobile'
                            render={({ field }) => (
                                <FormItem className='w-full mt-2 sm:mt-0'>
                                    <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Mobile</FormLabel>
                                        <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='mt-[-20px] text-[11px]' />
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        <div className='basis-[50%] flex flex-col gap-2 lg:flex-row'>
                            {/* State */}
                            <FormField
                                control={form?.control}
                                name='student.state'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>State</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[11px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* PIN Code */}
                            <FormField
                                control={form?.control}
                                name='student.pin_code'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>PIN Code</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[11px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='basis-[50%]'>
                            {/* Aadhar Card No */}
                            <FormField
                                control={form?.control}
                                name='student.aadhar_card_no'
                                render={({ field }) => (
                                    <FormItem className='w-full mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Aadhar Card No</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[11px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>






                <div className='flex flex-col gap-2 border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Religion */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Religion</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.religion'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {religions?.length < 1 ? (
                                                            <p>No religions</p>
                                                            // @ts-ignore
                                                        ) : !religions[0]?.religion_name ? (
                                                            <LoadingIcon />
                                                        ) : religions?.map((item:any) => (
                                                            <SelectItem value={item?.religion_name} key={item?._id}>{item?.religion_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Blood Group */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Blood Group</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.blood_group'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='N?.A?.'>N?.A?.</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 lg:flex-row'>
                        {/* Caste */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Caste</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.caste'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='N?.A?.'>N?.A?.</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Category */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Category</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form?.control}
                                    name='student.category'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories?.length < 1 ? (
                                                            <p>No categories</p>
                                                            // @ts-ignore
                                                        ) : !categories[0]?.category_name ? (
                                                            <LoadingIcon />
                                                        ) : categories?.map((item:any) => (
                                                            <SelectItem value={item?.category_name} key={item?._id}>{item?.category_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>





                <div className='flex flex-row gap-2 justify-evenly border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2'>
                    {/* Is EWS */}
                    <FormField
                        control={form?.control}
                        name='student.is_ews'
                        render={({field}) => (
                            <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Label htmlFor='is_ews' className='text-[11px]'>
                                                Is EWS
                                            </Label>
                                            <Switch
                                                id='is_ews'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Sibling */}
                    <FormField
                        control={form?.control}
                        name='student.sibling'
                        render={({field}) => (
                            <FormItem className='flex flex-row items-start justify-between sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Label htmlFor='is_ews' className='text-[11px]'>
                                                Sibling
                                            </Label>
                                            <Switch
                                                id='is_ews'
                                                {...field}
                                                value={field?.value}
                                                onCheckedChange={field?.onChange}
                                                checked={field?.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                </div>





                <div className='flex flex-col gap-2 justify-evenly border-[0.5px] border-[#ccc] rounded-[5px] p-2 ml-2 lg:flex-row'>
                    {/* Transport */}
                    <div className='w-full flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Transport</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='student.transport'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                        <SelectItem value='School'>School</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    {/* Nationality */}
                    <div className='w-full flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Nationality</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormField
                                control={form?.control}
                                name='student.nationality'
                                render={({ field }) => (
                                    <FormItem className='relative flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field?.value}
                                                onValueChange={field?.onChange}
                                            >
                                                <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                        <SelectItem value='Indian'>Indian</SelectItem>
                                                        <SelectItem value='British'>British</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>






        </div>
    );
};





// Export
export default Student;