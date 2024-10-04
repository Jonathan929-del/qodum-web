'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {ChevronDown} from 'lucide-react';
import {useForm, } from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useContext, useEffect, useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AcademicYearValidation} from '@/lib/validations/accounts/globalMasters/defineSession/academicYear';
import {createFinancialYear, createFinancialYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineFinancialYear.actions';
import {createAcademicYear, createAcademicYears, deleteAcademicYear, modifyAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const FormCom = ({setIsViewOpened, academicYears, updateAcademicYear, setUpdateAcademicYear}:any) => {

    // Toast
    const {toast} = useToast();


    // Years error
    const [yearsError, setYearsError] = useState(false);


    // Is upcoming sessions
    const [isUpcomingSessions, setIsUpcomingSessions] = useState(false);


    // Number of sessions
    const [numberOfSessions, setNumberOfSessions] = useState();


    // Is number of sessions error
    const [isNumberOfSessionsErr, setIsNumberOfSessionsErr] = useState('');


    // Is create financial year
    const [isCreateFinancialYear, setIsCreateFinancialYear] = useState(false);


    // Comparison object for updating
    const comparisonObject = {
        year_name:updateAcademicYear?.year_name,
        start_date:{
            day:updateAcademicYear?.start_date.day,
            month:updateAcademicYear?.start_date.month,
            year:updateAcademicYear?.start_date.year
        },
        end_date:{
            day:updateAcademicYear?.end_date.day,
            month:updateAcademicYear?.end_date.month,
            year:updateAcademicYear?.end_date.year
        },
        is_active:updateAcademicYear?.is_active,
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
    const form = useForm({
        resolver:zodResolver(AcademicYearValidation),
        defaultValues:{
            year_name:updateAcademicYear.id === '' ? '' : updateAcademicYear.year_name,
            start_date:{
                day:updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.day,
                month:updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.month,
                year:updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.year
            },
            end_date:{
                day:updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.day,
                month:updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.month,
                year:updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.year
            },
            is_active:updateAcademicYear.id === '' ? false : updateAcademicYear.is_active
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AcademicYearValidation>) => {

        // Create Academic Year
        if(updateAcademicYear.id === ''){
            // Checking for next sessions number errors
            if(isNumberOfSessionsErr !== '') return;
            if(!numberOfSessions){
                setIsNumberOfSessionsErr('Please enter the number of the upcoming sessions');
                return;
            };
            if(values.start_date.year > values.end_date.year){
                toast({title:'End year cannot be earlier than start year', variant:'error'});
                return;
            };
            if(academicYears.map((year:any) => year.year_name).includes(values.year_name)){
                toast({title:'Academic year already exists', variant:'error'});
                return;
            };
            await createAcademicYear({
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
                is_active:values.is_active
            });
            if(isCreateFinancialYear){
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
            };
            if(isUpcomingSessions){
                const getNextSession = ({session, number}:any) => {

                    // Split the session string into two parts based on the hyphen
                    const [startYear, endYear] = session.split('-').map(Number);
                    
                    // Calculate the next session's years
                    const nextStartYear = startYear + number;
                    const nextEndYear = endYear + number;
                    
                    // Return the new session string
                    return `${nextStartYear}-${nextEndYear}`;
                }
                let upcomingSessionsArray = [];
                for(let i = 1; i < numberOfSessions; i++){
                    upcomingSessionsArray.push({
                        year_name:getNextSession({session:values.year_name, number:i}),
                        start_date:{
                            day:values.start_date.day,
                            month:values.start_date.month,
                            year:JSON.stringify(Number(values.start_date.year) + i),
                        },
                        end_date:{
                            day:values.end_date.day,
                            month:values.end_date.month,
                            year:JSON.stringify(Number(values.end_date.year) + i),
                        },
                        is_active:false,
                    });
                };
                await createAcademicYears({academic_years:upcomingSessionsArray});
                await createFinancialYears({financial_years:upcomingSessionsArray});
            };
            toast({title:'Added Successfully!'});
        }
        // Modify Academic Year
        else if(!deepEqual(comparisonObject, values)){
            if(values.start_date.year > values.end_date.year){
                toast({title:'End year cannot be earlier than start year', variant:'error'});
                return;
            };
            if(comparisonObject.year_name !== values.year_name && academicYears.map((year:any) => year.year_name).includes(values.year_name)){
                form.setValue('year_name', comparisonObject.year_name);
                toast({title:'Academic year already exists', variant:'error'});
                return;
            };
            await modifyAcademicYears({
                id:updateAcademicYear.id,
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
        // Delete Academic Year
        else if(updateAcademicYear.isDeleteClicked){
            await deleteAcademicYear({id:updateAcademicYear.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateAcademicYear({
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
        setIsCreateFinancialYear(false);
        setIsUpcomingSessions(false);
        setIsUpcomingSessions(null);
        setNumberOfSessions(null);
    };


    // Use effects
    useEffect(() => {
        form.reset({
          year_name: updateAcademicYear.id === '' ? '' : updateAcademicYear.year_name,
          start_date: {
            day: updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.day,
            month: updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.month,
            year: updateAcademicYear.id === '' ? '' : updateAcademicYear.start_date.year,
          },
          end_date: {
            day: updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.day,
            month: updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.month,
            year: updateAcademicYear.id === '' ? '' : updateAcademicYear.end_date.year,
          },
          is_active: updateAcademicYear.id === '' ? false : updateAcademicYear.is_active,
        });
      }, [updateAcademicYear, form.reset]);
    useEffect(() => {
        if(form.getValues().start_date.year !== '' && form.getValues().start_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().start_date.year, form.getValues().start_date.month);
            setStartDaysInTheMonth(daysLoopFuncResult);
            form.setValue('start_date.day', updateAcademicYear.start_date.day);
        }
    }, [form.watch('start_date.year'), form.watch('start_date.month')]);
    useEffect(() => {
        if(form.getValues().end_date.year !== '' && form.getValues().end_date.month !== ''){
            const daysLoopFuncResult = daysLoop(form.getValues().end_date.year, form.getValues().end_date.month);
            setEndDaysInTheMonth(daysLoopFuncResult);
            form.setValue('end_date.day', updateAcademicYear.end_date.day);
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
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Academic Year</h2>
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
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Academic Year</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
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
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
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
                                                            <ChevronDown className="h-4 w-4 opacity-50" />
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
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
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


                    {/* Create Financial Year */}
                    {updateAcademicYear.id === '' && (
                        <FormItem className='w-full flex-1 h-10 pb-2 flex flex-row items-start justify-between mt-2 sm:items-center sm:gap-2'>
                            <>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='is_create_financial_year'
                                            onCheckedChange={setIsCreateFinancialYear}
                                            checked={isCreateFinancialYear}
                                        />
                                        <Label
                                            htmlFor='is_create_financial_year'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Create Financial Year
                                        </Label>
                                    </div>
                                </FormControl>
                            </>
                        </FormItem>
                    )}


                    {/* Create upcoming sessions */}
                    {updateAcademicYear.id === '' && (
                        <FormItem className='w-full flex-1 h-10 pb-2 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                            <>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='is_create_upcoming_sessions'
                                            onCheckedChange={() => {
                                                if(isUpcomingSessions){
                                                    setIsNumberOfSessionsErr('');
                                                    setNumberOfSessions(null);
                                                };
                                                setIsUpcomingSessions(!isUpcomingSessions);
                                            }}
                                            checked={isUpcomingSessions}
                                        />
                                        <Label
                                            htmlFor='is_create_upcoming_sessions'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Create upcoming sessions
                                        </Label>
                                    </div>
                                </FormControl>
                            </>
                        </FormItem>
                    )}


                    {/* Number of sessions */}
                    {updateAcademicYear.id === '' && isUpcomingSessions && (
                        <div className='relative w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                            <p className='basis-auto pr-2 text-start text-xs text-[#726E71] sm:basis-[30%]'>Number of sessions</p>
                            <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Input
                                    value={numberOfSessions}
                                    onChange={(e:any) => {
                                        setNumberOfSessions(e.target.value);
                                        if(/[a-zA-Z]/.test(e.target.value)){
                                            setIsNumberOfSessionsErr('Please enter a number');
                                        }else{
                                            setIsNumberOfSessionsErr('');
                                        }
                                    }}
                                    className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                />
                            </div>
                            {isNumberOfSessionsErr && (
                                <p className='absolute top-[100%] left-[30%] text-[11px] text-red-500'>{isNumberOfSessionsErr}</p>
                            )}
                        </div>
                    )}


                    {/* Buttons */}
                    <div className='mt-4 sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} academicYears={academicYears} updateAcademicYear={updateAcademicYear} setUpdateAcademicYear={setUpdateAcademicYear} onSubmit={onSubmit} form={form} setIsCreateFinancialYear={setIsCreateFinancialYear} setIsUpcomingSessions={setIsUpcomingSessions} setIsNumberOfSessionsErr={setIsNumberOfSessionsErr} setNumberOfSessions={setNumberOfSessions}/>
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;