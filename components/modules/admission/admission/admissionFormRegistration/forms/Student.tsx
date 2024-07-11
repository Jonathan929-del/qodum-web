'use client';
// Imports
import {useEffect, useState} from 'react';
import StudentImage from './StudentImage';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Check, ChevronDown, Search, X} from 'lucide-react';
import MyDatePicker from '@/components/utils/CustomDatePicker';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchEnquiryByEnquiryNo} from '@/lib/actions/admission/admission/enquiry.actions';
import {fetchClassNumbers } from '@/lib/actions/admission/masterSettings/admission.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchStationaryDetails} from '@/lib/actions/admission/globalMasters/stationaryDetails.actions';





// Main function
const Student = ({students, form, setIsViewOpened, setUpdateStudent, setFile, updateStudent, imageSrc, setImageSrc, setIsLoading, setValuesFromEnquiry, admissionEnquiries, selectedSubjects, setSelectedSubjects, date, setDate, dob, setDob, subjects, optionalSubjects, classes, boards, streams, religions, categories, bankLedgers, admissionAccounts, bloodGroups, casts}:any) => {

    // Search
    const [search, setSearch] = useState('');


    // Handle Search Click
    const searchClick = async () => {
        setIsLoading(true);
        if(admissionEnquiries?.map((enquiry:any) => enquiry?.enquiry_no)?.includes(search)){
            const student = await fetchEnquiryByEnquiryNo({enquiry_no:search});
            setUpdateStudent({
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
                    subject:[''],
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
            setValuesFromEnquiry({
                enquiry_no:student.enquiry_no,
                visitor_name:student.visitor_name,
                visitor_address:student.visitor_address,
                mobile_no:student.mobile_no,
                student_name:student.student_name,
                class_name:student.class_name,
                contact_person:student.contact_person
            });
        }else{
            setIsViewOpened('enquiry');
        }
        setSearch('');
        setIsLoading(false);
    };


    // Use effects
    useEffect(() => {
        // @ts-ignore
        form.setValue('student.board', boards.filter((b:any) => b.is_default)[0]?.board);
    }, [boards]);
    useEffect(() => {
        const numberGenerator = async () => {
            try {
                let substringValue;
                if(students?.length < 9){
                    substringValue = 0;
                }else if(students?.length >= 9){
                    substringValue = 1;
                }else if(students?.length >= 99){
                    substringValue = 2;
                }else if(students?.length >= 999){
                    substringValue = 3;
                }else if(students?.length >= 9999){
                    substringValue = 4;
                }else if(students?.length >= 99999){
                    substringValue = 5;
                }else if(students?.length >= 999999){
                    substringValue = 6;
                }
                if(form.getValues().student.class !== '' && updateStudent.id === ''){
                    const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                        ? await fetchClassNumbers({class_name:'All Classes'})
                        : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const registerEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No.')[0]
                    const prospectusEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Prospectus No.')[0];
                    const onlineRegisterEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No. (Online)')[0];
                    
                    if(registerEntity && registerEntity?.should_be === 'Automatic'){
                        form.setValue('student.reg_no', `${registerEntity?.prefix}${registerEntity?.lead_zero.substring(substringValue, registerEntity?.lead_zero?.length - 1)}${students?.length + 1}${registerEntity?.suffix}`);
                    }else{
                        form.setValue('student.reg_no', '');
                    };

                    if(prospectusEntity && prospectusEntity?.should_be === 'Automatic'){
                        form.setValue('student.pros_no', `${prospectusEntity?.prefix}${prospectusEntity?.lead_zero.substring(substringValue, prospectusEntity?.lead_zero.length - 1)}${students?.length + 1}${prospectusEntity?.suffix}`);
                    }else{
                        form.setValue('student.pros_no', '');
                    };

                    if(onlineRegisterEntity){
                        form.setValue('student.is_online', true);
                    }else{
                        form.setValue('student.is_online', false);
                    };
                };
                if(updateStudent.id !== '' && form.getValues().student.class !== updateStudent.student.class){
                    const admissionNumbers = localStorage.getItem('all_classes') === 'true'
                        ? await fetchClassNumbers({class_name:'All Classes'})
                        : await fetchClassNumbers({class_name:form.getValues().student.class});
                    // @ts-ignore
                    const registerEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No.')[0]
                    const prospectusEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Prospectus No.')[0];
                    const onlineRegisterEntity = admissionNumbers.filter((item:any) => item.setting_type === 'Registration No. (Online)')[0];
                    
                    if(registerEntity && registerEntity?.should_be === 'Automatic'){
                        form.setValue('student.reg_no', `${registerEntity?.prefix}${registerEntity?.lead_zero.substring(substringValue, registerEntity?.lead_zero?.length - 1)}${students?.length + 1}${registerEntity?.suffix}`);
                    }else{
                        form.setValue('student.reg_no', '');
                    };

                    if(prospectusEntity && prospectusEntity?.should_be === 'Automatic'){
                        form.setValue('student.pros_no', `${prospectusEntity?.prefix}${prospectusEntity?.lead_zero.substring(substringValue, prospectusEntity?.lead_zero.length - 1)}${students?.length + 1}${prospectusEntity?.suffix}`);
                    }else{
                        form.setValue('student.pros_no', '');
                    };

                    if(onlineRegisterEntity){
                        form.setValue('student.is_online', true);
                    }else{
                        form.setValue('student.is_online', false);
                    };
                }
            } catch (err:any) {
                console.log(err);
            }
        };
        numberGenerator();
    }, [form.watch('student.class')]);
    useEffect(() => {
        const fetcher = async () => {
            const stationaryDetails = await fetchStationaryDetails();
            if(form.getValues().student.is_online){
                const onlineData = stationaryDetails.filter((s:any) => s.is_online);
                // @ts-ignore
                form.setValue('student.amount', onlineData[0].amount);
            }else{
                const offlineData = stationaryDetails.filter((s:any) => !s.is_online);
                // @ts-ignore
                form.setValue('student.amount', offlineData[0].amount);
            };
        };
        fetcher();
    }, [form.watch('student.is_online'), window.onload]);
    useEffect(() => {
        if(date){
            // @ts-ignore
            form.setValue('student.date', date._d);
        };
    }, [date]);
    useEffect(() => {
        if(dob){
            // @ts-ignore
            form.setValue('student.dob', dob._d);
        };
    }, [dob]);

    return (
        <div className='flex flex-row'>
            <div className='basis-[30%] flex flex-col gap-2 border-r-[0.5px] border-[#ccc] pr-[4px]'>


                {/* Is online */}
                <FormField
                    control={form?.control}
                    name='student.is_online'
                    render={({field}) => (
                        <FormItem className='flex flex-row items-start justify-start sm:items-center sm:gap-2'>
                            <FormControl>
                                <div className='flex-1 flex items-center justify-start space-x-2'>
                                    <Label htmlFor='is_online' className='text-[11px]'>
                                        Is online
                                    </Label>
                                    <Switch
                                        id='is_online'
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
                        name='student.enquiry_no'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] sm:basis-[35%]'>Enquiry No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
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
                                            className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
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
                                            className='h-full flex flex-row items-center text-[9px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
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
                            <div className='basis-[65%]'>
                                <MyDatePicker
                                    selectedDate={date}
                                    setSelectedDate={setDate}
                                />
                            </div>
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
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {admissionAccounts?.length < 1 ? (
                                                        <p>No accounts yet</p>
                                                    ) : // @ts-ignore
                                                    !admissionAccounts[0]?.account_name ? (
                                                        <LoadingIcon />
                                                    ) : admissionAccounts.map((ledger:any) => (
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

                    {/* Subjects */}
                    <div className='w-full flex flex-col items-center'>
                        <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Subjects</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder={selectedSubjects?.length < 1 ? 'Please Select' : selectedSubjects?.length === 1 ? '1 subject selected' : `${selectedSubjects?.length} subjects selected`} />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.length < 1 ? (
                                                <p>No subjects</p>
                                            ) : // @ts-ignore
                                            !subjects[0]?.subject_name ? (
                                                <LoadingIcon />
                                            ) : (
                                                <>
                                                    <div className='flex flex-row'>
                                                        <div
                                                            // @ts-ignore
                                                            onClick={() => setSelectedSubjects(subjects.map((s:any) => s.subject_name))}
                                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                                        >
                                                            <Check size={12}/>
                                                            <p className='text-xs group-hover:underline'>All</p>
                                                        </div>
                                                        <div
                                                            onClick={() => setSelectedSubjects([])}
                                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                        >
                                                            <X size={12}/>
                                                            <p className='text-xs group-hover:underline'>Clear</p>
                                                        </div>
                                                    </div>
                                                    <ul className='mt-2'>
                                                        {subjects.map((subject:any) => (
                                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={subject._id}>
                                                                <Checkbox
                                                                    className='rounded-[3px] text-hash-color font-semibold'
                                                                    checked={selectedSubjects?.map((s:any) => s).includes(subject.subject_name)}
                                                                    // @ts-ignore
                                                                    onClick={() => selectedSubjects?.includes(subject.subject_name) ? setSelectedSubjects(selectedSubjects?.filter((s:any) => s !== subject.subject_name)) : setSelectedSubjects([...selectedSubjects, subject.subject_name])}
                                                                />
                                                                <div className='w-full flex flex-row'>
                                                                    <p className='basis-[70%] text-[11px]'>{subject.subject_name}</p>
                                                                    {subject.is_university && <p className='basis-[30%] text-[11px] border-l-[0.5px] border-hash-color text-center'>{subject.available_seats}</p>}
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
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
                                                    {optionalSubjects?.length < 1 ? (
                                                        <p>No optional subjects</p>
                                                        // @ts-ignore
                                                    ) : !optionalSubjects[0]?.subject_name ? (
                                                        <LoadingIcon />
                                                    ) : optionalSubjects?.map((item:any) => (
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
                                    <div className='basis-[65%]'>
                                        <MyDatePicker
                                            selectedDate={dob}
                                            setSelectedDate={setDob}
                                        />
                                    </div>
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
                                                    <RadioGroupItem value='Male' id='Male' onClick={() => form?.setValue('student.gender', 'Male')}/>
                                                    <Label htmlFor='Male' className='text-[11px] text-hash-color'>Male</Label>
                                                </div>
                                                <div className='flex items-center space-x-[2px]'>
                                                    <RadioGroupItem value='Female' id='Female' onClick={() => form?.setValue('student.gender', 'Female')}/>
                                                    <Label htmlFor='Female' className='text-[11px] text-hash-color'>Female</Label>
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
                                                        {bloodGroups.length < 1 ? (
                                                                <p>No blood groups</p>
                                                            ) : // @ts-ignore
                                                            !bloodGroups[0].blood_group ? (
                                                                <LoadingIcon />
                                                            ) : bloodGroups.map((ledger:any) => (
                                                                <SelectItem value={ledger.blood_group} key={ledger._id}>{ledger.blood_group}</SelectItem>
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
                                                        {casts.length < 1 ? (
                                                                <p>No casts</p>
                                                            ) : // @ts-ignore
                                                            !casts[0].caste_name ? (
                                                                <LoadingIcon />
                                                            ) : casts.map((ledger:any) => (
                                                                <SelectItem value={ledger.caste_name} key={ledger._id}>{ledger.caste_name}</SelectItem>
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