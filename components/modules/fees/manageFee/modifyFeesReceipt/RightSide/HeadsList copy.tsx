// Imports
import {Input} from '@/components/ui/input';
import {ChevronsUpDown} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';
import {modifyPaymentPaidHeads} from '@/lib/actions/fees/manageFee/payment.actions';
import {ModifyStudentAffiliatedHeads} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main Function
const HeadsList = ({selectedStudent, totalNumberGenerator, setSelectedStudent, selectedPayment, setSelectedPayment}:any) => {


    // Toast
    const {toast} = useToast();


    // Heads
    const heads = selectedPayment?.paid_heads;


    // Student's heads
    const studentHeads = selectedStudent.affiliated_heads.heads;


    // Cancel
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
        setSelectedPayment({});
    };


    // Amount change handler
    const amountChangeHandler = (head:any, v:any) => {

        // Head amounts filtering
        const h = {
            ...head,
            amounts:head.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name))
        };

        // Values
        const inputValue = Number(v);
        const values = h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.value));

        // loop
        if(inputValue > totalNumberGenerator(values)){
            toast({title:'To be paid amount should not be greater than Actual amount', variant:'alert'});
            h.amounts.map((a:any) => a.to_be_paid_amount = Number(a.value) - (Number(a.last_rec_amount) + Number(a.conc_amount)));
        }else{
            if(inputValue <= values[0]){
                // First amount
                if(h.amounts[0]) h.amounts[0].to_be_paid_amount = inputValue;
                if(h.amounts[1]) h.amounts[1].to_be_paid_amount = 0;
                if(h.amounts[2]) h.amounts[2].to_be_paid_amount = 0;
                if(h.amounts[3]) h.amounts[3].to_be_paid_amount = 0;
                if(h.amounts[4]) h.amounts[4].to_be_paid_amount = 0;
                if(h.amounts[5]) h.amounts[5].to_be_paid_amount = 0;
                if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
            }else{
                const availableAmount = inputValue - values[0];
                if(availableAmount <= values[1]){
                    if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                    // Second value
                    if(h.amounts[1]) h.amounts[1].to_be_paid_amount = availableAmount;
                    if(h.amounts[2]) h.amounts[2].to_be_paid_amount = 0;
                    if(h.amounts[3]) h.amounts[3].to_be_paid_amount = 0;
                    if(h.amounts[4]) h.amounts[4].to_be_paid_amount = 0;
                    if(h.amounts[5]) h.amounts[5].to_be_paid_amount = 0;
                    if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                    if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                    if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                    if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                    if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                    if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                }else{
                    const availableAmount = inputValue - (values[0] + values[1]);
                    if(availableAmount <= values[2]){
                        if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                        if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                        // Third value
                        if(h.amounts[2]) h.amounts[2].to_be_paid_amount = availableAmount;
                        if(h.amounts[3]) h.amounts[3].to_be_paid_amount = 0;
                        if(h.amounts[4]) h.amounts[4].to_be_paid_amount = 0;
                        if(h.amounts[5]) h.amounts[5].to_be_paid_amount = 0;
                        if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                        if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                        if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                        if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                        if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                        if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;   
                    }else{
                        const availableAmount = inputValue - (values[0] + values[1] + values[2]);
                        if(availableAmount <= values[3]){
                            if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                            if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                            if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                            // Fourth value
                            if(h.amounts[3]) h.amounts[3].to_be_paid_amount = availableAmount;
                            if(h.amounts[4]) h.amounts[4].to_be_paid_amount = 0;
                            if(h.amounts[5]) h.amounts[5].to_be_paid_amount = 0;
                            if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                            if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                            if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                            if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                            if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                            if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;   
                        }else{
                            const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3]);
                            if(availableAmount <= values[4]){
                                if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                // Fifth value
                                if(h.amounts[4]) h.amounts[4].to_be_paid_amount = availableAmount;
                                if(h.amounts[5]) h.amounts[5].to_be_paid_amount = 0;
                                if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                                if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                                if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                                if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                                if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;      
                            }else{
                                const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4]);
                                if(availableAmount <= values[5]){
                                    if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                    if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                    if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                    if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                    if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                    // Sixth value
                                    if(h.amounts[5]) h.amounts[5].to_be_paid_amount = availableAmount;
                                    if(h.amounts[6]) h.amounts[6].to_be_paid_amount = 0;
                                    if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                                    if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                                    if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                                    if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                    if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                }else{
                                    const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5]);
                                    if(availableAmount <= values[6]){
                                        if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                        if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                        if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                        if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                        if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                        if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                        // Seventh value
                                        if(h.amounts[6]) h.amounts[6].to_be_paid_amount = availableAmount;
                                        if(h.amounts[7]) h.amounts[7].to_be_paid_amount = 0;
                                        if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                                        if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                                        if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                        if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                    }else{
                                        const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6]);
                                        if(availableAmount <= values[7]){
                                            if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                            if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                            if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                            if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                            if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                            if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                            if(h.amounts[6]) h.amounts[6].to_be_paid_amount = values[6];
                                            // Eight value
                                            if(h.amounts[7]) h.amounts[7].to_be_paid_amount = availableAmount;
                                            if(h.amounts[8]) h.amounts[8].to_be_paid_amount = 0;
                                            if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                                            if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                            if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                        }else{
                                            const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6] + values[7]);
                                            if(availableAmount <= values[8]){
                                                if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                                if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                                if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                                if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                                if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                                if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                                if(h.amounts[6]) h.amounts[6].to_be_paid_amount = values[6];
                                                if(h.amounts[7]) h.amounts[7].to_be_paid_amount = values[7];
                                                // Nine value
                                                if(h.amounts[8]) h.amounts[8].to_be_paid_amount = availableAmount;
                                                if(h.amounts[9]) h.amounts[9].to_be_paid_amount = 0;
                                                if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                                if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                            }else{
                                                const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6] + values[7] + values[8]);
                                                if(availableAmount <= values[9]){
                                                    if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                                    if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                                    if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                                    if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                                    if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                                    if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                                    if(h.amounts[6]) h.amounts[6].to_be_paid_amount = values[6];
                                                    if(h.amounts[7]) h.amounts[7].to_be_paid_amount = values[7];
                                                    if(h.amounts[8]) h.amounts[8].to_be_paid_amount = values[8];
                                                    // Ten value
                                                    if(h.amounts[9]) h.amounts[9].to_be_paid_amount = availableAmount;
                                                    if(h.amounts[10]) h.amounts[10].to_be_paid_amount = 0;
                                                    if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                                }else{
                                                    const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6] + values[7] + values[8] + values[9]);
                                                    if(availableAmount <= values[10]){
                                                        if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                                        if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                                        if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                                        if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                                        if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                                        if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                                        if(h.amounts[6]) h.amounts[6].to_be_paid_amount = values[6];
                                                        if(h.amounts[7]) h.amounts[7].to_be_paid_amount = values[7];
                                                        if(h.amounts[8]) h.amounts[8].to_be_paid_amount = values[8];
                                                        if(h.amounts[9]) h.amounts[9].to_be_paid_amount = values[9];
                                                        // Eleven value
                                                        if(h.amounts[10]) h.amounts[10].to_be_paid_amount = availableAmount;
                                                        if(h.amounts[11]) h.amounts[11].to_be_paid_amount = 0;
                                                    }else{
                                                        const availableAmount = inputValue - (values[0] + values[1] + values[2] + values[3] + values[4] + values[5] + values[6] + values[7] + values[8] + values[9] + values[10]);
                                                        if(availableAmount <= values[11]){
                                                            if(h.amounts[0]) h.amounts[0].to_be_paid_amount = values[0];
                                                            if(h.amounts[1]) h.amounts[1].to_be_paid_amount = values[1];
                                                            if(h.amounts[2]) h.amounts[2].to_be_paid_amount = values[2];
                                                            if(h.amounts[3]) h.amounts[3].to_be_paid_amount = values[3];
                                                            if(h.amounts[4]) h.amounts[4].to_be_paid_amount = values[4];
                                                            if(h.amounts[5]) h.amounts[5].to_be_paid_amount = values[5];
                                                            if(h.amounts[6]) h.amounts[6].to_be_paid_amount = values[6];
                                                            if(h.amounts[7]) h.amounts[7].to_be_paid_amount = values[7];
                                                            if(h.amounts[8]) h.amounts[8].to_be_paid_amount = values[8];
                                                            if(h.amounts[9]) h.amounts[9].to_be_paid_amount = values[9];
                                                            if(h.amounts[10]) h.amounts[10].to_be_paid_amount = values[10];
                                                            // Twelve value
                                                            if(h.amounts[11]) h.amounts[11].to_be_paid_amount = availableAmount;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        // Setting selected student heads
        setSelectedStudent({
            ...selectedStudent,
            affiliated_heads:{
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:studentHeads
            }
        });
    };


    // Submit handler
    const submitHandler = async () => {

        // Payment paid heads
        const paymentPaidHeads = selectedStudent.affiliated_heads.heads.filter((h:any) => selectedPayment.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name)).map((h:any) => {
            return{
                ...h,
                amounts:h.amounts.map((a:any) => {

                    const paid_amount = totalNumberGenerator(selectedPayment?.paid_heads.filter((head:any) => head.head_name === h.head_name).map((head:any) => totalNumberGenerator(head.amounts?.filter((amount:any) => amount.name === a.name).map((amount:any) => Number(amount.paid_amount)))));
                    return{
                        name:a.name,
                        value:Number(a.value),
                        conc_amount:Number(a.conc_amount),
                        last_rec_amount:(Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || paid_amount) - paid_amount),
                        payable_amount:Number(a.value) - ((Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || paid_amount) - paid_amount)),
                        paid_amount:Number(a.value) - ((Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || paid_amount) - paid_amount))
                    };
                    
                })
            }
        });

        // Student heads
        const studentHeads = selectedStudent.affiliated_heads.heads.filter((h:any) => !selectedPayment.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name)).map((h:any) => {
            return{
                ...h,
                amounts:h.amounts.map((a:any) => {
                    return {
                        name:a.name,
                        value:Number(a.value),
                        conc_amount:Number(a.conc_amount),
                        last_rec_amount:(Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || a.paid_amount) - a.paid_amount),
                        payable_amount:Number(a.value) - ((Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || a.paid_amount) - a.paid_amount)),
                        paid_amount:Number(a.value) - ((Number(a.last_rec_amount) + Number(a.conc_amount)) + (Number(a.to_be_paid_amount || a.paid_amount) - a.paid_amount))
                    };
                    
                })
            }
        });


        // New payment heads
        const newPaymentHeads = selectedPayment.paid_heads.map((ph:any) => {
            return{
                ...ph,
                amounts:ph.amounts.map((amount:any) => {
                    return{
                        ...amount,
                        paid_amount:totalNumberGenerator(selectedStudent.affiliated_heads.heads.filter((h:any) => selectedPayment.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name)).filter((h:any) => h.head_name === ph.head_name).map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => a.name === amount.name).map((a:any) => a.to_be_paid_amount))))
                    };
                })
            };
        });

        // New heads
        const newHeads = [...paymentPaidHeads, ...studentHeads];


        // Modifying
        await ModifyStudentAffiliatedHeads({
            id:selectedStudent.id,
            affiliated_heads:{
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:newHeads
            }
        });
        await modifyPaymentPaidHeads({
            receipt_no:selectedPayment.receipt_no,
            paid_amount:totalNumberGenerator(newPaymentHeads.map((ph:any) => totalNumberGenerator(ph.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((amount:any) => Number(amount.paid_amount))))),
            paid_heads:newPaymentHeads
        });
        toast({title:'Updated Successffuly!'});

        // Reseting
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
        setSelectedPayment({});
    };


    return (
        <div className='w-full h-[90%] flex flex-col items-center rounded-[4px] border-[0.5px] border-[#ccc]'>


            {/* Heads */}
            <div className='w-full h-full flex flex-col rounded-[4px] bg-[#F7F7F7] overflow-x-scroll custom-sidebar-scrollbar'>
                {/* Headers */}
                <ul className='w-full min-w-[750px] flex flex-row text-[10px] bg-[#435680] text-white border-b-[0.5px] border-[#ccc] cursor-pointer sm:text-[10px] md:text-md'>
                    <li className='basis-[19%] flex flex-row items-center justify-between px-2 py-2 border-r-[.5px] border-[#ccc]'>
                        Head
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Actual Amt.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Conc Amt.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[13.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Last Rec. Amt.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Paid Amount
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        To Be Paid Amt.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[12.5%] flex flex-row items-center justify-between px-2'>
                        Installment
                        <ChevronsUpDown size={12} />
                    </li>
                </ul>
                {/* Values */}
                {
                    heads?.length === 0 ? (
                        <p className='w-full min-w-[750px] flex flex-row p-2 text-sm bg-[#F3F8FB]'>
                            No heads
                        </p>
                    ) : heads?.map((h:any, index:number) => (
                        <ul
                            key={index}
                            className={`w-full min-w-[750px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((heads.indexOf(h) + 1) / 2) * 2 !== heads.indexOf(h) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                        >
                            <li className='basis-[19%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                {h.head_name}
                            </li>
                            <li className='basis-[12.5%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.value)))}
                            </li>
                            <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.conc_amount) || 0))}
                            </li>
                            <li className='basis-[13.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.last_rec_amount) || 0))}
                            </li>
                            <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.paid_amount)))}
                            </li>
                            <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                <Input
                                    defaultValue={totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.paid_amount)))}
                                    onChange={(e:any) => amountChangeHandler(selectedStudent.affiliated_heads.heads.filter((af:any) => af.head_name === h.head_name)[0], e.target.value)}
                                    className='flex flex-row items-center h-[80%] text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                />
                            </li>
                            <li className='basis-[12.5%] flex-grow flex flex-row items-center justify-center px-2 py-[2px]'>
                                {selectedPayment?.installments?.map((i:any) => i)}
                            </li>
                        </ul>
                    ))
                }
                {selectedStudent.affiliated_heads.heads?.filter((h:any) => !heads.map((ph:any) => ph.head_name).includes(h.head_name) && (selectedPayment.installments.includes(h.installment) || h.installment === 'All installments'))?.map((h:any, index:number) => (
                    <ul
                        key={index}
                        className={`w-full min-w-[750px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((heads.indexOf(h) + 1) / 2) * 2 !== heads.indexOf(h) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                    >
                        <li className='basis-[19%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            {h.head_name}
                        </li>
                        <li className='basis-[12.5%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            {totalNumberGenerator(h.amounts.map((a:any) => Number(a.value)))}
                        </li>
                        <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.conc_amount) || 0))}
                        </li>
                        <li className='basis-[13.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.last_rec_amount) || 0))}
                        </li>
                        <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            {totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.last_rec_amount || 0)))}
                        </li>
                        <li className='basis-[15%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                            <Input
                                defaultValue={totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.paid_amount) || Number(a.value)))}
                                onChange={(e:any) => amountChangeHandler(selectedStudent.affiliated_heads.heads.filter((af:any) => af.head_name === h.head_name)[0], e.target.value)}
                                className='flex flex-row items-center h-[80%] text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </li>
                        <li className='basis-[12.5%] flex-grow flex flex-row items-center justify-center px-2 py-[2px]'>
                            {selectedPayment?.installments?.map((i:any) => i)}
                        </li>
                    </ul>
                ))}
                {/* Total */}
                {heads?.length > 0 && (
                    <>
                        <ul className='w-full min-w-[750px] flex flex-row text-[10px] bg-[#435680] text-white border-b-[0.5px] border-[#ccc] sm:text-[10px] md:text-md'>
                            <li className='basis-[19%] flex flex-row items-center justify-between px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                Total
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(studentHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment.installments.includes(a.name)).map((a:any) => Number(a.value)))))}
                            </li>
                            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(studentHeads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment.installments.includes(a.name)).map((a:any) => Number(a.conc_amount)))))}
                            </li>
                            <li className='basis-[13.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(studentHeads.filter((h:any) => !heads.map((ph:any) => ph.head_name).includes(h.head_name) && (selectedPayment.installments.includes(h.installment) || h.installment === 'All installments')).map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment.installments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))))
                                + totalNumberGenerator(heads.map((ph:any) => totalNumberGenerator(ph.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.last_rec_amount) || 0))))
                                }
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {totalNumberGenerator(studentHeads.filter((h:any) => !heads.map((ph:any) => ph.head_name).includes(h.head_name) && (selectedPayment.installments.includes(h.installment) || h.installment === 'All installments')).map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment.installments.includes(a.name)).map((a:any) => Number(a.last_rec_amount)))))
                                + totalNumberGenerator(heads.map((ph:any) => totalNumberGenerator(ph.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.paid_amount) || 0))))
                                }
                            </li>
                            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                {
                                    totalNumberGenerator(studentHeads.filter((h:any) => !heads.map((ph:any) => ph.head_name).includes(h.head_name) && (selectedPayment.installments.includes(h.installment) || h.installment === 'All installments')).map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.to_be_paid_amount !== undefined ? a.to_be_paid_amount : a.paid_amount)))))
                                    + totalNumberGenerator(studentHeads.filter((h:any) => selectedPayment.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name)).map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => selectedPayment?.installments?.map((i:any) => i).includes(a.name)).map((a:any) => Number(a.to_be_paid_amount !== undefined
                                        ? a.to_be_paid_amount
                                        : totalNumberGenerator(heads.map((theHead:any) => totalNumberGenerator(theHead.amounts.filter((theAmount:any) => selectedPayment?.installments?.map((i:any) => i).includes(theAmount.name)).map((theAmount:any) => Number(theAmount.paid_amount)))))
                                        )))))
                                }
                            </li>
                            <li className='basis-[12.5%] flex flex-row items-center justify-between px-2'>
                                {selectedPayment?.installments?.map((i:any) => i)}
                            </li>
                        </ul>

                        {/* Buttons */}
                        <div className='w-full flex flex-row items-center justify-center gap-2 mt-4'>
                            {/* Save */}
                            <span
                                onClick={submitHandler}
                                className='flex items-center justify-center px-3 h-6 text-xs text-white bg-[#73E9AF] rounded-[4px] transition cursor-pointer hover:opacity-80'
                            >
                                Modify
                            </span>

                            {/* Cancel */}
                            <span
                                onClick={cancel}
                                className='flex items-center justify-center px-3 h-6 text-xs text-white bg-[#FDCD88] rounded-[4px] transition cursor-pointer hover:opacity-80'
                            >
                                Cancel
                            </span>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};





// Export
export default HeadsList;