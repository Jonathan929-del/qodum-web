'use client';
// Imports
import * as z from 'zod';
import {useState} from 'react';
import {format} from 'date-fns';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {CalendarIcon, ChevronDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {LateFeeValidation} from '@/lib/validations/fees/feeMaster/lateFeeSettings/lateFee.validation';
import {createLateFee, deleteLateFee, modifyLateFee} from '@/lib/actions/fees/feeMaster/lateFeeSettings/lateFee.actions';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';





// Main function
const FormCom = ({setIsViewOpened, lateFees, updateLateFee, setUpdateLateFee, groups, types, installments, lateFeeTypes}:any) => {


    // Toast
    const {toast} = useToast();


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Comparison object
    const comparisonObject = {
        fee_group:updateLateFee.fee_group,
        fee_type:updateLateFee.fee_type,
        installment:updateLateFee.installment,
        due_date:updateLateFee.due_date,
        late_fee_type:updateLateFee.late_fee_type,
        amount:updateLateFee.amount
    };

    // Form
    const form = useForm({
        resolver: zodResolver(LateFeeValidation),
        defaultValues: {
            fee_group:updateLateFee.id === '' ? '' : updateLateFee.fee_group,
            fee_type:updateLateFee.id === '' ? '' : updateLateFee.fee_type,
            installment:updateLateFee.id === '' ? '' : updateLateFee.installment,
            due_date:updateLateFee.id === '' ? new Date() : updateLateFee.due_date,
            late_fee_type:updateLateFee.id === '' ? '' : updateLateFee.late_fee_type,
            amount:updateLateFee.id === '' ? 0 : updateLateFee.amount
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof LateFeeValidation>) => {
        // Create late fee
        if(updateLateFee.id === ''){
            await createLateFee({
                fee_group:values.fee_group,
                fee_type:values.fee_type,
                installment:values.installment,
                due_date:values.due_date,
                late_fee_type:values.late_fee_type,
                amount:values.amount
            });
            toast({title:'Added Successfully!'});
        }
        // Modify late fee
        else if (!deepEqual(comparisonObject, values)) {
            await modifyLateFee({
                id:updateLateFee.id,
                fee_group:values.fee_group,
                fee_type:values.fee_type,
                installment:values.installment,
                due_date:values.due_date,
                late_fee_type:values.late_fee_type,
                amount:values.amount
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete late fee
        else if (updateLateFee.isDeleteClicked) {
            await deleteLateFee({id:updateLateFee.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateLateFee({
            id: '',
            isDeleteClicked:false,
            fee_group:'',
            fee_type:'',
            installment:'',
            due_date:new Date(),
            late_fee_type:'',
            amount:0

        });
        // Reseting form
        form.reset({
            fee_group:'',
            fee_type:'',
            installment:'',
            due_date:new Date(),
            late_fee_type:'',
            amount:0
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Late Fee Setting</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >


                    {/* Fee Group */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Fee Group</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='fee_group'
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
                                                    {groups.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No groups</p>
                                                    ) : !groups[0].name ? (
                                                        <LoadingIcon />
                                                    ) : groups.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Fee Type */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Fee Type</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='fee_type'
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
                                                    {types.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No types</p>
                                                    ) : !types[0].name ? (
                                                        <LoadingIcon />
                                                    ) : types.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Installment */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Installment</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='installment'
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
                                                    {installments.length < 1 ? (
                                                        <p className='text-xs text-hash-color'>No installments</p>
                                                    ) : !installments[0].name ? (
                                                        <LoadingIcon />
                                                    ) : installments.map((g:any) => (
                                                        <SelectItem value={g.name} key={g._id}>{g.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    {/* Due Date */}
                    <FormField
                        control={form?.control}
                        name='due_date'
                        render={() => (
                            <FormItem className='relative w-full h-7 pb-[8px] flex flex-col items-start justify-center mt-2 sm:mt-0 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto h-2 pr-2 text-end text-[11px] text-[#726E71] sm:basis-[30%]'>Due Date</FormLabel>
                                <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                                    <PopoverTrigger asChild className='h-7'>
                                        <Button
                                            variant='outline'
                                            className='flex flex-row items-center w-full h-7 text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:basis-[70%]'
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {
                                                form?.getValues()?.due_date
                                                        ? <span>{format(form?.getValues()?.due_date, 'PPP')}</span>
                                                        : <span>Pick a date</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={form?.getValues()?.due_date}
                                            onSelect={v => {setIsCalendarOpened(''); form?.setValue('due_date', v)}}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />


                    {/* Late Fee Type */}
                    <div className='w-full h-10 flex flex-col items-center sm:flex-row'>
                        <FormLabel className='w-full text-xs text-start pr-2 text-[#726E71] sm:basis-[30%] sm:text-end'>Late Fee Type</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[70%]'>
                            <FormField
                                control={form.control}
                                name='late_fee_type'
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
                                                    {lateFeeTypes.map((t:any) => (
                                                        <SelectItem value={t} key={t}>{t}</SelectItem>
                                                    ))}
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
                        name='amount'
                        render={({ field }) => (
                            <FormItem className='w-full mt-4 sm:mt-0'>
                                <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Amount</FormLabel>
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



                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} lateFees={lateFees} updateLateFee={updateLateFee} setUpdateLateFee={setUpdateLateFee} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;