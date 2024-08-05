'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {ClubValidation} from '@/lib/validations/admission/globalMasters/club.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createClub, deleteClub, modifyClub} from '@/lib/actions/admission/globalMasters/club.actions';





// Main function
const FormCom = ({setIsViewOpened, clubs, updateClub, setUpdateClub}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        name:updateClub.name
    };


    // Form
    const form = useForm({
        resolver:zodResolver(ClubValidation),
        defaultValues:{
            name:updateClub.id === '' ? '' : updateClub.name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof ClubValidation>) => {
        // Create club
        if(updateClub.id === ''){
            if(clubs.map((r:any) => r.name).includes(values.name)){
                toast({title:'Club already exists', variant:'error'});
                return;
            };
            const res = await createClub({
                name:values.name
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify club
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.name !== values.name && clubs.map((r:any) => r.name).includes(values.name)){
                toast({title:'Club already exists', variant:'error'});
                return;
            };
            await modifyClub({
                id:updateClub.id,
                name:values.name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete club
        else if(updateClub.isDeleteClicked){
            await deleteClub({id:updateClub.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateClub({
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
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Club</h2>
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
                    <Buttons setIsViewOpened={setIsViewOpened} clubs={clubs} updateClub={updateClub} setUpdateClub={setUpdateClub} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;