'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CadetTypeValidation} from '@/lib/validations/admission/globalMasters/cadetType.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createCadetType, deleteCadetType, modifyCadetType} from '@/lib/actions/admission/globalMasters/cadetType.actions';





// Main function
const FormCom = ({setIsViewOpened, cadetTypes, updateCadetType, setUpdateCadetType}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name:updateCadetType.name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(CadetTypeValidation),
        defaultValues:{
            name:updateCadetType.id === '' ? '' : updateCadetType.name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof CadetTypeValidation>) => {
        // Create cadet type
        if(updateCadetType.id === ''){
            if(cadetTypes.map((r:any) => r.name).includes(values.name)){
                toast({title:'Cadet type already exists', variant:'error'});
                return;
            };
            const res = await createCadetType({
                name:values.name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify cadet type
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.name !== values.name && cadetTypes.map((r:any) => r.name).includes(values.name)){
                toast({title:'Cadet type already exists', variant:'error'});
                return;
            };
            await modifyCadetType({
                id:updateCadetType.id,
                name:values.name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete cadet type
        else if(updateCadetType.isDeleteClicked){
            await deleteCadetType({id:updateCadetType.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateCadetType({
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
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Cadet Type</h2>
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
                    <Buttons setIsViewOpened={setIsViewOpened} cadetTypes={cadetTypes} updateCadetType={updateCadetType} setUpdateCadetType={setUpdateCadetType} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;