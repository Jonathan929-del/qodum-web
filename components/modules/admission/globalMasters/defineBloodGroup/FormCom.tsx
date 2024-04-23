'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {BloodGroupValidation} from '@/lib/validations/admission/globalMasters/bloodGroup.validation';
import {createBloodGroup, deleteBloodGroup, modifyBloodGroup} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';





// Main function
const FormCom = ({setIsViewOpened, bloodGroups, updateBloodGroup, setUpdateBloodGroup}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        blood_group:updateBloodGroup.blood_group
    };


    // Form
    const form = useForm({
        resolver:zodResolver(BloodGroupValidation),
        defaultValues:{
            blood_group:updateBloodGroup.id === '' ? '' : updateBloodGroup.blood_group
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof BloodGroupValidation>) => {
        // Create blood group
        if(updateBloodGroup.id === ''){
            if(bloodGroups.map((r:any) => r.blood_group).includes(values.blood_group)){
                toast({title:'Blood group already exists', variant:'error'});
                return;
            };
            await createBloodGroup({
                blood_group:values.blood_group
            });
            toast({title:'Added Successfully!'});
        }
        // Modify blood group
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.blood_group !== values.blood_group && bloodGroups.map((r:any) => r.blood_group).includes(values.blood_group)){
                toast({title:'Blood group already exists', variant:'error'});
                return;
            };
            await modifyBloodGroup({
                id:updateBloodGroup.id,
                blood_group:values.blood_group
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete blood group
        else if(updateBloodGroup.isDeleteClicked){
            await deleteBloodGroup({id:updateBloodGroup.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateBloodGroup({
            id:'',
            isDeleteClicked:false,
            blood_group:''
        });
        // Reseting form
        form.reset({
            blood_group:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Blood Group</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Blood Group */}
                    <FormField
                        control={form.control}
                        name='blood_group'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Blood Group</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} bloodGroups={bloodGroups} updateBloodGroup={updateBloodGroup} setUpdateBloodGroup={setUpdateBloodGroup} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;