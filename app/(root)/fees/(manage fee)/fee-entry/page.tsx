'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import {fetchStudentPayments} from '@/lib/actions/fees/manageFee/payment.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchInstallments } from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {fetchAdmittedStudents, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';





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
        setIsLoadingHeads(true);
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            id:student._id,
            image:student.student.image,
            name:student.student.name,
            address:student.student.h_no_and_streets,
            father_name:student.parents.father.father_name,
            mother_name:student.parents.mother.mother_name,
            contact_no:student.student.contact_person_mobile,
            admission_no:student.student.adm_no,
            bill_no:student.student.bill_no,
            class:student.student.class,
            affiliated_heads:{
                group_name:student.affiliated_heads.group_name,
                heads:student.affiliated_heads.heads.map((h:any) => {
                    return {
                        ...h,
                        amounts:h.amounts.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                                paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                            };
                        })
                    };
                })
            }
        });
        const installments = student?.affiliated_heads?.heads?.map((h:any) => h.amounts.map((a:any) => a.name)[0]);
        const filteredInstallments = installments.filter((item:any, pos:any) => installments.indexOf(item) == pos);
        const sortedInstallments = allInstallments.filter((i:any) => filteredInstallments.includes(i.name)).map((i:any) => i.name);
        setInstallments(sortedInstallments);
        setSelectedInstallments([sortedInstallments[0]]);
        setIsViewOpened(false);
        setIsLoadingHeads(false);
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
                    isLoadingHeads={isLoadingHeads}
                />
            )}
        </div>
    );
};





// Export
export default page;