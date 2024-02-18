'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import FormCom from '@/components/modules/fees/feeMaster/assignMultipleGroupToStudent/FormCom';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchAdmittedStudents } from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const page = () => {


    // Is Form for Save
    const [isSave, setIsSave] = useState(true);


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Students
    const [students, setStudents] = useState<any>([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const installmentsRes = await fetchInstallments();
            const classesRes = await fetchClasses();
            setInstallments(installmentsRes);
            setClasses(classesRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-2 bg-white lg:pt-10'>
            <FormCom
                isSave={isSave}
                setIsSave={setIsSave}
                installments={installments}
                classes={classes}
                students={students}
                setStudents={setStudents}
            />
        </div>
    );
};





// Export
export default page;