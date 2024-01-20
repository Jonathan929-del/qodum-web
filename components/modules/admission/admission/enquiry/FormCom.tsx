'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {EnquiryValidation} from '@/lib/validations/admission/admission/enquiry.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createEnquiry, deleteEnquiry, modifyEnquiry} from '@/lib/actions/admission/admission/enquiry.actions';





// Main function
const FormCom = ({setIsViewOpened, enquiries, updateEnquiry, setUpdateEnquiry}:any) => {


    // Toast
    const {toast} = useToast();


    // Last number
    const [lastNumber, setLastNumber] = useState();


    // Comparison object
    const comparisonObject = {
        enquiry_no:updateEnquiry.enquiry_no,
        enquiry_date:{
            year:updateEnquiry.enquiry_date.year,
            month:updateEnquiry.enquiry_date.month,
            day:updateEnquiry.enquiry_date.day
        },
        visitor_name:updateEnquiry.visitor_name,
        visitor_address:updateEnquiry.visitor_address,
        mobile_no:updateEnquiry.mobile_no,
        purpose:updateEnquiry.purpose,
        contact_person:updateEnquiry.contact_person,
        reference_details:updateEnquiry.reference_details
    };


    // Automatic enquiry number
    // @ts-ignore
    const enquiryNumber = `${localStorage.getItem('prefix')}${localStorage.getItem('lead_zero').substring(0, localStorage.getItem('lead_zero').length - 1)}${enquiries.length + 1}${localStorage.getItem('suffix')}`;


    // Form
    const form = useForm({
        resolver:zodResolver(EnquiryValidation),
        defaultValues:{
            // @ts-ignore
            enquiry_no:localStorage.getItem('setting_type') === 'Automatic' ? enquiryNumber : updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_no,
            enquiry_date:{
                year:updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_date.year,
                month:updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_date.month,
                day:updateEnquiry.id === '' ? '' : updateEnquiry.enquiry_date.day
            },
            visitor_name:updateEnquiry.id === '' ? '' : updateEnquiry.visitor_name,
            visitor_address:updateEnquiry.id === '' ? '' : updateEnquiry.visitor_address,
            mobile_no:updateEnquiry.id === '' ? '' : updateEnquiry.mobile_no,
            purpose:updateEnquiry.id === '' ? '' : updateEnquiry.purpose,
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
                enquiry_date:{
                    year:values.enquiry_date.year,
                    month:values.enquiry_date.month,
                    day:values.enquiry_date.day
                },
                visitor_name:values.visitor_name,
                visitor_address:values.visitor_address,
                mobile_no:values.mobile_no,
                purpose:values.purpose,
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
                enquiry_no:values.enquiry_no,
                enquiry_date:{
                    year:values.enquiry_date.year,
                    month:values.enquiry_date.month,
                    day:values.enquiry_date.day
                },
                visitor_name:values.visitor_name,
                visitor_address:values.visitor_address,
                mobile_no:values.mobile_no,
                purpose:values.purpose,
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
            enquiry_date:{
                year:'',
                month:'',
                day:''
            },
            visitor_name:'',
            visitor_address:'',
            mobile_no:'',
            purpose:'',
            contact_person:'',
            reference_details:''
        });
        // Reseting form
        form.reset({
            enquiry_no:'',
            enquiry_date:{
                year:'',
                month:'',
                day:''
            },
            visitor_name:'',
            visitor_address:'',
            mobile_no:'',
            purpose:'',
            contact_person:'',
            reference_details:''
        });
    };


    // Years Loop
    const yearsLoop = () => {
        let newArr = [];
        for (let i = 2050; i >= 1960; i--) newArr.push(i);
        return newArr;
    };


    // Months Loop
    const monthsLoop = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    // Days Loop
    const [endDaysInTheMonth, setEndDaysInTheMonth] = useState<any>([]);
    const daysLoop = (year:string, month:string) => {
        let newArr = [];
        
        // Converting month string into number ex:december => 12
        const monthNumber = monthsLoop.indexOf(month) + 1;
        
        
        // Getting number of days in a month
        const days = new Date(JSON.parse(year), monthNumber, 0).getDate();
        
        
        // Days Loop
        for (let i = 1; i <= days; i++) newArr.push(i);
        return newArr;
    };


    // Last number handler
    const lastNumberHandler = () => {
        const number = enquiries[enquiries.length - 1].enquiry_no;
        setLastNumber(number);
    };


    // Use effect
    useEffect(() => {
        if(form.getValues().enquiry_date.year !== '' && form.getValues().enquiry_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().enquiry_date.year, form.getValues().enquiry_date.month);
            setEndDaysInTheMonth(daysLoopFuncResult);
        }
    }, [form.watch('enquiry_date.year'), form.watch('enquiry_date.month')]);


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
                                            disabled={localStorage.getItem('setting_type') === 'Automatic'}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[90%] text-xs' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Enquiry Date */}
                    <div className='w-full flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Enquiry Date</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            {/* Year */}
                            <FormField
                                control={form.control}
                                name='enquiry_date.year'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Year' className='text-xs'/>
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            yearsLoop().map((year:any) => (
                                                                <SelectItem value={JSON.stringify(year)}>{year}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Month */}
                            <FormField
                                control={form.control}
                                name='enquiry_date.month'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Month' className='text-xs'/>
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                monthsLoop.map((month:any) => (
                                                                    <SelectItem value={month}>{month}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Day */}
                            <FormField
                                control={form.control}
                                name='enquiry_date.day'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Day' className='text-xs'/>
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                form.getValues().enquiry_date.year !== '' && form.getValues().enquiry_date.month !== '' ? 
                                                                    endDaysInTheMonth.map((n:number) => (
                                                                        <SelectItem value={JSON.stringify(n)}>{n}</SelectItem>
                                                                    ))
                                                                :(
                                                                    <SelectItem value='day'>Day</SelectItem>
                                                                )
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                            </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


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


                    {/* Purpose */}
                    <FormField
                        control={form.control}
                        name='purpose'
                        render={({field}) => (
                            <FormItem className='w-full h-7 flex flex-col items-start justify-center  sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 mb-[-10px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Purpose</FormLabel>
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