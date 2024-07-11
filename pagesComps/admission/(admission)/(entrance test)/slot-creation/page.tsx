'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchStudents} from '@/lib/actions/admission/admission/student.actions';
import FormCom from '@/components/modules/admission/admission/entranceTest/slotCreation/FormCom';
import ViewCom from '@/components/modules/admission/admission/entranceTest/slotCreation/ViewCom';





// Main function
const page = () => {


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Students
    const [students, setStudents] = useState([{}]);


    // Slots
    const [slots, setSlots] = useState([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const studentsRes = await fetchStudents();
            setStudents(studentsRes);
        };
        fetcher();
    }, [])


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {isViewOpened ? (
                <ViewCom
                    setIsViewOpened={setIsViewOpened}
                    students={students}
                    slots={slots}
                />
            ) : (
                <FormCom
                    slots={slots}
                    setSlots={setSlots}
                    setIsViewOpened={setIsViewOpened}
                />
            )}
        </div>
    )
};





// Export
export default page;