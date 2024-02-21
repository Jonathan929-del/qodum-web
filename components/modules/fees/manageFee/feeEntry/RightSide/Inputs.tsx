// Imports
import {format} from 'date-fns';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Checkbox} from '@/components/ui/checkbox';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {CalendarIcon, Check, ChevronDown, X} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const Inputs = ({installments, form, selectedInstallments, setSelectedInstallments}:any) => {


    // Date states
    const [isCalendarOpened, setIsCalendarOpened] = useState('');


    // Pay modes
    const [payModes, setPayModes] = useState(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card']);


    // Use effects
    useEffect(() => {
        switch (form.getValues().entry_mode) {
            case 'School':
                form.setValue('pay_mode', 'Cash');
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card']);
                break;
            case 'Bank':
                form.setValue('pay_mode', 'Cash');
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card']);
                break;
            case 'Online':
                form.setValue('pay_mode', 'Net Banking');
                setPayModes(['Net Banking', 'Debit Card', 'Credit Card']);
                break;
            default:
                break;
                setPayModes(['Cash', 'Cheque', 'DD', 'NEFT', 'Swiped Card']);
        };
    }, [form.watch('entry_mode'), form.getValues().entry_mode]);


    return (
        <div className='flex flex-col gap-2 p-2 rounded-[5px] border-[0.5px] border-[#ccc]'>
            <div className='flex flex-col gap-2 lg:flex-row'>
                <div className='w-full flex flex-row gap-2'>
                    {/* Receipt Date */}
                    <div className='flex flex-col'>
                        <p className='text-xs text-hash-color'>Date</p>
                        <Popover open={isCalendarOpened === 'dob'} onOpenChange={() => isCalendarOpened === 'dob' ? setIsCalendarOpened('') : setIsCalendarOpened('dob')}>
                            <PopoverTrigger asChild className='h-7'>
                                <Button
                                    variant='outline'
                                    className='flex flex-row items-center w-full text-[11px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {
                                        form.getValues().receipt_date
                                                ? <span>{format(form.getValues().receipt_date, 'PPP')}</span>
                                                : <span>Pick a date</span>
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto'>
                                <Calendar
                                    mode='single'
                                    selected={form.getValues().receipt_date}
                                    onSelect={(v:any) => {setIsCalendarOpened(''); form.setValue('receipt_date', v)}}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* Ref. No. */}
                    <FormField
                        control={form.control}
                        name='ref_no'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='relative flex flex-col'>
                                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Ref. No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='w-full flex flex-row gap-2'>
                    {/* Receipt No. */}
                    <FormField
                        control={form.control}
                        name='receipt_no'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='relative flex flex-col'>
                                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Receipt No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* Pay Mode */}
                    <FormField
                        control={form.control}
                        name='pay_mode'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='flex flex-col'>
                                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Pay Mode</FormLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Please Select' className='text-[11px]' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {payModes.map((m:any) => (
                                                <SelectItem value={m} key={m}>{m}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-10'>
                {/* Remarks */}
                <FormField
                    control={form.control}
                    name='remarks'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <div className='flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Remarks</FormLabel>
                                <FormControl>
                                    <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                        className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <div className='w-full flex flex-row items-end gap-2'>
                    {/* Is Adjust Advance */}
                    <FormField
                        control={form.control}
                        name='is_adjust_advance'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Checkbox
                                        checked={form.getValues().is_adjust_advance}
                                        onClick={() => form.setValue('is_adjust_advance', !form.getValues().is_adjust_advance)}
                                        className='rounded-[2px] text-hash-color'
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* Adjust Advance */}
                    <FormField
                        control={form.control}
                        name='adjust_advance'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='flex flex-col'>
                                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Adjust Advance</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            value={field.value}
                                            onChange={field.onChange}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 lg:flex-row'>
                {/* Fees Type */}
                <FormField
                    control={form.control}
                    name='fee_type'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <div className='flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Fees Type</FormLabel>
                                <Select
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger disabled className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Fee Types'>All Fee Types</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormItem>
                    )}
                />
                {/* Bank Name */}
                <FormField
                    control={form.control}
                    name='bank_name'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <div className='flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Bank Name</FormLabel>
                                <Select
                                    {...field}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger disabled className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='All Fee Types'>All Fee Types</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-col gap-2 lg:flex-row'>
                {/* Installment */}
                <FormItem className='w-full max-w-[500px] lg:w-[50%]'>
                    <div className='flex flex-col'>
                        <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Installment</FormLabel>
                        <Select>
                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                <SelectValue
                                    className='text-[11px]'
                                    placeholder={selectedInstallments.length < 1 ? 'Please Select' : selectedInstallments.length === 1 ? '1 installment selected' : `${selectedInstallments.length} installments selected`}
                                />
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                {installments.length === 0 ? (
                                    <p className='text-xs font-semibold'>No installments</p>
                                ) : installments[0] === '' ? (
                                    <LoadingIcon />
                                ) : (
                                    <>
                                        <div className='flex flex-row'>
                                            <div
                                                // @ts-ignore
                                                // onClick={() => setSelectedInstallments(installments.map((s:any) => s.name))}
                                                onClick={() => setSelectedInstallments(installments)}
                                                className='group flex flex-row items-center justify-center cursor-pointer'
                                            >
                                                <Check size={12}/>
                                                <p className='text-xs group-hover:underline'>All</p>
                                            </div>
                                            <div
                                                onClick={() => setSelectedInstallments([])}
                                                className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                            >
                                                <X size={12}/>
                                                <p className='text-xs group-hover:underline'>Clear</p>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            {installments.map((i:any) => (
                                                // <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={i._id}>
                                                <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={i}>
                                                    <Checkbox
                                                        className='rounded-[3px] text-hash-color font-semibold'
                                                        // checked={selectedInstallments.map((s:any) => s).includes(i.name)}
                                                        checked={selectedInstallments.map((s:any) => s).includes(i)}
                                                        // @ts-ignore
                                                        // onClick={() => selectedInstallments.includes(i.name) ? setSelectedInstallments(selectedInstallments.filter((s:any) => s !== i.name)) : setSelectedInstallments([...selectedInstallments, i.name])}
                                                        onClick={() => selectedInstallments.includes(i) ? setSelectedInstallments(selectedInstallments.filter((s:any) => s !== i)) : setSelectedInstallments([...selectedInstallments, i])}
                                                    />
                                                    <div className='w-full flex flex-row'>
                                                        <p className='basis-[70%] text-[11px]'>{i}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </FormItem>
            </div>
        </div>
    );
};





// Export
export default Inputs