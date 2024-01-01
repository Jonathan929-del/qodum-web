'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Check, ChevronDown, X} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {InstallmentValidation} from '@/lib/validations/fees/feeMaster/feeMaster/installment.validation';
import {createInstallment, deleteInstallment, modifyInstallment} from '@/lib/actions/fees/feeMaster/feeMaster/Installment.actions';





// Main function
const FormCom = ({setIsViewOpened, installments, updateInstallment, setUpdateInstallment}:any) => {


    // Toast
    const {toast} = useToast();


    // Months
    const [selectedMonths, setSelectedMonths] = useState(['']);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    console.log(selectedMonths);


    // Years error
    const [yearsError, setYearsError] = useState(false);


    // Comparison object
    const comparisonObject = {
        name:updateInstallment.name,
        print_name:updateInstallment.print_name,
        preference_no:updateInstallment.preference_no,
        due_on_date:{
            day:updateInstallment.due_on_date.day,
            month:updateInstallment.due_on_date.month,
            year:updateInstallment.due_on_date.year
        },
        due_date:{
            day:updateInstallment.due_date.day,
            month:updateInstallment.due_date.month,
            year:updateInstallment.due_date.year
        },
        months:updateInstallment.months
    };


    // Form
    const form = useForm({
        resolver:zodResolver(InstallmentValidation),
        defaultValues:{
            name:updateInstallment.id === '' ? '' : updateInstallment.name,
            print_name:updateInstallment.id === '' ? '' : updateInstallment.print_name,
            preference_no:updateInstallment.id === '' ? 0 : updateInstallment.preference_no,
            due_on_date:{
                day:updateInstallment.id === '' ? '' : updateInstallment.due_on_date.day,
                month:updateInstallment.id === '' ? '' : updateInstallment.due_on_date.month,
                year:updateInstallment.id === '' ? '' : updateInstallment.due_on_date.year
            },
            due_date:{
                day:updateInstallment.id === '' ? '' : updateInstallment.due_date.day,
                month:updateInstallment.id === '' ? '' : updateInstallment.due_date.month,
                year:updateInstallment.id === '' ? '' : updateInstallment.due_date.year
            },
            months:updateInstallment.id === '' ? [''] : updateInstallment.months
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof InstallmentValidation>) => {
        try {
        // Create installment
        if(updateInstallment.id === ''){
            // Dates arrangment validation
            if(values.due_on_date.year > values.due_date.year){
                toast({title:'Due date cannot be earlier than due on date', variant:'error'});
                return;
            };
            // Duplicate installment name check
            if(installments.map((installment:any) => installment.name).includes(values.name)){
                toast({title:'Installment name already exists', variant:'error'});
                return;
            };
            // Duplicate installment preference number check
            if(installments.map((installment:any) => installment.preference_no).includes(values.preference_no)){
                toast({title:'Installment preference number already exists', variant:'error'});
                return;
            };
            await createInstallment({
                name:values.name,
                print_name:values.print_name,
                preference_no:values.preference_no,
                due_on_date:{
                    day:values.due_on_date.day,
                    month:values.due_on_date.month,
                    year:values.due_on_date.year
                },
                due_date:{
                    day:values.due_date.day,
                    month:values.due_date.month,
                    year:values.due_date.year
                },
                months:selectedMonths
            });
            toast({title:'Added Successfully!'});
        }
        // Modify installment
        else if(!deepEqual(comparisonObject, values)){
            // Duplicate installment name check
            if(comparisonObject.name !== values.name && installments.map((installment:any) => installment.name).includes(values.name)){
                toast({title:'Installment name is already exists', variant:'error'});
                return;
            };
            // Duplicate installment preference number check
            if(comparisonObject.preference_no !== values.preference_no && installments.map((installment:any) => installment.preference_no).includes(values.preference_no)){
                toast({title:'Installment preference number is already exists', variant:'error'});
                return;
            };
            await modifyInstallment({
                id:updateInstallment.id,
                name:values.name,
                print_name:values.print_name,
                preference_no:values.preference_no,
                due_on_date:{
                    day:values.due_on_date.day,
                    month:values.due_on_date.month,
                    year:values.due_on_date.year
                },
                due_date:{
                    day:values.due_date.day,
                    month:values.due_date.month,
                    year:values.due_date.year
                },
                months:values.months
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Installment
        else if(updateInstallment.isDeleteClicked){
            await deleteInstallment({id:updateInstallment.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateInstallment({
            id:'',
            isDeleteClicked:false,
            name:'',
            print_name:'',
            due_on_date:{
                day:'',
                month:'',
                year:''
            },
            due_date:{
                day:'',
                month:'',
                year:''
            },
            months:[]
        });
        // Reseting form
        form.reset({
            name:'',
            print_name:'',
            due_on_date:{
                day:'',
                month:'',
                year:''
            },
            due_date:{
                day:'',
                month:'',
                year:''
            },
            months:[]
        });   
        } catch (err:any) {
            console.log(err);
        }
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
    const [startDaysInTheMonth, setStartDaysInTheMonth] = useState<any>([]);
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


    // Use effects
    useEffect(() => {
        if(form.getValues().due_on_date.year !== '' && form.getValues().due_on_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().due_on_date.year, form.getValues().due_on_date.month);
            setStartDaysInTheMonth(daysLoopFuncResult);
        }
    }, [form.watch('due_on_date.year'), form.watch('due_on_date.month')]);
    useEffect(() => {
        if(form.getValues().due_date.year !== '' && form.getValues().due_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().due_date.year, form.getValues().due_date.month);
            setEndDaysInTheMonth(daysLoopFuncResult);
        }
    }, [form.watch('due_date.year'), form.watch('due_date.month')]);
    useEffect(() => {
        if(form.formState.errors.due_on_date || form.formState.errors.due_date){
            setYearsError(true);
        }else{
            setYearsError(false);
        }
    }, [form.formState.errors.due_date, form.formState.errors.due_on_date]);


    return (
        <div className='w-[90%] max-w-[600px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Fee Installment</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-8 pt-4 items-center px-2 sm:px-4 sm:gap-3'
                >


                    {/* Installment Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Installment Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Installment Print Name */}
                    <FormField
                        control={form.control}
                        name='print_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Installment Print Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Preference Number */}
                    <FormField
                        control={form.control}
                        name='preference_no'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Installment Preference No.</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Due On date */}
                    <div className='w-full h-10 flex flex-row items-center'>
                        <FormLabel className='basis-[30%] text-xs text-[#726E71]'>Due On date</FormLabel>
                        <div className='basis-[70%] h-full flex flex-row items-center justify-between gap-2'>
                            {/* Year */}
                            <FormField
                                control={form.control}
                                name='due_on_date.year'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                                name='due_on_date.month'
                                render={({field}) => (
                                    <FormItem className='flex-1 h-20 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                                name='due_on_date.day'
                                render={({field}) => (
                                    <FormItem className='flex-1 h-20 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Day' className='text-xs'/>
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            form.getValues().due_on_date.year !== '' && form.getValues().due_on_date.month !== '' ? 
                                                                startDaysInTheMonth.map((n:number) => (
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


                    {/* Due  Date */}
                    <div className='w-full h-10 flex flex-row items-center'>
                        <FormLabel className='basis-[30%] text-xs text-[#726E71]'>Due  Date</FormLabel>
                        <div className='basis-[70%] h-full flex flex-row items-center justify-between gap-2'>
                            {/* Year */}
                            <FormField
                                control={form.control}
                                name='due_date.year'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                                name='due_date.month'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
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
                                name='due_date.day'
                                render={({field}) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                            <SelectValue placeholder='Day' className='text-xs'/>
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                form.getValues().due_date.year !== '' && form.getValues().due_date.month !== '' ? 
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


                    {/* Months */}
                    <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                        <p className='basis-auto pr-2  text-xs text-[#726E71] sm:basis-[30%]'>Select Month</p>
                        <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Select>
                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedMonths.length < 1 ? 'Select month' : selectedMonths.length === 1 ? '1 month selected' : `${selectedMonths.length} months selected`} className='text-xs'/>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            onClick={() => setSelectedMonths(months)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12}/>
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedMonths([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12}/>
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {months.map((month:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] font-semibold'
                                                    checked={selectedMonths.map((m:any) => m).includes(month)}
                                                    onClick={() => selectedMonths.includes(month) ? setSelectedMonths(selectedMonths.filter((m:any) => m !== month)) : setSelectedMonths([...selectedMonths, month])}
                                                />
                                                <p className='text-sm font-semibold'>{month}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>
                            {/* {form.formState.errors?.months && <p className='absolute top-[100%] left-0 text-xs text-[#ff3333]'>*Month is required</p>} */}
                        </div>
                    </div>


                    {/* Error Message */}
                    {
                        yearsError && <p className='w-full text-xs text-[#ff3333] mb-[-30px]'>*Dates data is missing</p>
                    }
                    {/* Buttons */}
                    <div className='flex flex-col items-center'>
                        <Buttons setIsViewOpened={setIsViewOpened} installments={installments} updateInstallment={updateInstallment} setUpdateInstallment={setUpdateInstallment} onSubmit={onSubmit} form={form}/>
                    </div>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;