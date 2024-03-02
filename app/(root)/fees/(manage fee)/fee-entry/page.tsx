'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import {fetchStudentPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchAdmittedStudents, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import { fetchInstallments } from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';





// Main function
const page = () => {


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


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
    const [selectedStudent, setSelectedStudent] = useState({
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


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // All installments
    const [allInstallments, setAllInstallments] = useState<any>([]);


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Show button click
    const showButtonClick = async () => {
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            ...selectedStudent,
            affiliated_heads:{
                group_name:selectedStudent.affiliated_heads.group_name,
                heads:student.affiliated_heads.heads
            }
        });
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const studentsRes = await fetchAdmittedStudents();
            const installmentsRes = await fetchInstallments();
            setClasses(classesRes);
            setSections(sectionsRes);
            setStudents(studentsRes);
            setAllInstallments(installmentsRes);
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
        <div className='h-screen flex flex-col items-center justify-start bg-white'>
            {isLoading ? (
                <LoadingIcon />
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
                    showButtonClick={showButtonClick}
                    heads={heads}
                    setHeads={setHeads}
                    totalNumberGenerator={totalNumberGenerator}
                    allInstallments={allInstallments}
                />
            )}
        </div>
    );
};





// Export
export default page;