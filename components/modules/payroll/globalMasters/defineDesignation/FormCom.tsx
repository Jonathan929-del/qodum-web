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
import {DesignationValidation} from '@/lib/validations/payroll/globalMasters/designation.validation';
import {createDesignation, deleteDesignation, modifyDesignation} from '@/lib/actions/payroll/globalMasters/designation.actions';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';





// Main function
const FormCom = ({setIsViewOpened, designations, updateDesignation, setUpdateDesignation}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        designation:updateDesignation.designation,
        show_in_payroll:updateDesignation.show_in_payroll
    };


    // Form
    const form = useForm({
        resolver:zodResolver(DesignationValidation),
        defaultValues:{
            designation:updateDesignation.id === '' ? '' : updateDesignation.designation,
            show_in_payroll:updateDesignation.id === '' ? false : updateDesignation.show_in_payroll,
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof DesignationValidation>) => {
        // Create designation
        if(updateDesignation.id === ''){
            if(designations.map((r:any) => r.designation).includes(values.designation)){
                toast({title:'Designation already exists', variant:'error'});
                return;
            };
            const res = await createDesignation({
                designation:values.designation,
                show_in_payroll:values.show_in_payroll
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify designation
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.designation !== values.designation && designations.map((r:any) => r.designation).includes(values.designation)){
                toast({title:'Designation already exists', variant:'error'});
                return;
            };
            await modifyDesignation({
                id:updateDesignation.id,
                designation:values.designation,
                show_in_payroll:values.show_in_payroll
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete designation
        else if(updateDesignation.isDeleteClicked){
            await deleteDesignation({id:updateDesignation.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateDesignation({
            id:'',
            isDeleteClicked:false,
            designation:'',
            show_in_payroll:false,
        });
        // Reseting form
        form.reset({
            designation:'',
            show_in_payroll:false
        });
    };

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Designation</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >

                    {/* Designation */}
                    <FormField
                        control={form.control}
                        name='designation'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Designation</FormLabel>
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


                    {/* Is Active */}
                    <FormField
                        control={form.control}
                        name='show_in_payroll'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='show_in_payroll'
                                            {...field}
                                            value={field.value}
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='show_in_payroll'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Show In Payroll
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} designations={designations} updateDesignation={updateDesignation} setUpdateDesignation={setUpdateDesignation} onSubmit={onSubmit} form={form}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;