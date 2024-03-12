'use client';
// Imports
import * as z from 'zod';
import {format} from 'date-fns';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {EnquiryValidation} from '@/lib/validations/admission/admission/enquiry.validation';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createEnquiry, deleteEnquiry, modifyEnquiry} from '@/lib/actions/admission/admission/enquiry.actions';





// Main function
const FormCom = ({setIsViewOpened, enquiries, updateEnquiry, setUpdateEnquiry}:any) => {


    // Toast
    const {toast} = useToast();


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Last number
    const [lastNumber, setLastNumber] = useState();


    // Comparison object
    const comparisonObject = {
        enquiry_no:updateEnquiry.enquiry_no,
        enquiry_date:updateEnquiry.enquiry_date,
        visitor_name:updateEnquiry.visitor_name,
        visitor_address:updateEnquiry.visitor_address,
        mobile_no:updateEnquiry.mobile_no,
        purpose_is_admission:updateEnquiry.purpose_is_admission,
        student_name:updateEnquiry.student_name,
        class_name:updateEnquiry.class_name,
        reason_to_visit:updateEnquiry.reason_to_visit,
        contact_person:updateEnquiry.contact_person,
        reference_details:updateEnquiry.reference_details
    };


    // Form
    const form = useForm({
        resolver:zodResolver(EnquiryValidation),
        defaultValues:{
            // @ts-ignore
            enquiry_no:updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_no,
            enquiry_date:updateEnquiry.id === '' ? new Date() : updateEnquiry.enquiry_date,
            visitor_name:updateEnquiry.id === '' ? '' : updateEnquiry.visitor_name,
            visitor_address:updateEnquiry.id === '' ? '' : updateEnquiry.visitor_address,
            mobile_no:updateEnquiry.id === '' ? '' : updateEnquiry.mobile_no,
            purpose_is_admission:updateEnquiry.id === '' ? false : updateEnquiry.purpose_is_admission,
            student_name:updateEnquiry.id === '' ? '' : updateEnquiry.student_name,
            class_name:updateEnquiry.id === '' ? '' : updateEnquiry.class_name,
            reason_to_visit:updateEnquiry.id === '' ? '' : updateEnquiry.reason_to_visit,
            contact_person:updateEnquiry.id === '' ? '' : updateEnquiry.contact_person,
            reference_details:updateEnquiry.id === '' ? '' : updateEnquiry.reference_details
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof EnquiryValidation>) => {
        // Create enquiry
        if(updateEnquiry.id === ''){
            if(enquiries.map((e:any) => e.enquiry_no).includes(values.enquiry_no)){
                toast({title:'Enquiry number already exists', variant:'error'});
                return;
            };
            await createEnquiry({
                enquiry_no:values.enquiry_no,
                enquiry_date:values.enquiry_date,
                visitor_name:values.visitor_name,
                visitor_address:values.visitor_address,
                mobile_no:values.mobile_no,
                purpose_is_admission:values.purpose_is_admission,
                student_name:values.student_name,
                class_name:values.class_name,
                reason_to_visit:values.reason_to_visit,
                contact_person:values.contact_person,
                reference_details:values.reference_details
            });
            toast({title:'Added Successfully!'});
        }
        // Modify enquiry
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.enquiry_no !== values.enquiry_no && enquiries.map((e:any) => e.enquiry_no).includes(values.enquiry_no)){
                toast({title:'Enquiry number already exists', variant:'error'});
                return;
            };
            // Update
            await modifyEnquiry({
                id:updateEnquiry.id,
                enquiry_no:localStorage.getItem('setting_type') === 'Automatic' ? comparisonObject.enquiry_no : values.enquiry_no,
                enquiry_date:values.enquiry_date,
                visitor_name:values.visitor_name,
                visitor_address:values.visitor_address,
                mobile_no:values.mobile_no,
                purpose_is_admission:values.purpose_is_admission,
                student_name:values.student_name,
                class_name:values.class_name,
                reason_to_visit:values.reason_to_visit,
                contact_person:values.contact_person,
                reference_details:values.reference_details
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete enquiry
        else if(updateEnquiry.isDeleteClicked){
            await deleteEnquiry({id:updateEnquiry.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateEnquiry({
            id:'',
            isDeleteClicked:false,
            enquiry_no:'',
            enquiry_date:new Date(),
            visitor_name:'',
            visitor_address:'',
            mobile_no:'',
            purpose_is_admission:false,
            student_name:'',
            class_name:'',
            reason_to_visit:'',
            contact_person:'',
            reference_details:''
        });
        // Reseting form
        form.reset({
            enquiry_no:'',
            enquiry_date:new Date(),
            visitor_name:'',
            visitor_address:'',
            mobile_no:'',
            purpose_is_admission:false,
            student_name:'',
            class_name:'',
            reason_to_visit:'',
            contact_person:'',
            reference_details:''
        });
    };


    // Last number handler
    const lastNumberHandler = () => {
        const number = enquiries[enquiries.length - 1].enquiry_no;
        setLastNumber(number);
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchClasses();
            setClasses(res);
        };
        fetcher();
        // @ts-ignore
        const number = `${localStorage.getItem('prefix')}${localStorage.getItem('lead_zero')?.substring(0, localStorage.getItem('lead_zero').length - 1)}${enquiries.length + 1}${localStorage.getItem('suffix')}`;
        if(updateEnquiry.id !== ''){
            form.setValue('enquiry_no', updateEnquiry.enquiry_no);
        }else{
            form.setValue('enquiry_no', localStorage.getItem('setting_type') === 'Automatic' && localStorage.getItem('lead_zero') ? number : updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_no);
        };
    }, []);
    useEffect(() => {
        // @ts-ignore
        const number = `${localStorage.getItem('prefix')}${localStorage.getItem('lead_zero')?.substring(0, localStorage.getItem('lead_zero').length - 1)}${enquiries.length + 1}${localStorage.getItem('suffix')}`;
        if(updateEnquiry.id !== ''){
            form.setValue('enquiry_no', updateEnquiry.enquiry_no);
        }else{
            form.setValue('enquiry_no', localStorage.getItem('setting_type') === 'Automatic' && localStorage.getItem('lead_zero') ? number : updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_no);
        };
    }, [enquiries, updateEnquiry]);


    return (
        <div className='w-[90%] max-w-[500px] max-h-[95%] flex flex-col items-center border-[0.5px] border-[##E8E8E8] rounded-[8px] sm:w-[70%] overflow-y-scroll custom-sidebar-scrollbar'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Enquiry</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full h-full flex flex-col items-center gap-8 px-2 pt-4 sm:gap-5 sm:px-4'
                >


                    {/* Get last enquiry no. */}
                    <div className='w-full flex flex-row justify-center gap-2'>
                        <span className='flex-1 flex justify-end'>
                            <span
                                onClick={lastNumberHandler}
                                className='text-[11px] border-[1px] border-[#ccc] rounded-[2px] px-2 font-bold cursor-pointer'
                            >
                                GET LAST ENQUIRY NO.
                            </span>
                        </span>
                        <span className='flex-1 text-xs'>
                            {lastNumber}
                        </span>
                    </div>


                    {/* Enquiry No. */}
                    {enquiries.length < 1 ? (
                        <FormField
                            control={form.control}
                            name='enquiry_no'
                            render={({field}) => (
                                <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Enquiry No.</FormLabel>
                                        <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={localStorage.getItem('setting_type') === 'Automatic' ? true : false}
                                                    className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                        </div>
                                </FormItem>
                            )}
                        />                        
                    ) : enquiries[0]?.enquiry_no ? (
                        <FormField
                            control={form.control}
                            name='enquiry_no'
                            render={({field}) => (
                                <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Enquiry No.</FormLabel>
                                        <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={localStorage.getItem('setting_type') === 'Automatic' ? true : false}
                                                    className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                        </div>
                                </FormItem>
                            )}
                        />
                    ) : (
                        <LoadingIcon />
                    )}


                    {/* Enquiry Date */}
                    <FormField
                        control={form?.control}
                        name='enquiry_date'
                        render={() => (
                            <FormItem className='relative w-full h-10 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto h-2 pr-2 text-end text-[11px] text-[#726E71] sm:basis-[30%]'>Enquiry Date</FormLabel>
                                <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                                    <PopoverTrigger asChild className='h-10'>
                                        <Button
                                            variant='outline'
                                            className='flex flex-row items-center w-full h-10 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:basis-[70%]'
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {
                                                form?.getValues().enquiry_date
                                                        ? <span>{format(form?.getValues().enquiry_date, 'PPP')}</span>
                                                        : <span>Pick a date</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={form?.getValues().enquiry_date}
                                            onSelect={v => {setIsCalendarOpened(''); form?.setValue('enquiry_date', v)}}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />


                    {/* Visitor Name */}
                    <FormField
                        control={form.control}
                        name='visitor_name'
                        render={({field}) => (
                            <FormItem className='w-full h-7 flex flex-col items-start justify-center mt-[-8px] sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Visitor Name</FormLabel>
                                <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Visitor Address */}
                    <FormField
                        control={form.control}
                        name='visitor_address'
                        render={({field}) => (
                            <FormItem className='w-full h-7 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Visitor Address</FormLabel>
                                <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Mobile No. */}
                    <FormField
                        control={form.control}
                        name='mobile_no'
                        render={({field}) => (
                            <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Mobile No.</FormLabel>
                                <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Purpose Is Admission */}
                    <FormField
                        control={form.control}
                        name='purpose_is_admission'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-row mx-2 items-start justify-start sm:items-center sm:gap-2'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label htmlFor='purpose_is_admission' className='text-xs text-hash-color'>
                                                Purpose Is Admission
                                            </Label>
                                            <Switch
                                                id='purpose_is_admission'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                        </div>
                                    </FormControl>
                            </FormItem>
                        )}
                    />


                    {form.getValues().purpose_is_admission ? (
                        <>
                            {/* Student Name */}
                            <FormField
                                control={form.control}
                                name='student_name'
                                render={({field}) => (
                                    <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Student Name</FormLabel>
                                        <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Class */}
                            <FormField
                                control={form.control}
                                name='class_name'
                                render={({field}) => (
                                    <FormItem className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-0'>
                                        <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Class</FormLabel>
                                                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                                        <SelectValue placeholder='Select class' className='text-xs'/>
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            classes.length < 1 ? (
                                                                <p>No classes yet</p>
                                                            ) : // @ts-ignore
                                                            !classes[0].class_name ? (
                                                                <LoadingIcon />
                                                            ) : classes.map((item:any) => (
                                                                <SelectItem value={item.class_name} key={item._id}>{item.class_name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            {/* Reason To Visit */}
                            <FormField
                                control={form.control}
                                name='reason_to_visit'
                                render={({field}) => (
                                    <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                        <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Reason To Visit</FormLabel>
                                        <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                />
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}


                    {/* Contact Person */}
                    <FormField
                        control={form.control}
                        name='contact_person'
                        render={({field}) => (
                            <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Contact Person</FormLabel>
                                <div className='relative w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[100%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Reference Details */}
                    <FormField
                        control={form.control}
                        name='reference_details'
                        render={({field}) => (
                            <FormItem className='relative w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Reference Details</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[100%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} enquiries={enquiries} updateEnquiry={updateEnquiry} setUpdateEnquiry={setUpdateEnquiry} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;