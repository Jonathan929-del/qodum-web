'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/payroll/globalMasters/defineProfession/FormCom';
import ViewCom from '@/components/modules/payroll/globalMasters/defineProfession/ViewCom';
import {fetchTcCasts} from '@/lib/actions/admission/globalMasters/defineTcDetails/tcCaste.actions';
import { fetchProfessions } from '@/lib/actions/payroll/globalMasters/profession.actions';





// Main function
const page = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // professions
    const [professions, setProfessions] = useState([{}]);


    // Update profession
    const [updateProfession, setUpdateProfession] = useState({
        id:'',
        isDeleteClicked:false,
        profession:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchProfessions();
            setProfessions(res);
        };
        fetcher();
    }, [isViewOpened, updateProfession]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        professions={professions}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateProfession={setUpdateProfession}
                    />
                ) : (
                    <FormCom
                        professions={professions}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateProfession={updateProfession}
                        setUpdateProfession={setUpdateProfession}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;