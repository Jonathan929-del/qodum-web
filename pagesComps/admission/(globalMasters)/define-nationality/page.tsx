'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/admission/globalMasters/defineNationality/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineNationality/ViewCom';
import {fetchNationalities} from '@/lib/actions/admission/globalMasters/nationality.actions';





// Main function
const index = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Nationalities
    const [nationalities, setNationalities] = useState([{}]);


    // Update nationality
    const [updateNationality, setUpdateNationality] = useState({
        id:'',
        isDeleteClicked:false,
        name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchNationalities();
            setNationalities(res);
        };
        fetcher();
    }, [isViewOpened, setUpdateNationality]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        nationalities={nationalities}
                        setUpdateNationality={setUpdateNationality}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        nationalities={nationalities}
                        updateNationality={updateNationality}
                        setUpdateNationality={setUpdateNationality}
                    />
                )
            }
        </div>
    );
};





// Export
export default index;