'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CasteValidation} from '@/lib/validations/admission/globalMasters/caste.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createCaste, deleteCaste, modifyCaste} from '@/lib/actions/admission/globalMasters/caste.actions';





// Main function
const FormCom = ({setIsViewOpened, castes, updateCaste, setUpdateCaste}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        caste_name:updateCaste.caste_name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(CasteValidation),
        defaultValues:{
            caste_name:updateCaste.id === '' ? '' : updateCaste.caste_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof CasteValidation>) => {
        // Create caste
        if(updateCaste.id === ''){
            if(castes.map((r:any) => r.caste_name).includes(values.caste_name)){
                toast({title:'Caste name already exists', variant:'error'});
                return;
            };
            const res = await createCaste({
                caste_name:values.caste_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify caste
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.caste_name !== values.caste_name && castes.map((r:any) => r.caste_name).includes(values.caste_name)){
                toast({title:'Caste name already exists', variant:'error'});
                return;
            };
            await modifyCaste({
                id:updateCaste.id,
                caste_name:values.caste_name,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete caste
        else if(updateCaste.isDeleteClicked){
            await deleteCaste({id:updateCaste.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateCaste({
            id:'',
            isDeleteClicked:false,
            caste_name:''
        });
        // Reseting form
        form.reset({
            caste_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Caste</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Caste Name */}
                    <FormField
                        control={form.control}
                        name='caste_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Caste Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} castes={castes} updateCaste={updateCaste} setUpdateCaste={setUpdateCaste} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;