'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineClassDetails/relateClassSection/FormCom';





// Main function
const page = () => {


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


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
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                classes={classes}
                sections={sections}
            />
        </div>
    );
};





// Export
export default page;