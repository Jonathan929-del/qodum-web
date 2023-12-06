'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchNarrationMasters} from '@/lib/actions/accounts/accounts.actions';
import FormCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/FormCom';
import ViewCom from '@/components/modules/accounts/globalMasters/defineNarrationMaster/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Narration Masters
    const [narrations, setNarrations] = useState([{}]);

    
    // Use effect
    useEffect(() => {
        const narrationsFetcher = async () => {
            const narrationsRes = await fetchNarrationMasters();
            setNarrations(narrationsRes.narrations);
        };
        narrationsFetcher();
    }, [isViewOpened]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white'>
            {
                isViewOpened ? (
                    <ViewCom
                        narrations={narrations}
                        setIsViewOpened={setIsViewOpened}
                    />
                ) : (
                    <FormCom
                        narrations={narrations}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;