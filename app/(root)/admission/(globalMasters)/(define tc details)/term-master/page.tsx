'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/globalMasters/defineTcDetails/termMaster/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineTcDetails/termMaster/ViewCom';
import {fetchTermMasters} from '@/lib/actions/admission/globalMasters/defineTcDetails/termMaster.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Terms
    const [terms, setTerms] = useState([{}]);


    // Update term
    const [updateTerm, setUpdateTerm] = useState({
        id:'',
        isDeleteClicked:false,
        term_name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchTermMasters();
            setTerms(res);
        };
        fetcher();
    }, [isViewOpened, updateTerm]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        terms={terms}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateTerm={setUpdateTerm}
                    />
                ) : (
                    <FormCom
                        terms={terms}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateTerm={updateTerm}
                        setUpdateTerm={setUpdateTerm}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;