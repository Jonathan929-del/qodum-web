'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchDesignations} from '@/lib/actions/payroll/globalMasters/designation.actions';
import FormCom from '@/components/modules/payroll/globalMasters/defineDesignation/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/defineDesignation/ViewCom';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Designations
    const [designations, setDesignations] = useState([{}]);


    // Update designation
    const [updateDesignation, setUpdateDesignation] = useState({
        id:'',
        isDeleteClicked:false,
        designation:'',
        show_in_payroll:false
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchDesignations();
            setDesignations(res);
        };
        fetcher();
    }, [isViewOpened, updateDesignation]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        designations={designations}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateDesignation={setUpdateDesignation}
                    />
                ) : (
                    <FormCom
                        designations={designations}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateDesignation={updateDesignation}
                        setUpdateDesignation={setUpdateDesignation}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;