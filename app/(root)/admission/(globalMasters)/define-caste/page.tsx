'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchCastes} from '@/lib/actions/admission/globalMasters/caste.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineCaste/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineCaste/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Castes
    const [castes, setCastes] = useState([{}]);


    // Update caste
    const [updateCaste, setUpdateCaste] = useState({
        id:'',
        isDeleteClicked:false,
        caste_name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchCastes();
            setCastes(res);
        };
        fetcher();
    }, [isViewOpened, setUpdateCaste]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        castes={castes}
                        setUpdateCaste={setUpdateCaste}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        castes={castes}
                        updateCaste={updateCaste}
                        setUpdateCaste={setUpdateCaste}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;