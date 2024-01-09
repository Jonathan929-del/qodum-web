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
const FormCom = ({setIsViewOpened, casts, updateCast, setUpdateCast}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name: updateCast.name
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(RemarkValidation),
        defaultValues:{
            name:updateCast.id === '' ? '' : updateCast.name,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof RemarkValidation>) => {
        // Create remark
        if(updateCast.id === ''){
            if(casts.map((cast:any) => cast.name).includes(values.name)){
                toast({title:'Cast name already exists', variant:'error'});
                return;
            };
            await createCast({
                name:values.name
            });
            toast({title:'Added Successfully!'});
        }
        // Modify remark
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.name !== values.remark && casts.map((cast:any) => cast.name).includes(values.name)){
                toast({title:'Cast name is already exists', variant:'error'});
                return;
            };
            await modifyRemark({
                id:updateCast.id,
                name:values.name,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete remark
        else if(updateCast.isDeleteClicked){
            await deleteRemark({id:updateCast.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateCast({
            id:'',
            isDeleteClicked:false,
            name:''
        });
        // Reseting form
        form.reset({
            name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define TC Caste</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Cast Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Cast Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} casts={casts} updateCast={updateCast} setUpdateCast={setUpdateCast} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;