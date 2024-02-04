// Imports
import * as z from 'zod';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';
import StudentsList from './StudentList';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {applyStudentForAdmission, fetchClassStudents} from '@/lib/actions/admission/admission/student.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {ManualListGenerationValidation} from '@/lib/validations/admission/admission/entranceTest/manualListGeneration.validation';





// Main function
function FormCom() {


    // Toast
    const {toast} = useToast();


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Students
    const [students, setStudents] = useState([{}]);


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Sessiong
    const [sessions, setSessions] = useState([{}]);


    // Selected students
    const [selectedStudents, setSelectedStudents] = useState([]);


    // Form
    const form = useForm({
        resolver: zodResolver(ManualListGenerationValidation),
        defaultValues: {
            class_name:'',
            merit_list:'',
            date:new Date(),
            admission_date_from:new Date(),
            admission_date_to:new Date(),
            session:'',
            students:[]
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof ManualListGenerationValidation>) => {
        try {
            const res = await applyStudentForAdmission({reg_nos:selectedStudents});
            form.reset({
                class_name:'',
                merit_list:'',
                date:new Date(),
                admission_date_from:new Date(),
                admission_date_to:new Date(),
                session:'',
                students:[]
            });
            setStudents([{}]);
            setSelectedStudents([]);
            toast({title:'Updated Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Get students
    const getStudents = async (class_name:any) => {
        const classStudents = await fetchClassStudents({class_name});
        if(classStudents.length > 0){
            setStudents(classStudents);
            // @ts-ignore
            setSelectedStudents(classStudents.map((s:any) => s?.student?.reg_no));
        }else{
            toast({title:'No students found', variant:'alert'});
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sessionsRes = await fetchAcademicYears();
            setClasses(classesRes);
            setSessions(sessionsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%] overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
                >





                    <div className='w-full flex flex-col items-start gap-2 lg:items-end lg:flex-row'>
                        {/* Class */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Class</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='class_name'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
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


                        {/* Merit List */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Merit List</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='merit_list'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='Main List'>Main List</SelectItem>
                                                        <SelectItem value='Waiting List'>Waiting List</SelectItem>
                                                        <SelectItem value='Second List'>Second List</SelectItem>
                                                        <SelectItem value='Third List'>Third List</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <FormField
                            control={form?.control}
                            name='date'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Date</FormLabel>
                                    <Popover open={isCalendarOpened === 'date'} onOpenChange={() => isCalendarOpened === 'date' ? setIsCalendarOpened('') : setIsCalendarOpened('date')}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='h-7 flex flex-row items-center w-full text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    form?.getValues().date
                                                            ? <span>{format(form?.getValues().date, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={form?.getValues().date}
                                                onSelect={(v:any) => {setIsCalendarOpened(''); form?.setValue('date', v)}}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />


                        {/* Get Student */}
                        <span
                            className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            onClick={() => getStudents(form.getValues().class_name)}
                        >
                            Get Student
                        </span>
                    </div>





                    <div className='w-full flex flex-col items-start gap-2 mt-2 lg:items-end lg:flex-row'>
                        {/* Adm. Date From */}
                        <FormField
                            control={form?.control}
                            name='admission_date_from'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Adm. Date From</FormLabel>
                                    <Popover open={isCalendarOpened === 'admission_date_from'} onOpenChange={() => isCalendarOpened === 'admission_date_from' ? setIsCalendarOpened('') : setIsCalendarOpened('admission_date_from')}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='h-7 flex flex-row items-center w-full text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    form?.getValues().admission_date_from
                                                            ? <span>{format(form?.getValues().admission_date_from, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={form?.getValues().admission_date_from}
                                                onSelect={(v:any) => {setIsCalendarOpened(''); form?.setValue('admission_date_from', v)}}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />


                        {/* Adm. Date To */}
                        <FormField
                            control={form?.control}
                            name='admission_date_to'
                            render={() => (
                                <FormItem className='relative w-full flex flex-col'>
                                    <FormLabel className='pr-2 h-2 text-start text-[11px] text-[#726E71]'>Adm. Date To</FormLabel>
                                    <Popover open={isCalendarOpened === 'admission_date_to'} onOpenChange={() => isCalendarOpened === 'admission_date_to' ? setIsCalendarOpened('') : setIsCalendarOpened('admission_date_to')}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                className='h-7 flex flex-row items-center w-full text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            >
                                                <CalendarIcon className='mr-2 h-4 w-4' />
                                                {
                                                    form?.getValues().admission_date_to
                                                            ? <span>{format(form?.getValues().admission_date_to, 'PPP')}</span>
                                                            : <span>Pick a date</span>
                                                }
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                mode='single'
                                                selected={form?.getValues().admission_date_to}
                                                onSelect={(v:any) => {setIsCalendarOpened(''); form?.setValue('admission_date_to', v)}}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />


                        {/* Session */}
                        <div className='w-full flex flex-col items-center'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%]'>Session</FormLabel>
                            <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='session'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    disabled
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sessions?.length < 1 ? (
                                                            <p>No sessions</p>
                                                            // @ts-ignore
                                                        ) : !sessions[0]?.year_name ? (
                                                            <LoadingIcon />
                                                        ) : sessions?.map((item:any) => (
                                                            <SelectItem value={item?.year_name} key={item?._id}>{item?.year_name}</SelectItem>
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


                        {/* Update */}
                        <span
                            className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Update
                        </span>
                    </div>


                    <StudentsList
                        students={students}
                        selectedStudents={selectedStudents}
                        setSelectedStudents={setSelectedStudents}
                    />


                    {/* Buttons */}
                    <Button
                        type='submit'
                        className='px-8 h-8 mb-4 mt-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px]'
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;