'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/FormCom';
import ViewCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/ViewCom';
import {fetchNarrationMasters} from '@/lib/actions/accounts/globalMasters/defineNarrationMasters.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Narration Masters
    const [narrations, setNarrations] = useState([{}]);


    // Update narration
    const [updateNarration, setUpdateNarration] = useState({
        id:'',
        narration:'',
        voucher_type:'',
        isDeleteClicked:false
    });

    
    // Use effect
    useEffect(() => {
        const narrationsFetcher = async () => {
            const narrationsRes = await fetchNarrationMasters();
            setNarrations(narrationsRes.narrations);
        };
        narrationsFetcher();
    }, [isViewOpened, updateNarration]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        narrations={narrations}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateNarration={setUpdateNarration}
                    />
                ) : (
                    <FormCom
                        narrations={narrations}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateNarration={updateNarration}
                        setUpdateNarration={setUpdateNarration}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;