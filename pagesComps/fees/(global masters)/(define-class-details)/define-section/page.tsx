'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import FormCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineSection/FormCom';
import ViewCom from '@/components/modules/fees/globalMasters/defineClassDetails/defineSection/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // States
    const [sections, setSections] = useState([{}]);


    // Update section
    const [updateSection, setUpdateSection] = useState({
        id:'',
        isDeleteClicked:false,
        section_name:'',
        order_no:0,
    });

    
    // Use effect
    useEffect(() => {
        const sectionsFetcher = async () => {
            const res = await fetchSections();
            setSections(res);
        };
        sectionsFetcher();
    }, [isViewOpened, updateSection]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        sections={sections}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateSection={setUpdateSection}
                    />
                ) : (
                    <FormCom
                        sections={sections}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateSection={updateSection}
                        setUpdateSection={setUpdateSection}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;