'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useForm, } from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {FinancialYearValidation} from '@/lib/validations/accounts/globalMasters/defineSession/financialYear';
import {createFinancialYear, deleteFinancialYear, modifyFinancialYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineFinancialYear.actions';





// Main function
const FormCom = ({setIsViewOpened, financialYears, updateFinancialYear, setUpdateFinancialYear}:any) => {


    // Toast
    const {toast} = useToast();


    // Years error
    const [yearsError, setYearsError] = useState(false);


    // Comparison object for updating
    const comparisonObject = {
        year_name:updateFinancialYear?.year_name,
        start_date:{
            day:updateFinancialYear?.start_date.day,
            month:updateFinancialYear?.start_date.month,
            year:updateFinancialYear?.start_date.year
        },
        end_date:{
            day:updateFinancialYear?.end_date.day,
            month:updateFinancialYear?.end_date.month,
            year:updateFinancialYear?.end_date.year
        },
        is_active:updateFinancialYear?.is_active
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


    // Form
    const form:any = useForm({
        resolver:zodResolver(FinancialYearValidation),
        defaultValues:{
            year_name:updateFinancialYear.id === '' ? '' : updateFinancialYear.year_name,
            start_date:{
                day:updateFinancialYear.id === '' ? '' : updateFinancialYear.start_date.day,
                month:updateFinancialYear.id === '' ? '' : updateFinancialYear.start_date.month,
                year:updateFinancialYear.id === '' ? '' : updateFinancialYear.start_date.year
            },
            end_date:{
                day:updateFinancialYear.id === '' ? '' : updateFinancialYear.end_date.day,
                month:updateFinancialYear.id === '' ? '' : updateFinancialYear.end_date.month,
                year:updateFinancialYear.id === '' ? '' : updateFinancialYear.end_date.year
            },
            is_active:updateFinancialYear.id === '' ? false : updateFinancialYear.is_active
        }
    });

    // Submit handler
    const onSubmit = async (values:z.infer<typeof FinancialYearValidation>) => {
        // Create Financial Year
        if(updateFinancialYear.id === ''){
            if(values.start_date.year > values.end_date.year){
                toast({title:'End year cannot be earlier than start year', variant:'error'});
                return;
            };
            if(financialYears.map((year:any) => year.year_name).includes(values.year_name)){
                toast({title:'Financial year already exists', variant:'error'});
                return;
            };
            await createFinancialYear({
                year_name:values.year_name,
                start_date:{
                    day:values.start_date.day,
                    month:values.start_date.month,
                    year:values.start_date.year,
                },
                end_date:{
                    day:values.end_date.day,
                    month:values.end_date.month,
                    year:values.end_date.year,
                },
                is_active:values.is_active,
            });
            toast({title:'Added Successfully!'});
        }
        // Modify Financial Year
        else if(!deepEqual(comparisonObject, values)){
            if(values.start_date.year > values.end_date.year){
                toast({title:'End year cannot be earlier than start year', variant:'error'});
                return;
            };
            if(comparisonObject.year_name !== values.year_name && financialYears.map((year:any) => year.year_name).includes(values.year_name)){
                form.setValue('year_name', comparisonObject.year_name);
                toast({title:'Financial year already exists', variant:'error'});
                return;
            };
            await modifyFinancialYears({
                id:updateFinancialYear.id,
                year_name:values.year_name,
                start_date:{
                    day:values.start_date.day,
                    month:values.start_date.month,
                    year:values.start_date.year,
                },
                end_date:{
                    day:values.end_date.day,
                    month:values.end_date.month,
                    year:values.end_date.year,
                },
                is_active:values.is_active,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Financial Year
        else if(updateFinancialYear.isDeleteClicked){
            await deleteFinancialYear({id:updateFinancialYear.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateFinancialYear({
            year_name:'',
            start_date:{
                day:'',
                month:'',
                year:''
            },
            end_date:{
                day:'',
                month:'',
                year:''
            },
            is_active:false,
            id:'',
            isDeleteClicked:false
        });        
        // Reseting form
        form.reset({
            year_name:'',
            start_date:{
                day:'',
                month:'',
                year:''
            },
            end_date:{
                day:'',
                month:'',
                year:''
            },
            is_active:false,
        });
    };


    // Use effects
    useEffect(() => {
        if(form.getValues().start_date.year !== '' && form.getValues().start_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().start_date.year, form.getValues().start_date.month);
            setStartDaysInTheMonth(daysLoopFuncResult);
        }
    }, [form.watch('start_date.year'), form.watch('start_date.month')]);
    useEffect(() => {
        if(form.getValues().end_date.year !== '' && form.getValues().end_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().end_date.year, form.getValues().end_date.month);
            setEndDaysInTheMonth(daysLoopFuncResult);
        }
    }, [form.watch('end_date.year'), form.watch('end_date.month')]);
    useEffect(() => {
        if(form.formState.errors.start_date || form.formState.errors.end_date){
            setYearsError(true);
        }else{
            setYearsError(false);
        }
    }, [form.formState.errors.end_date, form.formState.errors.start_date]);


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Financial Year</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col items-center px-2 sm:px-4'
                >

                    {/* Year Name */}
                    <FormField
                        control={form.control}
                        name='year_name'
                        render={({field}) => (
                            <FormItem className='w-full h-15 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Financial Year</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px]'>
                                        <FormMessage className='text-xs'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Start Year */}
                    <div className='w-full h-10 flex flex-row items-center'>
                        <FormLabel className='basis-[30%] text-xs text-[#726E71]'>Start Year</FormLabel>
                        <div className='basis-[70%] h-full flex flex-row items-center justify-between gap-2'>
                            {/* Year */}
                            <FormField
                                control={form.control}
                                name='start_date.year'
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
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
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
                                name='start_date.month'
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
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
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
                                name='start_date.day'
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
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            form.getValues().start_date.year !== '' && form.getValues().start_date.month !== '' ? 
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


                    {/* End Year */}
                    <div className='w-full h-10 flex flex-row items-center'>
                        <FormLabel className='basis-[30%] text-xs text-[#726E71]'>End Year</FormLabel>
                        <div className='basis-[70%] h-full flex flex-row items-center justify-between gap-2'>
                            {/* Year */}
                            <FormField
                                control={form.control}
                                name='end_date.year'
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
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
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
                                name='end_date.month'
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
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
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
                                name='end_date.day'
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
                                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                form.getValues().end_date.year !== '' && form.getValues().end_date.month !== '' ? 
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


                    {/* Is Active */}
                    <FormField
                        control={form.control}
                        name='is_active'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    {/* Error Message */}
                                    {
                                        yearsError && <p className='text-xs text-[#FF5939]'>Years data missing</p>
                                    }
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Switch
                                                id='is_active'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                            <Label
                                                htmlFor='is_active'
                                                className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                            >
                                                Is Active
                                            </Label>
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} financialYears={financialYears} updateFinancialYear={updateFinancialYear} setUpdateFinancialYear={setUpdateFinancialYear} onSubmit={onSubmit} form={form}/>
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;