'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubjectValidation} from '@/lib/validations/admission/globalMasters/subject.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createSubject, deleteSubject, modifySubject} from '@/lib/actions/admission/globalMasters/subject.actions';





// Main function
const FormCom = ({setIsViewOpened, subjects, updateSubject, setUpdateSubject}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        subject_name:updateSubject.subject_name,
        available_seats:updateSubject.available_seats,
        is_university:updateSubject.is_university
    };


    // Form
    const form = useForm({
        resolver:zodResolver(SubjectValidation),
        defaultValues:{
            subject_name:updateSubject.id === '' ? '' : updateSubject.subject_name,
            available_seats:updateSubject.id === '' ? 0 : updateSubject.available_seats,
            is_university:updateSubject.id === '' ? false : updateSubject.is_university
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof SubjectValidation>) => {
        // Create subject
        if(updateSubject.id === ''){
            if(subjects.map((s:any) => s.subject_name).includes(values.subject_name)){
                toast({title:'Subject already exists', variant:'error'});
                return;
            };
            await createSubject({
                subject_name:values.subject_name,
                available_seats:values.available_seats,
                is_university:values.is_university
            });
            toast({title:'Added Successfully!'});
        }
        // Modify subject
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.subject_name !== values.subject_name && subjects.map((s:any) => s.subject_name).includes(values.subject_name)){
                toast({title:'Subject already exists', variant:'error'});
                return;
            };
            await modifySubject({
                id:updateSubject.id,
                subject_name:values.subject_name,
                available_seats:values.available_seats,
                is_university:values.is_university
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete suject
        else if(updateSubject.isDeleteClicked){
            await deleteSubject({id:updateSubject.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateSubject({
            id:'',
            isDeleteClicked:false,
            subject_name:'',
            available_seats:0,
            is_university:false
        });
        // Reseting form
        form.reset({
            subject_name:'',
            available_seats:0,
            is_university:false
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Subject </h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >


                    {/* Subject Name */}
                    <FormField
                        control={form.control}
                        name='subject_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Subject Name</FormLabel>
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


                    {/* Available Seats */}
                    <FormField
                        control={form.control}
                        name='available_seats'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Available Seats</FormLabel>
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


                    {/* Is University */}
                    <FormField
                        control={form.control}
                        name='is_university'
                        render={({ field }) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-start space-x-2'>
                                            <Label
                                                htmlFor='is_university'
                                                className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:basis-[30%]'
                                            >
                                                Is University
                                            </Label>
                                            <Switch
                                                id='is_university'
                                                {...field}
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                        </div>
                                    </FormControl>
                                </>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} subjects={subjects} updateSubject={updateSubject} setUpdateSubject={setUpdateSubject} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;