'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import ViewCom from '@/components/modules/fees/manageFee/feeEntry/ViewCom';
import FormCom from '@/components/modules/fees/manageFee/feeEntry/FormCom';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';





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


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const studentsRes = await fetchAdmittedStudents();
            setClasses(classesRes);
            setSections(sectionsRes);
            setStudents(studentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-2 bg-white'>
            {isLoading ? (
                <LoadingIcon />
            ) : isViewOpened ? (
                <ViewCom
                    students={students}
                    setIsLoading={setIsLoading}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                    setInstallments={setInstallments}
                    setSelectedInstallments={setSelectedInstallments}
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
                    setIsLoading={setIsLoading}
                    setInstallments={setInstallments}
                />
            )}
        </div>
    );
};





// Export
export default page;