'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {JobValidation} from '@/lib/validations/payroll/globalMasters/job.validation';
import {createJob, deleteJob, modifyJob} from '@/lib/actions/payroll/globalMasters/job.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { useEffect, useState } from 'react';
import moment from 'moment';
import MyDatePicker from '@/components/utils/CustomDatePicker';





// Main function
const FormCom = ({setIsViewOpened, jobs, updateJob, setUpdateJob}:any) => {

    // Toast
    const {toast} = useToast();


    // Last date of submission
    const [lastDateOfSubmission, setLastDateOfSubmission] = useState(moment());


    // Comparison object
    const comparisonObject = {
        post:updateJob.post,
        salary:updateJob.salary,
        experience:updateJob.experience,
        description:updateJob.description,
        key_skill:updateJob.key_skill,
        last_date_of_submission:updateJob.last_date_of_submission
    };


    // Form
    const form = useForm({
        resolver:zodResolver(JobValidation),
        defaultValues:{
            post:updateJob.id === '' ? '' : updateJob.post,
            salary:updateJob.id === '' ? '' : updateJob.salary,
            experience:updateJob.id === '' ? '' : updateJob.experience,
            description:updateJob.id === '' ? '' : updateJob.description,
            key_skill:updateJob.id === '' ? '' : updateJob.key_skill,
            last_date_of_submission:updateJob.id === '' ? new Date() : updateJob.last_date_of_submission
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof JobValidation>) => {
        // Create job
        if(updateJob.id === ''){
            const res = await createJob({
                post:values.post,
                salary:values.salary,
                experience:values.experience,
                description:values.description,
                key_skill:values.key_skill,
                last_date_of_submission:values.last_date_of_submission
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify job
        else if(!deepEqual(comparisonObject, values)){
            await modifyJob({
                id:updateJob.id,
                post:values.post,
                salary:values.salary,
                experience:values.experience,
                description:values.description,
                key_skill:values.key_skill,
                last_date_of_submission:values.last_date_of_submission
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete job
        else if(updateJob.isDeleteClicked){
            await deleteJob({id:updateJob.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setLastDateOfSubmission(moment());
        setUpdateJob({
            id:'',
            isDeleteClicked:false,
            post:'',
            salary:'',
            experience:'',
            description:'',
            key_skill:'',
            last_date_of_submission:new Date()
        });
        // Reseting form
        form.reset({
            post:'',
            salary:'',
            experience:'',
            description:'',
            key_skill:'',
            last_date_of_submission:new Date()
        });
    };


    // Use effect
    useEffect(() => {
        if(lastDateOfSubmission){
            // @ts-ignore
            form.setValue('last_date_of_submission', lastDateOfSubmission._d);
        };
    }, [lastDateOfSubmission]);

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Job</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >

                    {/* Post */}
                    <FormField
                        control={form.control}
                        name='post'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Post</FormLabel>
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


                    {/* Salary */}
                    <FormField
                        control={form.control}
                        name='salary'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Salary</FormLabel>
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


                    {/* Experience */}
                    <FormField
                        control={form.control}
                        name='experience'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Experience</FormLabel>
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


                    {/* Description */}
                    <FormField
                        control={form.control}
                        name='description'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Description</FormLabel>
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


                    {/* Key Skill */}
                    <FormField
                        control={form.control}
                        name='key_skill'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Key Skill</FormLabel>
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


                    {/* Adm. Date From */}
                    <div className='relative w-full flex flex-row items-center mt-2'>
                        <p className='pr-2 text-end text-xs text-[#726E71] basis-[30%]'>Last Date of Submission</p>
                        <div className='basis-[70%]'>
                            <MyDatePicker
                                selectedDate={lastDateOfSubmission}
                                setSelectedDate={setLastDateOfSubmission}
                            />
                        </div>
                    </div>


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} jobs={jobs} updateJob={updateJob} setUpdateJob={setUpdateJob} onSubmit={onSubmit} form={form}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;