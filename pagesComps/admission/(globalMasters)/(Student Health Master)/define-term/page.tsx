'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTerms} from '@/lib/actions/admission/globalMasters/studentHealthMaster/term.actions';
import FormCom from '@/components/modules/admission/globalMasters/studentHealthMaster/defineTerm/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/studentHealthMaster/defineTerm/ViewCom';





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
        term_name:'',
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {

            const termsRes = await fetchTerms();
            setTerms(termsRes);
        };
        fetcher();
    }, [isViewOpened, updateTerm]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
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