'use client';
// Imports
import * as z from 'zod';
import {format} from 'date-fns';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {ChevronDown, Calendar as CalendarIcon} from 'lucide-react';
import Buttons from '@/components/modules/accounts/accounts/bankLedger/Buttons';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import { BankLedgerValidation } from '@/lib/validations/accounts/accounts/bankLedger.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createBankLedger, deleteBankLedger, modifyBankLedger} from '@/lib/actions/accounts/accounts/bankLedger.actions';





// Main function
const FormCom = ({setIsViewOpened, bankLedgers, updateBankLedger, setUpdateBankLedger, accountGroups}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState(false);


    // Toast
    const {toast} = useToast();


    // Account type
    const [accountType, setAccountType] = useState('');

    
    // Comparison object
    const comparisonObject = {
        account_name:updateBankLedger.account_name,
        group:updateBankLedger.group,
        account_type:updateBankLedger.account_type,
        account_address:updateBankLedger.account_address,
        account_city:updateBankLedger.account_city,
        pin_code:updateBankLedger.pin_code,
        email:updateBankLedger.email,
        mobile:updateBankLedger.mobile,
        opening_balance:updateBankLedger.opening_balance,
        opening_balance_type:updateBankLedger.opening_balance_type,
        assign_date:updateBankLedger.assign_date
    };
    

    // Form
    const form = useForm({
        resolver:zodResolver(BankLedgerValidation),
        defaultValues:{
            account_name:updateBankLedger.id === '' ? '' : updateBankLedger.account_name,
            group:updateBankLedger.id === '' ? '' : updateBankLedger.group,
            account_type:updateBankLedger.id === '' ? '' : updateBankLedger.account_type,
            account_address:updateBankLedger.id === '' ? '' : updateBankLedger.account_address,
            account_city:updateBankLedger.id === '' ? '' : updateBankLedger.account_city,
            pin_code:updateBankLedger.id === '' ? null : updateBankLedger.pin_code,
            email:updateBankLedger.id === '' ? '' : updateBankLedger.email,
            mobile:updateBankLedger.id === '' ? null : updateBankLedger.mobile,
            opening_balance:updateBankLedger.id === '' ? null : updateBankLedger.opening_balance,
            opening_balance_type:updateBankLedger.id === '' ? 'Debit' : updateBankLedger.opening_balance_type,
            assign_date:updateBankLedger.id === '' ? new Date() : updateBankLedger.assign_date
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof BankLedgerValidation>) => {
        // Create Bank Ledger
        if(updateBankLedger.id === ''){
            if(bankLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            };
            await createBankLedger({
                account_name:values.account_name,
                group:values.group,
                account_type:accountType,
                account_address:values.account_address,
                account_city:values.account_city,
                pin_code:values.pin_code,
                email:values.email,
                mobile:values.mobile,
                opening_balance:values.opening_balance,
                opening_balance_type:values.opening_balance_type,
                assign_date:values.assign_date
            });
            setIsViewOpened(true);
            toast({title:'Added Successfully!'});
        }
        // Modify Bank Ledger
        else if(!deepEqual(comparisonObject, values) || form.getValues().assign_date > comparisonObject.assign_date || form.getValues().assign_date < comparisonObject.assign_date){
            // Ensuring unique account name
            if(values.account_name !== comparisonObject.account_name && bankLedgers.map((ledger:any) => ledger.account_name).includes(values.account_name)){
                toast({title:'Account name already exists', variant:'error'});
                return;
            };
            // Updating
            await modifyBankLedger({
                id:updateBankLedger.id,
                account_name:values.account_name,
                group:values.group,
                account_type:accountType,
                account_address:values.account_address,
                account_city:values.account_city,
                pin_code:values.pin_code,
                email:values.email,
                mobile:values.mobile,
                opening_balance:values.opening_balance,
                opening_balance_type:values.opening_balance_type,
                assign_date:values.assign_date
            });
            setIsViewOpened(true);
            toast({title:'Updated Successfully!'});
        }
        // Delete Bank Ledger
        else if(updateBankLedger.isDeleteClicked){
            await deleteBankLedger({id:updateBankLedger.id});
            setIsViewOpened(true);
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateBankLedger({
            id:'',
            isDeleteClicked:false,
            account_name:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:'',
            email:'',
            mobile:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        // Reseting form
        form.reset({
            account_name:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:'',
            email:'',
            mobile:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        setAccountType('');
    };


    // Use effect
    useEffect(() => {
        if(form.getValues().group !== ''){
            const text = accountGroups.filter((group:any) => group.group_name === form.getValues().group)[0].group_type;
            setAccountType(text);
        }else{
            setAccountType('');
        }
    }, [form.watch('group')]);


    return (
        <div className='w-[90%] max-w-[500px] max-h-[95%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Bank Ledger</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >


                    {/* Account Name */}
                    <FormField
                        control={form.control}
                        name='account_name'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Name</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Group */}
                    <FormField
                        control={form.control}
                        name='group'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Select group</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accountGroups.length < 1 ? (
                                                        <p>No groups found</p>
                                                    ) : accountGroups[0]?.group_name ? accountGroups.map((group:any) => (
                                                    <SelectItem value={group.group_name}>{group.group_name}</SelectItem>
                                                )) : (
                                                    <LoadingIcon />
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]'/>
                            </FormItem>
                        )}
                    />

                    {/* Account Type */}
                    <FormField
                        control={form.control}
                        name='account_type'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={accountType}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Account Address */}
                    <FormField
                        control={form.control}
                        name='account_address'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account Address</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Account City */}
                    <FormField
                        control={form.control}
                        name='account_city'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Account City</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Pin Code */}
                    <FormField
                        control={form.control}
                        name='pin_code'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Pin Code</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Email</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Mobile No. */}
                    <FormField
                        control={form.control}
                        name='mobile'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Phone/Mobile No.</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Opening Balance */}
                    <FormField
                        control={form.control}
                        name='opening_balance'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Opening Balance</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Opening Balance Type */}
                    <FormField
                        control={form.control}
                        name='opening_balance_type'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Opening Balance Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Debit'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Debit'>Debit</SelectItem>
                                                <SelectItem value='Credit'>Credit</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Assign Date */}
                    <FormField
                        control={form.control}
                        name='assign_date'
                        render={() => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Assign Date</FormLabel>
                                <Popover open={isCalendarOpened} onOpenChange={setIsCalendarOpened}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant='outline'
                                            className='flex flex-row items-center w-full h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none sm:basis-[70%]'
                                        >
                                            <CalendarIcon className='mr-2 h-4 w-4' />
                                            {
                                                form.getValues().assign_date
                                                        ? <span>{format(form.getValues().assign_date, 'PPP')}</span>
                                                        : <span>Pick a date</span>
                                            }
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0'>
                                        <Calendar
                                            mode='single'
                                            selected={form.getValues().assign_date}
                                            onSelect={v => {setIsCalendarOpened(false); form.setValue('assign_date', v)}}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} bankLedgers={bankLedgers} updateBankLedger={updateBankLedger} setUpdateBankLedger={setUpdateBankLedger} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;