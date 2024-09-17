// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { fetchSubjects } from '@/lib/actions/admission/globalMasters/subject.actions';
import LoadingIcon from '@/components/utils/LoadingIcon';





// Main function
const StaffEducationalDetails = ({form}:any) => {

    // Subjects
    const [subjects, setSubjects] = useState([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const subjectsRes = await fetchSubjects();
            setSubjects(subjectsRes);
        };
        fetcher();
    }, []);

    return (
        <div className='flex justify-start px-4 pt-10'>
            <div className='flex-1 flex flex-col gap-2 max-w-[50%]'>

                {/* Qualification */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.qualification'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Qualification</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Name of School/College */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.name_of_school_or_college'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Name of School/College</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Name of Board/University */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.name_of_board_or_university'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Name of Board/University</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* RC */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.rc'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>RC</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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


                {/* Subjects */}
                <div className='w-full flex flex-col items-center lg:flex-row'>
                    <FormLabel className='w-full text-[11px] text-start pr-[4px] text-[#726E71] lg:basis-[35%] lg:text-end'>Subjects</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[65%]'>
                        <FormField
                            control={form?.control}
                            name='staff_educational_details.subjects'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-2 lg:mt-0'>
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
                                    <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Percentage of Marks */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.percentage_of_marks'
                    render={({ field }) => (
                        <FormItem className='relative w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Percentage of Marks</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='number'
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />


                {/* Year of Passing */}
                <FormField
                    control={form?.control}
                    name='staff_educational_details.year_of_passing'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Year of Passing</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
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
    );
};





// Export
export default StaffEducationalDetails;