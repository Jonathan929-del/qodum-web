'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineSubject/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineSubject/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Subjects
    const [subjects, setSubjects] = useState([{}]);


    // Update subject
    const [updateSubject, setUpdateSubject] = useState({
        id:'',
        isDeleteClicked:false,
        subject_name:'',
        available_seats:0,
        is_university:false
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchSubjects();
            setSubjects(res);
        };
        fetcher();
    }, [isViewOpened, updateSubject]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        subjects={subjects}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateSubject={setUpdateSubject}
                    />
                ) : (
                    <FormCom
                        subjects={subjects}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateSubject={updateSubject}
                        setUpdateSubject={setUpdateSubject}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;