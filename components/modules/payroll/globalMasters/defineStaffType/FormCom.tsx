'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {StaffTypeValidation} from '@/lib/validations/payroll/globalMasters/staffType.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createStaffType, deleteStaffType, modifyStaffType} from '@/lib/actions/payroll/globalMasters/staffType.actions';





// Main function
const FormCom = ({setIsViewOpened, staffTypes, updateStaffType, setUpdateStaffType}:any) => {

    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        staff_type:updateStaffType.staff_type,
        is_hourly_paid:updateStaffType.is_hourly_paid,
        show_on_ecare:updateStaffType.show_on_ecare
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StaffTypeValidation),
        defaultValues:{
            staff_type:updateStaffType.id === '' ? '' : updateStaffType.staff_type,
            is_hourly_paid:updateStaffType.id === '' ? false : updateStaffType.is_hourly_paid,
            show_on_ecare:updateStaffType.id === '' ? false : updateStaffType.show_on_ecare
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StaffTypeValidation>) => {
        // Create staff type
        if(updateStaffType.id === ''){
            if(staffTypes.map((r:any) => r.staff_type).includes(values.staff_type)){
                toast({title:'Staff type already exists', variant:'error'});
                return;
            };
            const res = await createStaffType({
                staff_type:values.staff_type,
                is_hourly_paid:values.is_hourly_paid,
                show_on_ecare:values.show_on_ecare
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify staff type
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.staff_type !== values.staff_type && staffTypes.map((r:any) => r.staff_type).includes(values.staff_type)){
                toast({title:'Staff type already exists', variant:'error'});
                return;
            };
            await modifyStaffType({
                id:updateStaffType.id,
                staff_type:values.staff_type,
                is_hourly_paid:values.is_hourly_paid,
                show_on_ecare:values.show_on_ecare
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete staff type
        else if(updateStaffType.isDeleteClicked){
            await deleteStaffType({id:updateStaffType.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateStaffType({
            id:'',
            isDeleteClicked:false,
            staff_type:'',
            is_hourly_paid:false,
            show_on_ecare:false
        });
        // Reseting form
        form.reset({
            staff_type:'',
            is_hourly_paid:false,
            show_on_ecare:false
        });
    };

    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Staff Type</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >

                    {/* Staff Type */}
                    <FormField
                        control={form.control}
                        name='staff_type'
                        render={({field}) => (
                            <FormItem className='w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Staff Type</FormLabel>
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


                    {/* Is Hourly Paid */}
                    <FormField
                        control={form.control}
                        name='is_hourly_paid'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='is_hourly_paid'
                                            {...field}
                                            value={field.value}
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='is_hourly_paid'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Is Hourly Paid
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Show On Ecare */}
                    <FormField
                        control={form.control}
                        name='show_on_ecare'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-start space-x-2'>
                                        <Switch
                                            id='show_on_ecare'
                                            {...field}
                                            value={field.value}
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                        <Label
                                            htmlFor='show_on_ecare'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Show On Ecare
                                        </Label>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} staffTypes={staffTypes} updateStaffType={updateStaffType} setUpdateStaffType={setUpdateStaffType} onSubmit={onSubmit} form={form}/>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;