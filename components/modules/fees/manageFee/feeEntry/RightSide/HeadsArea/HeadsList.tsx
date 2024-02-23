// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';





// Main function
const HeadsList = ({selectedStudent, selectedInstallments, setTotalPaidAmount, form, totalPaidAmount, heads, setHeads, totalNumberGenerator}:any) => {


    // Toast
    const {toast} = useToast();


    // Conc amount change hadler
    const concAmountChangeHandler = (h:any, e:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount = e.target.value);
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.payable_amount = a.value - a.conc_amount);
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = a.value - a.conc_amount);
        setHeads([...heads]);
        setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        form.setValue('total_paid_amount', totalNumberGenerator(
            heads.map((head:any) => totalNumberGenerator(
                head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))
            ))
        ));
    };


    // Paid amount change hadler
    const paidAmountChangeHandler = (h:any, e:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = e.target.value);
        setHeads([...heads]);
        totalNumberGenerator(heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
            if(Number(a.paid_amount) > Number(a.value) - Number(a.conc_amount)){
                toast({title:'Paid amount cannot be greater than payable amount', variant:'alert'});
                a.paid_amount = Number(a.value) - Number(a.conc_amount);
                setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            }else{
                setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            };
        }))
    };


    // Use effects
    useEffect(() => {
        const assignedHeads =
            selectedStudent?.affiliated_heads?.heads
                ?.filter((h:any) => selectedInstallments.includes(h.installment) || h.installment === 'All installments')
                // ?.filter((h:any) => !h.amounts.map((a:any) => a.name)[0].includes(selectedInstallments[0]));
        assignedHeads.map((h:any) => {
            heads[heads.indexOf(h)]?.amounts?.map((a:any) => a.conc_amount = 0);
        });
        console.log(assignedHeads);
        setHeads(assignedHeads);
        form.setValue('total_paid_amount', totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value))))));
        setTotalPaidAmount(totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    }, [selectedInstallments]);


    return (
        <div className='w-full border-[0.5px] border-[#ccc] rounded-[5px] overflow-x-scroll custom-sidebar-scrollbar'>

            <div className='w-full min-w-[800px] flex flex-col'>
                {selectedInstallments.length === 1 ? (
                    <>
                        {/* Headers */}
                        <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                            <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Head
                            </li>
                            <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Actual Amt.
                            </li>
                            <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Conc. Amt.
                            </li>
                            <li className='basis-[15%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Last Rec. Amt.
                            </li>
                            <li className='basis-[13.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Payable Amt.
                            </li>
                            <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Paid Amt.
                            </li>
                            <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Fees Type
                            </li>
                            <li className='basis-[12.5%] text-center text-hash-color text-[11px] font-semibold py-2'>
                                Pay Schedule
                            </li>
                        </ul>
        
                        {/* Values */}
                        {heads?.length < 1 ? (
                                <p className='pl-2 text-[11px] text-hash-color font-semibold'>No Fees</p>
                            ) : selectedInstallments.length > 0 && heads.map((h:any) => (
                                <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                                    <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2 max-w-[90px]'>
                                        {/* <p className='min-w-[200px]'> */}
                                            {h.head_name}
                                        {/* </p> */}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))}
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount)[0]}
                                            onChange={(e:any) => concAmountChangeHandler(h, e)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </li>
                                    <li className='basis-[15%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        0
                                    </li>
                                    <li className='basis-[13.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - Number(a.conc_amount)))}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            // value={totalNumberGenerator(heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))}
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount)[0]}
                                            onChange={(e:any) => paidAmountChangeHandler(h, e)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {h.type_name}
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color text-[11px] py-2'>
                                        {h.schedule_type}
                                    </li>
                                </ul>
                            ))
                        }
        
                        {/* Total */}
                        {heads.length > 0 && (
                            <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                                <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Total
                                </li>
                                <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))))}
                                </li>
                                <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[15%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    0
                                </li>
                                <li className='basis-[13.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                </li>
                                <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 text-white'>
                                    -
                                </li>
                                <li className='basis-[12.5%] text-center text-hash-color text-[11px] font-semibold py-2'>
                                    
                                </li>
                            </ul>
                        )}
                    </>
                ) : (




                    <>
                        {/* Headers */}
                        <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                            <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Installment
                            </li>
                            <li className='basis-[16.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Actual Amt.
                            </li>
                            <li className='basis-[17.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Conc. Amt.
                            </li>
                            <li className='basis-[20%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Last Rec. Amt.
                            </li>
                            <li className='basis-[18.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Payable Amt.
                            </li>
                            <li className='basis-[16.5%] text-center text-hash-color text-[11px] font-semibold py-2'>
                                Paid Amt.
                            </li>
                        </ul>
        
                        {/* Values */}
                        {selectedInstallments.map((i:any) => (
                                <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                                    <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {i}
                                    </li>
                                    <li className='basis-[16.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {/* {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))} */}
                                        -
                                    </li>
                                    <li className='basis-[17.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            // value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount)[0]}
                                            // onChange={(e:any) => concAmountChangeHandler(h, e)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </li>
                                    <li className='basis-[20%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        0
                                    </li>
                                    <li className='basis-[18.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {/* {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - Number(a.conc_amount)))} */}
                                        -
                                    </li>
                                    <li className='basis-[16.5%] text-center text-hash-color text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            // value={totalNumberGenerator(heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))}
                                            // value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount)[0]}
                                            // onChange={(e:any) => paidAmountChangeHandler(h, e)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </li>
                                </ul>
                            ))
                        }
        
                        {/* Total */}
                        {heads.length > 0 && (
                            <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                                <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Total
                                </li>
                                <li className='basis-[16.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))))}
                                </li>
                                <li className='basis-[17.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[20%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    0
                                </li>
                                <li className='basis-[18.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[16.5%] text-center text-hash-color text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                </li>
                            </ul>
                        )}
                    </>








                )}
            </div>

        </div>
    );
};






// Export
export default HeadsList;