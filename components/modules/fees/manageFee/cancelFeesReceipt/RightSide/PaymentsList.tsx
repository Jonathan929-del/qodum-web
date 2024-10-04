// Imports
import moment from 'moment';
import {ChevronsUpDown} from 'lucide-react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {cancelPayment} from '@/lib/actions/fees/manageFee/payment.actions';
import {ModifyStudentAffiliatedHeads} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogContent} from '@/components/ui/alert-dialog';





// Main Function
const PaymentsList = ({selectedStudent, setSelectedStudent, concessionReason, setConcessionReason, permissions}:any) => {


    // Toast
    const {toast} = useToast();


    // Payments
    const payments = selectedStudent.payments;


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Cancel receipt handler
    const cancelReceiptHandler = async (p:any) => {

        // Deleted heads
        const deletedHeads = p.paid_heads.filter((paymentHead:any) => !selectedStudent.affiliated_heads.heads.map((studentHead:any) => studentHead.head_name).includes(paymentHead.head_name)).map((paymentHead:any) => {
            return{
                ...paymentHead,
                amounts:paymentHead.amounts.map((paymentAmount:any) => {
                    return{
                        ...paymentAmount,
                        payable_amount:Number(paymentAmount.paid_amount),
                        paid_amount:Number(paymentAmount.paid_amount),
                        last_rec_amount:Number(paymentAmount.value) - (Number(paymentAmount.paid_amount) + Number(paymentAmount.conc_amount))
                    };
                })
            };
        });


        // Affected heads
        const affectedHeads = selectedStudent.affiliated_heads.heads.filter((h:any) => p.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name)).map((h:any) => {

            // Head amounts
            const headAmounts = h.amounts.map((headAmount:any) => headAmount.name);

            // Deleted heads amounts
            const deletedHeadsAmounts = p.paid_heads.filter((paymentHead:any) => paymentHead.head_name === h.head_name).map((paymentHead:any) => paymentHead.amounts.filter((paymentAmount:any) => !headAmounts.includes(paymentAmount.name)).map((paymentAmount:any) => {
                return{
                    ...paymentAmount,
                    payable_amount:Number(paymentAmount.paid_amount),
                    paid_amount:Number(paymentAmount.paid_amount),
                    last_rec_amount:Number(paymentAmount.value) - (Number(paymentAmount.paid_amount) + Number(paymentAmount.conc_amount))
                };
            }));

            // Return
            return{
                ...h,
                amounts:h.amounts.map((a:any) => {
                    return {
                        name:a.name,
                        value:Number(a.value),
                        conc_amount:Number(a.conc_amount),
                        last_rec_amount:Number(a.last_rec_amount === 0 ? a.value : a.last_rec_amount) - totalNumberGenerator(p.paid_heads.filter((head:any) => head.head_name === h.head_name).map((head:any) => totalNumberGenerator(head.amounts.filter((amount:any) => amount.name === a.name).map((amount:any) => Number(amount.paid_amount))))),
                        payable_amount:Number(a.value) - (Number(a.last_rec_amount === 0 ? a.value : a.last_rec_amount) - totalNumberGenerator(p.paid_heads.filter((head:any) => head.head_name === h.head_name).map((head:any) => totalNumberGenerator(head.amounts.filter((amount:any) => amount.name === a.name).map((amount:any) => Number(amount.paid_amount)))))),
                        paid_amount:Number(a.value) - (Number(a.last_rec_amount === 0 ? a.value : a.last_rec_amount) - totalNumberGenerator(p.paid_heads.filter((head:any) => head.head_name === h.head_name).map((head:any) => totalNumberGenerator(head.amounts.filter((amount:any) => amount.name === a.name).map((amount:any) => Number(amount.paid_amount))))))
                    };
                }).concat(...deletedHeadsAmounts)
            }
        }).concat(deletedHeads);


        // Unaffected heads
        const unAffectedHeads = selectedStudent.affiliated_heads.heads.filter((h:any) => !p.paid_heads.map((ph:any) => ph.head_name).includes(h.head_name));


        // New heads
        const newHeads = [
            ...affectedHeads,
            ...unAffectedHeads
        ];


        // Modifying
        await ModifyStudentAffiliatedHeads({
            id:selectedStudent.id,
            affiliated_heads:{
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:newHeads
            }
        });
        await cancelPayment({receipt_no:p.receipt_no});
        toast({title:'Canceled Successffuly!'});


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
            fee_group:'',
            payments:[]
        });
        setConcessionReason('');
    };


    return (
        <div className='w-full h-[90%] flex flex-col items-center rounded-[4px] border-[0.5px] border-[#ccc]'>


            {/* Heads */}
            <div className='w-full h-full flex flex-col rounded-[4px] bg-[#F7F7F7] overflow-x-scroll custom-sidebar-scrollbar'>
                {/* Headers */}
                <ul className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#435680] text-white border-b-[0.5px] border-[#ccc] cursor-pointer sm:text-[10px] md:text-md'>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-2 border-r-[.5px] border-[#ccc]'>
                        Receipt No.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Fees Type
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Receipt Date
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Name
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Mobile
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Paid Amt.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Cheque
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        DD No.
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                        Cancel Receipt
                        <ChevronsUpDown size={12} />
                    </li>
                    <li className='basis-[7.5%] flex flex-row items-center justify-between px-2'>
                        Action
                        <ChevronsUpDown size={12} />
                    </li>
                </ul>
                {/* Values */}
                    {
                        payments?.length === 0 ? (
                            <p className='w-full min-w-[1000px] flex flex-row p-2 text-sm bg-[#F3F8FB]'>
                                No payments
                            </p>
                        ) : !payments[0]?.student ? (
                            <LoadingIcon />
                        ) : payments?.map((p:any, index:number) => (
                            <ul
                                key={index}
                                className={`w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((payments.indexOf(p) + 1) / 2) * 2 !== payments.indexOf(p) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.receipt_no}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.fee_type === 'All fee types' ? 'All' : p.fee_type}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {moment(p.received_date).format('D-MMM-yy')}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.student}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    {/* {totalNumberGenerator(h.amounts.map((a:any) => Number(a.last_rec_amount) || 0))} */}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.paid_amount}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.paymode === 'Cheque' && p?.paymode_details?.cheque_no}
                                </li>
                                <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {p.paymode === 'DD' && p?.paymode_details?.cheque_no}
                                </li>
                                <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>


                                    {
                                        concessionReason === '' ? (
                                            <span
                                                onClick={() => toast({title:'Please enter reason', variant:'error'})}
                                                className='flex items-center justify-center px-[2px] w-full h-6 text-[11px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF] cursor-pointer
                                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                            >
                                                Cancel Receipt
                                            </span>
                                        ) : permissions.add (
                                            <AlertDialog>
                                                <AlertDialogTrigger className='w-full'>
                                                    <span
                                                        className='flex items-center justify-center px-[2px] w-full h-6 text-[11px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF] cursor-pointer
                                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                                    >
                                                        Cancel Receipt
                                                    </span>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='sm:max-w-[425px]'>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to cancel this record?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>No</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => cancelReceiptHandler(p)}
                                                        >
                                                            Yes
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )
                                    }



                                </li>
                                <li className='basis-[7.5%] flex-grow flex flex-row items-center justify-center px-2 py-[2px]]'>
                                    
                                </li>
                            </ul>
                        ))
                    }
            </div>


        </div>
    );
};





// Export
export default PaymentsList;