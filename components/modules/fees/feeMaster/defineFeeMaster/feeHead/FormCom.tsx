'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {HeadValidation} from '@/lib/validations/fees/feeMaster/feeMaster/head.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createHead, deleteHead, modifyHead} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';





// Main function
const FormCom = ({ setIsViewOpened, heads, updateHead, setUpdateHead }: any) => {


    // Toast
    const { toast } = useToast();


    // Comparison object
    const comparisonObject = {
        name: updateHead.name,
        print_name: updateHead.print_name,
        pay_schedule: updateHead.pay_schedule,
        priority_no: updateHead.priority_no,
        type: updateHead.type,
        show_in_certificate: updateHead.show_in_certificate,
        fee_refundable: updateHead.fee_refundable
    };

    // Form
    const form: any = useForm({
        resolver: zodResolver(HeadValidation),
        defaultValues: {
            name: updateHead.id === '' ? '' : updateHead.name,
            print_name: updateHead.id === '' ? '' : updateHead.print_name,
            pay_schedule: updateHead.id === '' ? '' : updateHead.pay_schedule,
            priority_no: updateHead.id === '' ? '' : updateHead.priority_no,
            type: updateHead.id === '' ? '' : updateHead.type,
            show_in_certificate: updateHead.id === '' ? false : updateHead.show_in_certificate,
            fee_refundable: updateHead.id === '' ? false : updateHead.fee_refundable

        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof HeadValidation>) => {
        // Create head
        if (updateHead.id === '') {
            if (heads.map((head: any) => head.name).includes(values.name)) {
                toast({ title: 'Head name already exists', variant: 'error' });
                return;
            };
            const res = await createHead({
                name: values.name,
                print_name: values.print_name,
                pay_schedule: values.pay_schedule,
                priority_no: values.priority_no,
                type: values.type,
                show_in_certificate: values.show_in_certificate,
                fee_refundable: values.fee_refundable
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({ title: 'Added Successfully!' });
        }

        // Modify head
        else if (!deepEqual(comparisonObject, values)) {
            if (comparisonObject.name !== values.name && heads.map((head: any) => head.name).includes(values.name)) {
                toast({ title: 'Head name already exists', variant: 'error' });
                return;
            };
            await modifyHead({
                id: updateHead.id,
                previous_name:updateHead.name,
                name: values.name,
                print_name: values.print_name,
                pay_schedule: values.pay_schedule,
                priority_no: values.priority_no,
                type: values.type,
                show_in_certificate: values.show_in_certificate,
                fee_refundable: values.fee_refundable
            });
            toast({ title: 'Updated Successfully!' });
        }
        // Delete head
        else if (updateHead.isDeleteClicked) {
            await deleteHead({ id: updateHead.id });
            toast({ title: 'Deleted Successfully!' });
        };


        // Reseting update entity
        setUpdateHead({
            id: '',
            name: '',
            print_name: '',
            pay_schedule: '',
            priority_no: '',
            type: '',
            show_in_certificate: false,
            fee_refundable: false

        });
        // Reseting form
        form.reset({
            name: '',
            print_name: '',
            pay_schedule: '',
            priority_no: '',
            type: '',
            show_in_certificate: false,
            fee_refundable: false
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Fee Head</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >



                    {/* Head Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Head Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Head Print Name */}
                    <FormField
                        control={form.control}
                        name='print_name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Head Print Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Head Pay Schedule */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Pay Schedule</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='pay_schedule'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='annual'>Annual</SelectItem>
                                                    <SelectItem value='installment'>Installment</SelectItem>
                                                    <SelectItem value='lifetime'>LifeTime</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Head Priority Number */}
                    <FormField
                        control={form.control}
                        name='priority_no'
                        render={({ field }) => (
                            <FormItem className='w-full mt-4 sm:mt-0'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Priority Nmber</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                            />
                                        </FormControl>
                                        <FormMessage className='mt-[-20px] text-xs' />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Head Type  */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Type</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Please Select' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='cheque_bounce'>Cheque Bounce</SelectItem>
                                                    <SelectItem value='discount'>Discount</SelectItem>
                                                    <SelectItem value='fine'>Fine</SelectItem>
                                                    <SelectItem value='opn_bal'>Opn Bal</SelectItem>
                                                    <SelectItem value='opn_dues'>Opn Dues</SelectItem>
                                                    <SelectItem value='regular'>Regular</SelectItem>
                                                    <SelectItem value='transport'>Transport</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <div className="flex gap-1 w-full">
                        {/* Show In Certificate */}
                        <FormField
                            control={form.control}
                            name='show_in_certificate'
                            render={({ field }) => (
                                <FormItem className='w-full flex-1 pt-4 flex  flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='w-full flex-1 flex items-center justify-between space-x-2'>
                                                <Label
                                                    htmlFor='is_default'
                                                    className='text-xs text-[#726E71] text-end flex-1 pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Show In Certificate
                                                </Label>
                                                <Switch
                                                    id='show_in_certificate'
                                                    {...field}
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                />
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />


                        {/*  Fee Refundable */}
                        <FormField
                            control={form.control}
                            name='fee_refundable'
                            render={({ field }) => (
                                <FormItem className='w-full flex-1 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='w-full flex-1 flex items-center justify-between space-x-2'>
                                                <Label
                                                    htmlFor='is_default'
                                                    className='text-xs text-[#726E71] text-end pr-2 flex-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Fee Refundable
                                                </Label>
                                                <Switch
                                                    id='fee_refundable'
                                                    {...field}
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                />
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />
                    </div>



                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} heads={heads} updateHead={updateHead} setUpdateHead={setUpdateHead} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;