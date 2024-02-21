// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {FormControl, FormItem, FormLabel, FormField, FormMessage} from '@/components/ui/form';





// Main function
const Buttons = ({form, selectedStudent, setSelectedStudent, setSelectedInstallments, totalPaidAmount, setTotalPaidAmount}:any) => {


    // Cancel button
    const cancel = () => {
        setSelectedStudent({
            id:'',
            image:'',
            name:'',
            address:'',
            father_name:'',
            mother_name:'',
            contact_no:'',
            admission_no:'',
            bill_no:'',
            class:'',
            affiliated_heads:{
                group_name:'',
                heads:[]
            }
        });
        form.reset({
            receipt_date:new Date(),
            ref_no:'',
            receipt_no:0,
            pay_mode:'',
            remarks:'',
            is_adjust_advance:false,
            adjust_advance:0,
            fee_type:'All Fee Types',
            bank_name:'',
            installment:[''],
            entry_mode:'School',
            heads:[{
                conc_amount:0,
                paid_amount:0
            }],
            total_paid_amount:0,
            dues:0,
            advance_amt:0
        });
        setSelectedInstallments([]);
        setTotalPaidAmount(0);
    };


    useEffect(() => {
        if(totalPaidAmount && selectedStudent?.name){
            if(form.getValues().total_paid_amount < totalPaidAmount){
                form.setValue('advance_amt', totalPaidAmount - form.getValues().total_paid_amount);
                form.setValue('dues', 0);
            }else{
                form.setValue('dues', Math.abs(totalPaidAmount - form.getValues().total_paid_amount));
                form.setValue('advance_amt', 0);
            };
        };
    }, [totalPaidAmount]);


    return (
        <div className='flex flex-col items-center justify-between gap-3 p-2 border-[0.5px] border-[#ccc] rounded-[5px] lg:flex-row'>


            {/* Inputs */}
            <div className='flex flex-row items-center gap-2'>
                {/* Total Paid Amount */}
                <FormItem className='w-full'>
                    <div className='relative flex flex-col'>
                        <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Total Paid Amount</FormLabel>
                        <FormControl>
                            <Input
                                type='number'
                                value={totalPaidAmount}
                                onChange={(e:any) => setTotalPaidAmount(e.target.value)}
                                className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </FormControl>
                        <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                    </div>
                </FormItem>
                {/* Dues */}
                <FormField
                    control={form.control}
                    name='dues'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <div className='relative flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Dues</FormLabel>
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
                {/* Advance Amt.(C/F) */}
                <FormField
                    control={form.control}
                    name='advance_amt'
                    render={({field}) => (
                        <FormItem className='w-full'>
                            <div className='relative flex flex-col'>
                                <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Advance Amt.(C/F)</FormLabel>
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


            {/* Buttons */}
            <div className='h-full flex flex-row items-end gap-2'>
                {/* Save */}
                <Button
                    type='submit'
                    className='px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Save
                </Button>
                {/* Cancel */}
                <span
                    onClick={cancel}
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Cancel
                </span>
            </div>
        </div>
    );
};





// Export
export default Buttons;