'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/assignTransportToStudents/FormCom';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';





// Main function
const page = () => {


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Students
    const [students, setStudents] = useState<any>([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            setClasses(classesRes);
            setSections(sectionsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-2 bg-white lg:pt-10'>
            <FormCom
                sections={sections}
                classes={classes}
                students={students}
                setStudents={setStudents}
            />
        </div>
    );
};





// Export
export default page;