'use client';
// Imports
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/utils/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import {fetchStudentPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchHeadsSequence} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import FeeReceipt from '@/components/modules/fees/manageFee/feeEntry/Others/FeeReceipt';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {fetchAdmittedStudents, fetchStudentByAdmNo, ModifyStudentAffiliatedHeads} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const page = () => {

    // Toast
    const {toast} = useToast();


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is loading heads
    const [isLoadingHeads, setIsLoadingHeads] = useState(false);


    // Installments
    const [installments, setInstallments] = useState([]);
    

    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Selected installments
    const [selectedInstallments, setSelectedInstallments] = useState<any>([]);


    // Students
    const [students, setStudents] = useState([{}]);


    // Payments
    const [payments, setPayments] = useState<any>([]);


    // Selected student
    const [selectedStudent, setSelectedStudent] = useState<any>({
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
        section:'',
        phone:'',
        email:'',
        affiliated_heads:{
            group_name:'',
            heads:[]
        }
    });


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Heads sequence
    const [headsSequence, setHeadsSequence] = useState([]);


    // All installments
    const [allInstallments, setAllInstallments] = useState<any>([]);


    // Is receipt opened
    const [isReceiptOpened, setIsReceiptOpened] = useState(false);


    // Receipt payment data
    const [receiptPaymentData, setReceiptPaymentData] = useState({});


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Payment handler
    const paymentHandler = async () => {
        try {

            // Set is loading to true
            setIsLoading(true);


            // Pending pending payments
            const pendingPayments = localStorage.getItem('payments') ? JSON.parse(localStorage.getItem('payments')) : [];


            // Checking payments status
            pendingPayments.map(async (p:any) => {
                const paymentStatus = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payments/payment/status`, {txnId:p.txnId});
                if(paymentStatus.data.status === 'failure'){
                    const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== p.txnId);
                    localStorage.setItem('payments', JSON.stringify(newPendingPayments));   
                };
                if(paymentStatus.data.status === 'success'){

                    // Apply payment function
                    const applyPayment = (amount:any, feesArray:any) => {
                        let remainingAmount = amount;
        
                        // Get the first amount's name from the first head
                        const firstName = feesArray[0].amounts[0].name;
        
                        for (const fee of feesArray) {
                            const amountsToPay = fee.amounts.filter(a => a.name === firstName); // Get all amounts with the same name
        
                            for (const a of amountsToPay) {
                                const feeValue = Number(a.value);
                                const name = a.name;
        
                                if (remainingAmount > 0) {
                                    if (remainingAmount >= feeValue) {
                                        // Pay the entire amount
                                        a.last_rec_amount = feeValue;
                                        a.paid_amount = 0;
                                        a.payable_amount = 0;
                                        a.conc_amount = 0;
                                        remainingAmount -= feeValue;
                                    } else {
                                        // Pay partially
                                        a.last_rec_amount = remainingAmount;
                                        a.paid_amount = feeValue - remainingAmount;
                                        a.payable_amount = feeValue - remainingAmount;
                                        a.conc_amount = 0;
                                        remainingAmount = 0; // All paid
                                        break; // Exit the loop to finish this name
                                    }
                                }
                            }
        
                            // If remaining amount is 0, break out of the outer loop
                            if (remainingAmount === 0) break;
                        }
        
                        // Now check if there's any remaining amount to pay for other names
                        if (remainingAmount > 0) {
                            for (const fee of feesArray) {
                                const amountsToPay = fee.amounts.filter(a => a.name !== firstName); // Get amounts with different names
        
                                for (const a of amountsToPay) {
                                    const feeValue = Number(a.value);
        
                                    if (remainingAmount > 0) {
                                        if (remainingAmount >= feeValue) {
                                            // Pay the entire amount
                                            a.last_rec_amount = feeValue;
                                            a.paid_amount = 0;
                                            a.payable_amount = 0;
                                            a.conc_amount = 0;
                                            remainingAmount -= feeValue;
                                        } else {
                                            // Pay partially
                                            a.last_rec_amount = remainingAmount;
                                            a.paid_amount = feeValue - remainingAmount;
                                            a.payable_amount = feeValue - remainingAmount;
                                            a.conc_amount = 0;
                                            remainingAmount = 0; // All paid
                                            break; // Exit the loop to finish this name
                                        }
                                    }
                                }
        
                                // If remaining amount is 0, break out of the outer loop
                                if (remainingAmount === 0) break;
                            }
                        }
        
                        return feesArray;
                    };


                    // Student's fess heads
                    const student = await fetchStudentByAdmNo({adm_no:p.adm_no});
                    const studentHeads = student.affiliated_heads.heads;


                    // New student's fee heads
                    const updatedHeads = applyPayment(Number(p.amount), studentHeads);


                    // Updating student
                    await ModifyStudentAffiliatedHeads({id:student._id, affiliated_heads:{group_name:student.affiliated_heads.group_name, heads:updatedHeads}});


                    // Removing the payment id from local storage
                    const newPendingPayments = pendingPayments.filter((pp:any) => pp.txnId !== p.txnId);
                    localStorage.setItem('payments', JSON.stringify(newPendingPayments));


                    // Toast
                    toast({title:'Payment saved successfully'});

                };
            });


            // Fetcher
            fetcher();


            // Set is loading to false
            setIsLoading(false);

        }catch(err){
            console.log(err);  
        };
    };


    // Fetcher
    const fetcher = async () => {
        const classesRes = await fetchClasses();
        const sectionsRes = await fetchSections();
        const studentsRes = await fetchAdmittedStudents();
        const installmentsRes = await fetchInstallments();
        const headsSequenceRes = await fetchHeadsSequence();
        setClasses(classesRes);
        setSections(sectionsRes);
        setStudents(studentsRes);
        setAllInstallments(installmentsRes);
        setHeadsSequence(headsSequenceRes);
    };


    // Use effects
    useEffect(() => {
        paymentHandler();
    }, []);
    useEffect(() => {
        const fetcher = async () => {
            const paymentsRes = await fetchStudentPayments({student:selectedStudent.name});
            setPayments(paymentsRes);
        };
        fetcher();
    }, [selectedStudent]);

    return (
        <div className='h-full flex flex-col items-center justify-start bg-white'>
            {isLoading ? (
                <LoadingIcon />
            ) : isReceiptOpened ? (
                <FeeReceipt
                    receiptPaymentData={receiptPaymentData}
                    setIsReceiptOpened={setIsReceiptOpened}
                    totalNumberGenerator={totalNumberGenerator}
                />
            ) : isViewOpened ? (
                <ViewCom
                    students={students}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                    setInstallments={setInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    allInstallments={allInstallments}
                />
            ) : (
                <FormCom
                    classes={classes}
                    sections={sections}
                    installments={installments}
                    students={students}
                    selectedStudent={selectedStudent}
                    selectedInstallments={selectedInstallments}
                    setSelectedInstallments={setSelectedInstallments}
                    setSelectedStudent={setSelectedStudent}
                    setIsViewOpened={setIsViewOpened}
                    setInstallments={setInstallments}
                    setIsLoading={setIsLoading}
                    payments={payments}
                    heads={heads}
                    setHeads={setHeads}
                    totalNumberGenerator={totalNumberGenerator}
                    allInstallments={allInstallments}
                    isLoadingHeads={isLoadingHeads}
                    setIsReceiptOpened={setIsReceiptOpened}
                    setReceiptPaymentData={setReceiptPaymentData}
                    setIsLoadingHeads={setIsLoadingHeads}
                    headsSequence={headsSequence}
                />
            )}
        </div>
    );
};





// Export
export default page;