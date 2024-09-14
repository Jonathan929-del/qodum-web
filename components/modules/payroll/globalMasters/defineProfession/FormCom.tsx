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
import {ProfessionValidation} from '@/lib/validations/payroll/globalMasters/preofession.validation';
import {createProfession, deleteProfession, modifyProfession} from '@/lib/actions/payroll/globalMasters/profession.actions';





// Main function
const FormCom = ({setIsViewOpened, professions, updateProfession, setUpdateProfession}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        profession:updateProfession.profession
    };


    // Form
    const form = useForm({
        resolver:zodResolver(ProfessionValidation),
        defaultValues:{
            profession:updateProfession.id === '' ? '' : updateProfession.profession
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof ProfessionValidation>) => {
        // Create profession
        if(updateProfession.id === ''){
            if(professions.map((r:any) => r.profession).includes(values.profession)){
                toast({title:'Profession already exists', variant:'error'});
                return;
            };
            const res = await createProfession({
                profession:values.profession
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify profession
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.profession !== values.profession && professions.map((r:any) => r.profession).includes(values.profession)){
                toast({title:'Profession already exists', variant:'error'});
                return;
            };
            await modifyProfession({
                id:updateProfession.id,
                profession:values.profession
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete profession
        else if(updateProfession.isDeleteClicked){
            await deleteProfession({id:updateProfession.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateProfession({
            id:'',
            isDeleteClicked:false,
            profession:''
        });
        // Reseting form
        form.reset({
            profession:''
        });
    };

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Profession</h2>
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
                        name='profession'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Profession</FormLabel>
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
                    <Buttons setIsViewOpened={setIsViewOpened} professions={professions} updateProfession={updateProfession} setUpdateProfession={setUpdateProfession} onSubmit={onSubmit} form={form}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;