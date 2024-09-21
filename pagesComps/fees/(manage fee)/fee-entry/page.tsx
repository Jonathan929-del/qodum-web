'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import {fetchStudentPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import FeeReceipt from '@/components/modules/fees/manageFee/feeEntry/Others/FeeReceipt';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {fetchAdmittedStudents, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';
import { fetchHeadsSequence } from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';





// Main function
const page = () => {


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


    // Use effects
    useEffect(() => {
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
        fetcher();
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