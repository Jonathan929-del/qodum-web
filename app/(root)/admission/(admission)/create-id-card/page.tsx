'use client';
// Imports
import {useEffect, useState} from 'react';
import IdCard from '@/components/modules/admission/admission/createIdCard/IdCard';
import FormCom from '@/components/modules/admission/admission/createIdCard/FormCom';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const page = () => {


    // Students
    const [students, setStudents] = useState<any>([]);

    // Selected student
    const [selectedStudent, setSelectedStudent] = useState({
        name:'',
        adm_no:'',
        father_name:'',
        dob:'',
        class_name:'',
        mother_name:'',
        contact_person_name:'',
        contact_person_mobile:'',
        image:''
    });


    // Is card opened
    const [isCardOpened, setIsCardOpened] = useState(true);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const studentsRes = await fetchAdmittedStudents();
            setStudents(studentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-4 bg-white overflow-hidden lg:pt-10'>
            {
                isCardOpened ? (
                    <IdCard
                        studentData={selectedStudent}
                        setIsCardOpened={setIsCardOpened}
                    />
                ) : (
                    <FormCom
                        students={students}
                        setIsCardOpened={setIsCardOpened}
                        setSelectedStudent={setSelectedStudent}
                        selectedStudent={selectedStudent}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;