'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {ReligionValidation} from '@/lib/validations/admission/globalMasters/religion.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createReligion, deleteReligion, modifyReligion} from '@/lib/actions/admission/globalMasters/religion.actions';





// Main function
const FormCom = ({setIsViewOpened, religions, updateReligion, setUpdateReligion}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        religion_name:updateReligion.religion_name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(ReligionValidation),
        defaultValues:{
            religion_name:updateReligion.id === '' ? '' : updateReligion.religion_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof ReligionValidation>) => {
        // Create religion
        if(updateReligion.id === ''){
            if(religions.map((r:any) => r.religion_name).includes(values.religion_name)){
                toast({title:'Religion name already exists', variant:'error'});
                return;
            };
            const res = await createReligion({
                religion_name:values.religion_name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify religion
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.religion_name !== values.religion_name && religions.map((r:any) => r.religion_name).includes(values.religion_name)){
                toast({title:'Religion name already exists', variant:'error'});
                return;
            };
            await modifyReligion({
                id:updateReligion.id,
                religion_name:values.religion_name,
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete religion
        else if(updateReligion.isDeleteClicked){
            await deleteReligion({id:updateReligion.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateReligion({
            id:'',
            isDeleteClicked:false,
            religion_name:''
        });
        // Reseting form
        form.reset({
            religion_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Religion</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Religion Name */}
                    <FormField
                        control={form.control}
                        name='religion_name'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Religion Name</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} religions={religions} updateReligion={updateReligion} setUpdateReligion={setUpdateReligion} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;