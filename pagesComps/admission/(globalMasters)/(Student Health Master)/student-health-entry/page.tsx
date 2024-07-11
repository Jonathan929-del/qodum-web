'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import {fetchTerms} from '@/lib/actions/admission/globalMasters/studentHealthMaster/term.actions';
import FormCom from '@/components/modules/admission/globalMasters/studentHealthMaster/studentHealthEntry/FormCom';





// Main function
const page = () => {


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Terms
    const [terms, setTerms] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const termsRes = await fetchTerms();
            setClasses(classesRes)
            setSections(sectionsRes);
            setTerms(termsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                classes={classes}
                sections={sections}
                terms={terms}
            />
        </div>
    );
};





// Export
export default page;