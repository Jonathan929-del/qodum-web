// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {FormControl, FormItem, FormLabel, FormField, FormMessage} from '@/components/ui/form';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogContent} from '@/components/ui/alert-dialog';





// Main function
const Buttons = ({form, selectedStudent, setSelectedStudent, setSelectedInstallments, totalPaidAmount, setTotalPaidAmount, totalNumberGenerator, selectedInstallments, heads, setConcessionReason, isConcession, setIsConcession, onSubmit, installments, setHeads}:any) => {


    // Toast
    const {toast} = useToast();


    // Total paid handler
    const totalPaidHandler = (e:any) => {


        // Less than zero validation
        if(Number(e.target.value) < 0){
            toast({title:'Please enter a number greater than zero ', variant:'alert'});
            heads.map((h:any) => h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.conc_amount) - Number(a.last_rec_amount))));
            const totalNumber = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))));
            setTotalPaidAmount(totalNumber);
            return;
        };


        // Amount Handling
        setTotalPaidAmount(e.target.value);
        const totalNumber = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))));
        const inputValue = Number(e.target.value);
        if(e.target.value !== undefined){
            // Number greater than total amount
            if(inputValue >= totalNumber){

                // Setting all heads to paid
                heads.map((h:any) => h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.conc_amount) - Number(a.last_rec_amount))));
            }
            // Number smaller than total amount
            else{
                const amountsValues = heads.map((h:any) => {
                    let array;
                    if(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).length > 1){
                        const singleAmount = h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))[0];
                        array = singleAmount;
                    }else{
                        array = h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))[0];
                    }
                    return array;
                });
                if(inputValue <= amountsValues[0]){
                    // First amount
                    heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = inputValue);
                    heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                    heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                    heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                    heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                    heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                }else{
                    const availableAmount = inputValue - amountsValues[0];
                    if(availableAmount <= amountsValues[1]){
                        heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[0]);
                        // Second amount
                        heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = availableAmount);
                        heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                        heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                        heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                        heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                    }else{
                        const availableAmount = inputValue - (Number(amountsValues[0]) + Number(amountsValues[1]));
                        if(availableAmount <= amountsValues[2]){
                            heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[0]);
                            heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[1]);
                            // Third amount
                            heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = availableAmount);
                            heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                            heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                            heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                        }else{
                            const availableAmount = inputValue - (Number(amountsValues[0]) + Number(amountsValues[1]) +  Number(amountsValues[2]));
                            if(availableAmount <= amountsValues[3]){
                                heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[0]);
                                heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[1]);
                                heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[2]);
                                // Fourth amount
                                heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = availableAmount);
                                heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                                heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                            }else{
                                const availableAmount = inputValue - (Number(amountsValues[0]) + Number(amountsValues[1]) + Number(amountsValues[2]) + Number(amountsValues[3]));
                                if(availableAmount <= amountsValues[4]){
                                    heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[0]);
                                    heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[1]);
                                    heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[2]);
                                    heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[3]);
                                    // Fifth amount
                                    heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = availableAmount);
                                    heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = 0);
                                }else{
                                    const availableAmount = inputValue - (Number(amountsValues[0]) + Number(amountsValues[1]) + Number(amountsValues[2]) + Number(amountsValues[3]) + Number(amountsValues[4]));
                                    if(availableAmount <= amountsValues[5]){
                                        heads[0].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[0]);
                                        heads[1] && heads[1].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[1]);
                                        heads[2] && heads[2].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[2]);
                                        heads[3] && heads[3].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[3]);
                                        heads[4] && heads[4].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = amountsValues[4]);
                                        // Sixth amount
                                        heads[5] && heads[5].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = availableAmount);
                                    }
                                }
                            }
                        }
                    }
                }




            }
        };

        
    };


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


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();


    // Use effect
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
        !totalPaidAmount && form.setValue('dues', form.getValues().total_paid_amount);
    }, [totalPaidAmount]);


    return (
        <div className='flex flex-col items-center justify-between gap-3 p-2 rounded-[5px] bg-[#F7F7F7] border-[#ccc] border-[0.5px] lg:flex-row'>


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
                                onChange={(e:any) => totalPaidHandler(e)}
                                className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
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
                                        className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
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
                                        className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
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
                {isConcession ? (
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <span className='flex items-center justify-center px-3 h-6 text-xs text-white bg-[#73E9AF] rounded-[4px] hover:bg-[#8be0b7] cursor-pointer'>
                                Save
                            </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='sm:max-w-[425px]'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Concession Reason</AlertDialogTitle>
                            </AlertDialogHeader>
                                <Input
                                    placeholder='Enter reason'
                                    onChange={(e:any) => setConcessionReason(e.target.value)}
                                />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>
                                    <span
                                        onClick={() => {handleSubmit();setIsConcession(false)}}
                                    >
                                        Submit
                                    </span>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <Button
                        type='submit'
                        className='px-3 h-6 text-xs text-white bg-[#73E9AF] rounded-[4px] hover:bg-[#8be0b7]'
                    >
                        Save
                    </Button>
                )}
                {/* Cancel */}
                <span
                    onClick={cancel}
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-[#FDCD88] rounded-[4px] transition cursor-pointer hover:opacity-80'
                >
                    Cancel
                </span>
            </div>
        </div>
    );
};





// Export
export default Buttons;