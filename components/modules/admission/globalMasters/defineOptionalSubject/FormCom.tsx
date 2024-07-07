'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import { RemarkValidation } from '@/lib/validations/admission/globalMasters/remark.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createRemark, deleteRemark, modifyRemark} from '@/lib/actions/admission/globalMasters/remark.actions';
import { OptionalSubjectValidation } from '@/lib/validations/admission/globalMasters/optionalSubject.validation';
import { createOptionalSubject, deleteOptionalSubject, modifyOptionalSubject } from '@/lib/actions/admission/globalMasters/optionalSubject.actions';





// Main function
const FormCom = ({setIsViewOpened, subjects, updateSubject, setUpdateSubject}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        subject_name:updateSubject.subject_name
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(OptionalSubjectValidation),
        defaultValues:{
            subject_name:updateSubject.id === '' ? '' : updateSubject.subject_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof OptionalSubjectValidation>) => {
        // Create subject
        if(updateSubject.id === ''){
            if(subjects.map((s:any) => s.subject_name).includes(values.subject_name)){
                toast({title:'Optional subject name already exists', variant:'error'});
                return;
            };
            const res = await createOptionalSubject({
                subject_name:values.subject_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify subject
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.subject_name !== values.subject_name && subjects.map((s:any) => s.subject_name).includes(values.subject_name)){
                toast({title:'Optional subject name already exists', variant:'error'});
                return;
            };
            await modifyOptionalSubject({
                id:updateSubject.id,
                subject_name:values.subject_name,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete subject
        else if(updateSubject.isDeleteClicked){
            await deleteOptionalSubject({id:updateSubject.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateSubject({
            id:'',
            isDeleteClicked:false,
            subject_name:''
        });
        // Reseting form
        form.reset({
            subject_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Optional Subject</h2>
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


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} subjects={subjects} updateSubject={updateSubject} setUpdateSubject={setUpdateSubject} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;