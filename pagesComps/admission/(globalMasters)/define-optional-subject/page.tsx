'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/globalMasters/defineOptionalSubject/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineOptionalSubject/ViewCom';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Optional Subjects
    const [subjects, setSubjects] = useState([{}]);


    // Update subject
    const [updateSubject, setUpdateSubject] = useState({
        id:'',
        isDeleteClicked:false,
        subject_name:''
    });

    
    // Use effect
    useEffect(() => {
        const subjectsFetcher = async () => {
            const res = await fetchOptionalSubjects();
            setSubjects(res);
        };
        subjectsFetcher();
    }, [isViewOpened, updateSubject]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        subjects={subjects}
                        setUpdateSubject={setUpdateSubject}
                        setIsViewOpened={setIsViewOpened}
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