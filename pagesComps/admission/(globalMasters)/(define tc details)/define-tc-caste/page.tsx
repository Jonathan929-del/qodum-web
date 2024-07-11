'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTcCasts} from '@/lib/actions/admission/globalMasters/defineTcDetails/tcCaste.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineTcDetails/defineTcCaste/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineTcDetails/defineTcCaste/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Casts
    const [casts, setCasts] = useState([{}]);


    // Update cast
    const [updateCast, setUpdateCast] = useState({
        id:'',
        isDeleteClicked:false,
        caste_name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchTcCasts();
            setCasts(res);
        };
        fetcher();
    }, [isViewOpened, updateCast]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        casts={casts}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateCast={setUpdateCast}
                    />
                ) : (
                    <FormCom
                        casts={casts}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateCast={updateCast}
                        setUpdateCast={setUpdateCast}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;