'use client';
// Imports
import * as z from 'zod';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {FeeEntrySettingOthersValidation} from '@/lib/validations/fees/masterSettings/feeEntrySettingOthers.validation';






// Main function
const FormCom = () => {

    // Toast
    const {toast} = useToast();


    // Paymodes
    const [paymodes, setPaymodes] = useState(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);


    // Entry modes
    const entryModes = ['School', 'Bank', 'Online'];


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntrySettingOthersValidation),
        defaultValues:{
            // Page 1
            concession:'',
            fee_entry_mode_used:localStorage.getItem('fee_entry_mode_used') ? localStorage.getItem('fee_entry_mode_used') : '',
            fee_pay_mode_used:localStorage.getItem('fee_pay_mode_used') ? localStorage.getItem('fee_pay_mode_used') : '',
            cheque_bounce_fine:'',
            waive_off:false,
            waive_off_option:false,
            waive_off_with_reason:false,
            waive_off_with_cheque_bounce:false,
            late_fine:false,
            installment_type:'',
            manual_cheque_bounce:false,
            calculate_late_fine:false,
            run_time_concession:false,
            ask_reason:false,

            // Page 2
            advance_amount_adjustment:false,
            advance_receipt_acceptance:false,
            discount:false,
            reuse_fee_receipt_no:false,
            print_fee_receipt_after_save:localStorage.getItem('print_fee_receipt_after_save') ? localStorage.getItem('print_fee_receipt_after_save') === 'true' : false,
            modify_cheque_details:false,
            sms_after_fee_entry:false,
            payment_from_mid_year:false,
            reference_no:false,
            micr_no:false,
            mandate_micr_no:false,
            tc_no_book_no_wise:false,
            allow_deposit_bank:false,
            date_of_amount_credit_in_bank:false,
            mandate_date_of_amount_credit_in_bank:false,

            // Page 3
            back_date_receipt_entry:false,
            back_date_receipt_entry_type:'',
            allow_no_of_back_date:'',
            future_date_receipt_entry:false,
            future_date_receipt_entry_type:'',
            enable_vat:false,
            default_selection_of_deposit_bank:false,
            enable_evening_transport:false,
            disable_caceled_receipt_in_report:false,
            transport_modification_after_receiving_fee:false,
            enable_to_take_fee_for_all_sibling:false,
            enable_auto_checked_to_add_sibling:false,
            allow_the_user_to_check_installment_in_sequence:false,
            enable_sponsor:false,
            enable_inactive_student_show:false
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntrySettingOthersValidation>) => {
        try {

            // Setting local storage
            if(values.print_fee_receipt_after_save){
                localStorage.setItem('print_fee_receipt_after_save', JSON.stringify(values.print_fee_receipt_after_save));
            };
            if(values.fee_pay_mode_used){
                localStorage.setItem('fee_pay_mode_used', values.fee_pay_mode_used);
            };
            if(values.fee_entry_mode_used){
                localStorage.setItem('fee_entry_mode_used', values.fee_entry_mode_used);
            };
            toast({title:'Saved Successfully'});

            // Reseting form
            form.reset({
                // Page 1
                concession:'',
                fee_entry_mode_used:values.fee_entry_mode_used,
                fee_pay_mode_used:values.fee_pay_mode_used,
                cheque_bounce_fine:'',
                waive_off:false,
                waive_off_option:false,
                waive_off_with_reason:false,
                waive_off_with_cheque_bounce:false,
                late_fine:false,
                installment_type:'',
                manual_cheque_bounce:false,
                calculate_late_fine:false,
                run_time_concession:false,
                ask_reason:false,

                // Page 2
                advance_amount_adjustment:false,
                advance_receipt_acceptance:false,
                discount:false,
                reuse_fee_receipt_no:false,
                print_fee_receipt_after_save:values.print_fee_receipt_after_save,
                modify_cheque_details:false,
                sms_after_fee_entry:false,
                payment_from_mid_year:false,
                reference_no:false,
                micr_no:false,
                mandate_micr_no:false,
                tc_no_book_no_wise:false,
                allow_deposit_bank:false,
                date_of_amount_credit_in_bank:false,
                mandate_date_of_amount_credit_in_bank:false,

                // Page 3
                back_date_receipt_entry:false,
                back_date_receipt_entry_type:'',
                allow_no_of_back_date:'',
                future_date_receipt_entry:false,
                future_date_receipt_entry_type:'',
                enable_vat:false,
                default_selection_of_deposit_bank:false,
                enable_evening_transport:false,
                disable_caceled_receipt_in_report:false,
                transport_modification_after_receiving_fee:false,
                enable_to_take_fee_for_all_sibling:false,
                enable_auto_checked_to_add_sibling:false,
                allow_the_user_to_check_installment_in_sequence:false,
                enable_sponsor:false,
                enable_inactive_student_show:false
            });

        } catch (err:any) {
            console.log(err.message);
        }
    };

    // Dropdowns
    const dropdowns = (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-4'>

                {/* Concession */}
                <div className='flex-1 flex flex-col'>
                    <p className='text-xs'>Concession on full payment</p>
                    <FormField
                        control={form.control}
                        name='concession'
                        render={({field}) => (
                            <FormItem className=''>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value=''
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                            <SelectValue placeholder='10% concession'/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </div>


                {/* Default Fee Entry Mode Used */}
                <div className='flex-1 flex flex-col'>
                    <p className='text-xs'>Default Fee Entry Mode Used</p>
                    <FormField
                        control={form.control}
                        name='fee_entry_mode_used'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                            <SelectValue placeholder='Please Select'/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {entryModes.map((m:any) => (
                                                <SelectItem value={m} key={m}>{m}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </div>


                {/* Default Fee Pay Mode Used */}
                <div className='flex-1 flex flex-col'>
                    <p className='text-xs'>Default Fee Pay Mode Used</p>
                    <FormField
                        control={form.control}
                        name='fee_pay_mode_used'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                            <SelectValue placeholder='Please Select'/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {paymodes.map((m:any) => (
                                                <SelectItem value={m} key={m}>{m}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </div>


                {/* Cheque Bounce Fine */}
                <div className='flex-1 flex flex-col'>
                    <p className='text-xs'>Cheque Bounce Fine</p>
                    <FormField
                        control={form.control}
                        name='cheque_bounce_fine'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='50.00'
                                        className='h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </div>


            </div>
            <p className='mt-2 text-hash_color text-xs'>*These settings show/hide the following options from the fee entry form to avoid getting the form clustered and to hide the settings for the schools which are not of their use. Moreover, these settings can be changed anytime depending upon the requirements of the schools.</p>
        </div>
    );


    // Page one
    const pageOne = (
        <>
            {/* Row One */}
            <div className='flex justify-between gap-10'>
                {/* Waive off checkbox */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Waive off checkbox</p>
                        <p className='text-xs text-hash-color'>Allows the user to show the chekbox of waive off on fee entry form. So that, the late fine can be waived off from the student</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='waive_off'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Waive off option auto check */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Waive off option auto check</p>
                        <p className='text-xs text-hash-color'>Allows the user to automatically waive off fine for every entry for a particular installment(s) for a particular student</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='waive_off_option'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Waive off with reason */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Waive off with reason</p>
                        <p className='text-xs text-hash-color'>Allows the user to enter the reason at the time of waiving off the fine for a particular installment(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='waive_off_with_reason'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>



            {/* Row Two */}
            <div className='mt-2 flex flex-row justify-between gap-10'>
                {/* Waive off with cheque bounce */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Waive off with cheque bounce</p>
                        <p className='text-xs text-hash-color'>Allows the user to enter the reason at the time of waiving off the fine for a particular installment(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='waive_off_with_cheque_bounce'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='basis-[33.3%] flex flex-col max-w-[500px]'>
                    {/* Manual late fine */}
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <p className='text-sm font-bold'>Manual late fine</p>
                            <p className='text-xs text-hash-color'>Allows the user to take the manual late fine for a particular installment(s). Manual late fine cancels the assigned late fine if any for that installment(s)</p>
                        </div>
                        <FormField
                            control={form.control}
                            name='late_fine'
                            render={({field}) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Switch
                                                {...field}
                                                value=''
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='installment_type'
                        render={({field}) => (
                            <FormItem className='mt-2'>
                                <FormControl>
                                    <RadioGroup
                                        // {...field}
                                        className='flex flex-row'
                                        defaultValue='all-installments'
                                    >
                                        <div className='flex items-center space-x-[2px]'>
                                            <RadioGroupItem value='all-installments' id='all-installments'/>
                                            <Label htmlFor='all-installments' className='text-xs'>All Installments</Label>
                                        </div>
                                        <div className='flex items-center space-x-[2px]'>
                                            <RadioGroupItem value='first-installment' id='first-installment'/>
                                            <Label htmlFor='first-installment' className='text-xs'>First Installment</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Manual cheque bounce */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Manual cheque bounce</p>
                        <p className='text-xs text-hash-color'>Allows the user to take the manual check bounce amount for a particular installment(s). This option cancels the assigned amount if any for cheque bounce</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='manual_cheque_bounce'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>



            {/* Row Three */}
            <div className='mt-2 flex flex-row justify-between gap-10'>
                {/* Calculate late fine on cheque date */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Calculate late fine on cheque date</p>
                        <p className='text-xs text-hash-color'>Allows the user to calculate late fine on cheque date</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='calculate_late_fine'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Run time concession */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Run time concession</p>
                        <p className='text-xs text-hash-color'>Allows the user to give the run time concession to the student for a particular installment(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='run_time_concession'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Ask reason on run time concession */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Ask reason on run time concession</p>
                        <p className='text-xs text-hash-color'>Allows the user to enter the reason at the time of run time concession to be given for a particular installment(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='ask_reason'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );


    // Page two
    const pageTwo = (
        <>
            {/* Row One */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Advance amount adjustment */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Advance amount adjustment</p>
                        <p className='text-xs text-hash-color'>Allows the user to adjust advance amount for a particular receipt report(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='advance_amount_adjustment'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Advance receipt acceptance */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Advance receipt acceptance</p>
                        <p className='text-xs text-hash-color'>Allows the user to receive advance amount for paid installment. This is only applicable when the installment amount is alreay taken</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='advance_receipt_acceptance'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Discount */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Discount</p>
                        <p className='text-xs text-hash-color'>Allows the user to give the discount on fee of a particular installment(s) to a particular student. Discount is always given on the total amount of an installment(s). It's completely different from concession.</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='discount'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Two */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Refuse fee receipt number */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Refuse fee receipt number</p>
                        <p className='text-xs text-hash-color'>Allows the user to refuse cancelled fee receipt for a particular student of a particular installment(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='reuse_fee_receipt_no'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Print fee receipt after save */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Print fee receipt after save</p>
                        <p className='text-xs text-hash-color'>Allows the user to automatically print the fee receipt after entry is done and saved</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='print_fee_receipt_after_save'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Modify cheque details */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Modify cheque details</p>
                        <p className='text-xs text-hash-color'>Allows the user to modify cheque details after fee received</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='modify_cheque_details'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Three */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* SMS after fee entry */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>SMS after fee entry</p>
                        <p className='text-xs text-hash-color'>Allows the user to send the fee deposit sms to the parent after fee entry is done</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='sms_after_fee_entry'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Payment from mid year */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Payment from mid year</p>
                        <p className='text-xs text-hash-color'>Allows the user to re-structure student's fee structure from the installment school wishes to do</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='payment_from_mid_year'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Reference Number */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Reference Number</p>
                        <p className='text-xs text-hash-color'>Allows the user to enter the reference number at the time of fee entry in case of exception so the user can see it in the report(s)</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='reference_no'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Four */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* MICR Number */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>MICR Number</p>
                        <p className='text-xs text-hash-color'>Allows the user to show the MICR number on fee entry form when the paymode is cheque</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='micr_no'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Mandate MICR Number */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Mandate MICR Number</p>
                        <p className='text-xs text-hash-color'>Allows the user to make the MICR number as a mandatory field</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='mandate_micr_no'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* TC Number Book No. Wise */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>TC Number Book No. Wise</p>
                        <p className='text-xs text-hash-color'>Allows the user to generate seperate TC number for different book number</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='tc_no_book_no_wise'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Five */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Allow deposit bank */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Allow deposit bank</p>
                        <p className='text-xs text-hash-color'>Allows the user to select deposit bank in fees entry form</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='allow_deposit_bank'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Date of amount credit in bank */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Date of amount credit in bank</p>
                        <p className='text-xs text-hash-color'>Allows the user to enable the bank date option on fee entry form. This option shows the date on which the amount is credited in the bank</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='date_of_amount_credit_in_bank'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Mandate date of amount credit in bank */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Mandate date of amount credit in bank</p>
                        <p className='text-xs text-hash-color'>Allows the user to make the date of amount credit in bank as a mandatory field</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='mandate_date_of_amount_credit_in_bank'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );


    // Page three
    const pageThree = (
        <>
            {/* Row One */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                <div className='basis-[33.3%] flex flex-col max-w-[500px]'>
                    {/* Back date receipt entry */}
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <p className='text-sm font-bold'>Back date receipt entry</p>
                            <p className='text-xs text-hash-color'>Prevents user from selecting the back date from the current date</p>
                        </div>
                        <FormField
                            control={form.control}
                            name='back_date_receipt_entry'
                            render={({field}) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Switch
                                                {...field}
                                                value=''
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row justify-between'>
                        {/* Back date receipt entry type */}
                        <FormField
                            control={form.control}
                            name='back_date_receipt_entry_type'
                            render={({field}) => (
                                <FormItem className='mt-2'>
                                    <FormControl>
                                        <RadioGroup
                                            // {...field}
                                            defaultValue='school'
                                        >
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='school' id='school'/>
                                                <Label htmlFor='school' className='text-xs'>School</Label>
                                            </div>
                                            <div className='flex items-center space-x-[2px]'>
                                                <RadioGroupItem value='bank' id='bank'/>
                                                <Label htmlFor='bank' className='text-xs'>Bank</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* Allow no. of back date */}
                        <FormField
                            control={form.control}
                            name='allow_no_of_back_date'
                            render={({field}) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='text-xs text-[#726E71]'>Allow no. of back date</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className='flex flex-col basis-[33.3%] max-w-[500px]'>
                    {/* Future date receipt entry */}
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <p className='text-sm font-bold'>Future date receipt entry</p>
                            <p className='text-xs text-hash-color'>Prevents user from selecting next date from current date</p>
                        </div>
                        <FormField
                            control={form.control}
                            name='future_date_receipt_entry'
                            render={({field}) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <FormControl>
                                        <div className='flex-1 flex items-center justify-end space-x-2'>
                                            <Switch
                                                {...field}
                                                value=''
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Back date receipt entry type */}
                    <FormField
                        control={form.control}
                        name='future_date_receipt_entry_type'
                        render={({field}) => (
                            <FormItem className='mt-2'>
                                <FormControl>
                                    <RadioGroup
                                        // {...field}
                                        defaultValue='school'
                                    >
                                        <div className='flex items-center space-x-[2px]'>
                                            <RadioGroupItem value='school' id='school'/>
                                            <Label htmlFor='school' className='text-xs'>School</Label>
                                        </div>
                                        <div className='flex items-center space-x-[2px]'>
                                            <RadioGroupItem value='bank' id='bank'/>
                                            <Label htmlFor='bank' className='text-xs'>Bank</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enable VAT/GST */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enable VAT/GST</p>
                        <p className='text-xs text-hash-color'>Allows the user to take VAT/GST on heads</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_vat'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Two */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Default selection of deposit bank */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Default selection of deposit bank</p>
                        <p className='text-xs text-hash-color'>Deposit bank selected from fee group head relation while searching student</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='default_selection_of_deposit_bank'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enabke evening transport */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enabke evening transport</p>
                        <p className='text-xs text-hash-color'>Allows the user to assign transport seperate from morning and evening both</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_evening_transport'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Disable canceled receipt in report */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Disable canceled receipt in report</p>
                        <p className='text-xs text-hash-color'>Allows the user to not show canceled canceled receipt in collection report</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='disable_caceled_receipt_in_report'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Three */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Transport modification after receiving fee */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Transport modification after receiving fee</p>
                        <p className='text-xs text-hash-color'>Allows the user to modify transport fee stop route and others after fee received</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='transport_modification_after_receiving_fee'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enable to take fee for all sibling */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enable to take fee for all sibling</p>
                        <p className='text-xs text-hash-color'>Allows the user to take fee for all sibling</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_to_take_fee_for_all_sibling'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enable auto checked to add sibling */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enable auto checked to add sibling</p>
                        <p className='text-xs text-hash-color'>Allows the user to include all sibling while search student</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_auto_checked_to_add_sibling'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            {/* Row Four */}
            <div className='flex flex-row justify-between mt-2 gap-10'>
                {/* Allow the user to show installment in sequence */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Allow the user to show installment in sequence</p>
                        <p className='text-xs text-hash-color'>Allow the user to show installment in sequence while receiving fee</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='allow_the_user_to_check_installment_in_sequence'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enable Sponsor */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enable Sponsor</p>
                        <p className='text-xs text-hash-color'>Allow the user to select sponsor while receiving fee</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_sponsor'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Enable inactive student show */}
                <div className='basis-[33.3%] flex flex-row max-w-[500px]'>
                    <div className='flex flex-col'>
                        <p className='text-sm font-bold'>Enable inactive student show</p>
                        <p className='text-xs text-hash-color'>Allow the user to show inactive student on fee entry page</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='enable_inactive_student_show'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Switch
                                            {...field}
                                            value=''
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );


    // Use effect
    useEffect(() => {
        if(form.getValues().fee_entry_mode_used === 'School' || form.getValues().fee_entry_mode_used === 'Bank'){
            setPaymodes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card', 'UPI']);
            form.setValue('fee_pay_mode_used', 'Cash');
        }else{
            setPaymodes(['Payment Gateway', 'Net Banking', 'Debit Card', 'Credit Card']);
            form.setValue('fee_pay_mode_used', 'Payment Gateway');
        };
    }, [form.watch('fee_entry_mode_used')]);

    return (
        <div className='w-[90%] h-[90%] max-w-[1100px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='h-full relative w-full flex flex-col py-4 items-center px-2 sm:px-4'
                >


                    <div className='flex flex-col h-full overflow-y-scroll custom-sidebar-scrollbar'>
                        {dropdowns}
                        <div className='flex flex-col mt-4'>
                            <h2 className='w-full mb-8 text-center text-xl font-bold underline'>Enable/Disable Options On Fees Entry Form</h2>
                            {pageOne}
                            {pageTwo}
                            {pageThree}
                        </div>
                    </div>


                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 mt-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;