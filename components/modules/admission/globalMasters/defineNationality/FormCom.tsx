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
import { NationalityValidation } from '@/lib/validations/admission/globalMasters/nationality.validation';
import { createNationality, deleteNationality, modifyNationality } from '@/lib/actions/admission/globalMasters/nationality.actions';





// Main function
const FormCom = ({setIsViewOpened, nationalities, updateNationality, setUpdateNationality}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name:updateNationality.name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(NationalityValidation),
        defaultValues:{
            name:updateNationality.id === '' ? '' : updateNationality.name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof NationalityValidation>) => {
        // Create nationality
        if(updateNationality.id === ''){
            if(nationalities.map((r:any) => r.name).includes(values.name)){
                toast({title:'Nationality already exists', variant:'error'});
                return;
            };
            const res = await createNationality({
                name:values.name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify nationality
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.name !== values.name && nationalities.map((r:any) => r.name).includes(values.name)){
                toast({title:'Nationality already exists', variant:'error'});
                return;
            };
            await modifyNationality({
                id:updateNationality.id,
                name:values.name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete nationality
        else if(updateNationality.isDeleteClicked){
            await deleteNationality({id:updateNationality.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateNationality({
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
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Nationality</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} nationalities={nationalities} updateNationality={updateNationality} setUpdateNationality={setUpdateNationality} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;