// Imports
import {useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';





// Main function
const HeadsList = ({selectedStudent, selectedInstallments, setTotalPaidAmount, form, heads, setHeads, totalNumberGenerator}:any) => {


    // Toast
    const {toast} = useToast();


    // Conc amount change hadler
    const concAmountChangeHandler = (h:any, v:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount = v);
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.payable_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
            if(Number(a.conc_amount || 0) > (Number(a.value) - Number(a.last_rec_amount || 0))){
                toast({title:'Concession amount cannot be greater than the total paid amount', variant:'alert'});
                a.conc_amount = Number(a.value) - Number(a.last_rec_amount || 0);
                a.paid_amount = 0;
                a.payable_amount = 0;
                setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            }
        });
        setHeads([...heads]);
        setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
        form.setValue('total_paid_amount', totalNumberGenerator(
            heads.map((head:any) => totalNumberGenerator(
                head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - ((Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0))))
            ))
        ));
    };


    // Paid amount change hadler
    const paidAmountChangeHandler = (h:any, v:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount = v);
        setHeads([...heads]);
        totalNumberGenerator(heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => {
            if(Number(a.paid_amount) > Number(a.value) - ((Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)))){
                toast({title:'Paid amount cannot be greater than payable amount', variant:'alert'});
                a.paid_amount = Number(a.value) - ((Number(a.conc_amount) + Number(a.last_rec_amount)));
                setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            }else{
                setTotalPaidAmount(totalNumberGenerator(heads.map((head:any) => totalNumberGenerator(head.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            };
        }));
    };





    // Conc amount change hadler (for multiple installments)
    const concAmountChangeHandlerForMultipleiInstallments = (h:any, v:any, i:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.conc_amount = v);
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.payable_amount = a.value - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.paid_amount = a.value - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0)));
        const totalValueAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))));
        const totalConcAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.conc_amount)))));
        const totalRecdAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.last_rec_amount)))));

        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => {
            if(totalConcAmount > totalValueAmount - totalRecdAmount){
                toast({title:'Concession amount cannot be greater than the total paid amount', variant:'alert'});
                a.conc_amount = Number(a.value);
                a.paid_amount = 0;
                a.payable_amount = 0;
            }
        });
        setHeads([...heads]);
        form.setValue('total_paid_amount', totalNumberGenerator(
            heads.map((head:any) => totalNumberGenerator(
                head.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.last_rec_amount || 0) + Number(a.conc_amount || 0)))
            ))
        ));
    };


    // Paid amount change hadler (for multiple installments)
    const paidAmountChangeHandlerForMultipleiInstallments = (h:any, v:any, i:any) => {
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => a.paid_amount = v);
        const totalValueAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))));
        const totalConcAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.conc_amount)))));
        const totalRecdAmount = totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.last_rec_amount)))));
        setHeads([...heads]);
        heads[heads.indexOf(h)].amounts.filter((a:any) => a.name === i).map((a:any) => {
            if(Number(v) > totalValueAmount - (totalConcAmount + totalRecdAmount)){
                toast({title:'Paid amount cannot be greater than payable amount', variant:'alert'});
                a.paid_amount = Number(a.value) - (Number(a.conc_amount || 0) + Number(a.last_rec_amount || 0));
                setTotalPaidAmount(totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            }else{
                setTotalPaidAmount(totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
            };
        });
    };


    // Installmemt conc amount change hadler
    const installmentConcAmountChangeHandler = (i:any, v:any) => {
        const inputValue = Number(v);
        if(inputValue !== undefined){
            const filteredHeads = heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i));
            const installmentValues = filteredHeads.map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n);

            if(inputValue > totalNumberGenerator(installmentValues)){
                filteredHeads.filter((h:any) => h.amounts.map((a:any) => a.name !== i)).map((h:any) => {
                    concAmountChangeHandlerForMultipleiInstallments(h, v, i);
                });
            }else{
                if(inputValue <= Number(installmentValues[0])){
                    // First amount
                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], inputValue, i);
                    filteredHeads[1] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], 0, i);
                    filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                    filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                    filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                    filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                }else{
                    const availableAmount = inputValue - Number(installmentValues[0]);
                    if(availableAmount <= Number(installmentValues[1])){
                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                        // Second amount
                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], availableAmount, i);
                        filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                        filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                        filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                        filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                    }else{
                        const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]));
                        if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]))){
                            concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                            concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                            // Third amount
                            filteredHeads[2] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], availableAmount, i);
                            filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                            filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                            filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                        }else{
                            const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]));
                            if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]))){
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                // Fourth amount
                                filteredHeads[3] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], availableAmount, i);
                                filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                                filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                            }else{
                                const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]));
                                if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]))){
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                    concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                    // Fifth amount
                                    filteredHeads[4] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], availableAmount, i);
                                    filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                                }else{
                                    const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]));
                                    if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]))){
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                        concAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], Number(installmentValues[4]), i);
                                        // Sixth amount
                                        filteredHeads[5] && concAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], availableAmount, i);
                                    };
                                }
                            }
                        }
                    }
                }
            };

        };
    };


    // Installmemt paid amount change hadler
    const installmentPaidAmountChangeHandler = (i:any, v:any) => {
        const inputValue = Number(v);
        if(inputValue !== undefined){
            const filteredHeads = heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i));
            const installmentValues = filteredHeads.map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n);

            if(inputValue > totalNumberGenerator(installmentValues)){
                filteredHeads.filter((h:any) => h.amounts.map((a:any) => a.name !== i)).map((h:any) => {
                    paidAmountChangeHandlerForMultipleiInstallments(h, v, i);
                });
            }else{
                if(inputValue <= Number(installmentValues[0])){
                    // First amount
                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], inputValue, i);
                    filteredHeads[1] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], 0, i);
                    filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                    filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                    filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                    filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                }else{
                    const availableAmount = inputValue - Number(installmentValues[0]);
                    if(availableAmount <= Number(installmentValues[1])){
                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                        // Second amount
                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], availableAmount, i);
                        filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], 0, i);
                        filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                        filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                        filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                    }else{
                        const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]));
                        if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]))){
                            paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                            paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                            // Third amount
                            filteredHeads[2] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], availableAmount, i);
                            filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], 0, i);
                            filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                            filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                        }else{
                            const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]));
                            if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]))){
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                // Fourth amount
                                filteredHeads[3] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], availableAmount, i);
                                filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], 0, i);
                                filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                            }else{
                                const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]));
                                if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]))){
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                    paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                    // Fifth amount
                                    filteredHeads[4] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], availableAmount, i);
                                    filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], 0, i);
                                }else{
                                    const availableAmount = inputValue - (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]));
                                    if(availableAmount <= (Number(installmentValues[0]) + Number(installmentValues[1]) + Number(installmentValues[2]) + Number(installmentValues[3]) + Number(installmentValues[4]))){
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[0], Number(installmentValues[0]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[1], Number(installmentValues[1]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[2], Number(installmentValues[2]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[3], Number(installmentValues[3]), i);
                                        paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[4], Number(installmentValues[4]), i);
                                        // Sixth amount
                                        filteredHeads[5] && paidAmountChangeHandlerForMultipleiInstallments(filteredHeads[5], availableAmount, i);
                                    };
                                }
                            }
                        }
                    }
                }
            };

        };
    };





    // Use effects
    useEffect(() => {
        const assignedHeads = selectedStudent?.affiliated_heads?.heads?.filter((h:any) => selectedInstallments.includes(h.installment) || h.installment === 'All installments')
        setHeads(assignedHeads);
        form.setValue('total_paid_amount', totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))))));
        setTotalPaidAmount(totalNumberGenerator(assignedHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    }, [selectedInstallments]);
    useEffect(() => {
        setTotalPaidAmount(totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount))))));
    }, [heads]);


    return (
        <div className='w-full overflow-x-scroll custom-sidebar-scrollbar bg-white rounded-[4px] border-[0.5px] border-[#ccc]'>

            <div className='w-full min-w-[750px] flex flex-col'>
                {selectedInstallments.length === 1 ? (
                    <>
                        {/* Headers */}
                        <ul className='flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc]'>
                            <li className='basis-[19.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Head
                            </li>
                            <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Actual Amt.
                            </li>
                            <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Conc. Amt.
                            </li>
                            <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                Last Rec. Amt.
                            </li>
                            <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
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
                                <ul className={`flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc] ${Math.floor((heads.indexOf(h) + 1) / 2) * 2 !== heads.indexOf(h) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                    <li className='basis-[19.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {h.head_name}
                                    </li>
                                    <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))}
                                    </li>
                                    <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.conc_amount)[0]}
                                            onChange={(e:any) => concAmountChangeHandler(h, e.target.value)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </li>
                                    <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.payable_amount)))}
                                    </li>
                                    <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={heads[heads.indexOf(h)].amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => a.paid_amount)[0]}
                                            onChange={(e:any) => paidAmountChangeHandler(h, e.target.value)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
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
                                <li className='basis-[19.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    Total
                                </li>
                                <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value)))))}
                                </li>
                                <li className='basis-[10%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                                </li>
                                <li className='basis-[12.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))))}
                                </li>
                                <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.payable_amount)))))}
                                </li>
                                <li className='basis-[11.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                </li>
                                <li className='basis-[12.5%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 text-white'>
                                    
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
                                <ul className={`flex flex-row items-center justify-between border-b-[0.5px] border-b-[#ccc] ${Math.floor((selectedInstallments.indexOf(i) + 1) / 2) * 2 !== selectedInstallments.indexOf(i) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                                    <li className='basis-[11%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {i}
                                    </li>
                                    <li className='basis-[16.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value))[0]).filter((n:any) => n))}
                                    </li>
                                    <li className='basis-[17.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            onChange={(e:any) => installmentConcAmountChangeHandler(i, e.target.value)}
                                            value={totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name === i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.conc_amount))[0]).filter((n:any) => n))}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </li>
                                    <li className='basis-[20%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.last_rec_amount))[0]).filter((n:any) => n))}
                                    </li>
                                    <li className='basis-[18.5%] text-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] py-2'>
                                        {totalNumberGenerator(heads.filter((h:any) => h.amounts.map((a:any) => a.name).includes(i)).map((h:any) => h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount)))[0]).filter((n:any)  => n))}
                                    </li>
                                    <li className='basis-[16.5%] text-center text-hash-color text-[11px] px-2 py-[2px]'>
                                        <Input
                                            type='number'
                                            value={totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === i).map((a:any) => Number(a.paid_amount)))))}
                                            onChange={(e:any) => installmentPaidAmountChangeHandler(i, e.target.value)}
                                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4] remove-arrow'
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
                                    {totalNumberGenerator(heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedInstallments.includes(a.name)).map((a:any) => Number(a.value) - (Number(a.conc_amount) + Number(a.last_rec_amount))))))}
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