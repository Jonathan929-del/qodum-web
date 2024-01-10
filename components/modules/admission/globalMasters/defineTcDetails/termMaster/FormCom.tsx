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
const FormCom = ({setIsViewOpened, termMasters, updateTermMaster, setUpdateTermMaster}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name:updateTermMaster.name
    };


    // Form
    const form:any = useForm({
        resolver:zodResolver(RemarkValidation),
        defaultValues:{
            name: updateTermMaster.id === '' ? '' : updateTermMaster.name,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof RemarkValidation>) => {
        // Create remark
        if(updateTermMaster.id === ''){
            if(termMasters.map((term:any) => term.name).includes(values.name)){
                toast({title:'Term Master name already exists', variant:'error'});
                return;
            };
            await createTermMaster({
                name:values.name
            });
            toast({title:'Added Successfully!'});
        }
        // Modify remark
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.name !== values.name && termMasters.map((term:any) => term.name).includes(values.name)){
                toast({title:'Term Master name is already exists', variant:'error'});
                return;
            };
            await modifyTermsMAster({
                id:updateTermMaster.id,
                name:values.name,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete remark
        else if(updateTermMaster.isDeleteClicked){
            await deleteRemark({id:updateTermMaster.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateTermMaster({
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
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Remark</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Term Master Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Term Master Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} termMasters={termMasters} updateTermMaster={updateTermMaster} setUpdateTermMaster={setUpdateTermMaster} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;