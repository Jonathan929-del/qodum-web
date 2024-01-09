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





// Main function
const FormCom = ({setIsViewOpened, remarks, updateRemark, setUpdateRemark}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        remark:updateRemark.remark
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(RemarkValidation),
        defaultValues:{
            remark:updateRemark.id === '' ? '' : updateRemark.remark,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof RemarkValidation>) => {
        // Create remark
        if(updateRemark.id === ''){
            if(remarks.map((remark:any) => remark.remark).includes(values.remark)){
                toast({title:'Remark name already exists', variant:'error'});
                return;
            };
            await createRemark({
                remark:values.remark
            });
            toast({title:'Added Successfully!'});
        }
        // Modify remark
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.remark !== values.remark && remarks.map((remark:any) => remark.remark).includes(values.remark)){
                toast({title:'Remark name is already exists', variant:'error'});
                return;
            };
            await modifyRemark({
                id:updateRemark.id,
                remark:values.remark,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete remark
        else if(updateRemark.isDeleteClicked){
            await deleteRemark({id:updateRemark.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateRemark({
            id:'',
            isDeleteClicked:false,
            remark:''
        });
        // Reseting form
        form.reset({
            remark:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Remark</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Remark Name */}
                    <FormField
                        control={form.control}
                        name='remark'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Remark Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} remarks={remarks} updateRemark={updateRemark} setUpdateRemark={setUpdateRemark} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;