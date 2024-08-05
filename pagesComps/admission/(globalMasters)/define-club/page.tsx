'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchClubs} from '@/lib/actions/admission/globalMasters/club.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineClub/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineClub/ViewCom';





// Main function
const index = () => {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Clubs
    const [clubs, setClubs] = useState([{}]);


    // Update club
    const [updateClub, setUpdateClub] = useState({
        id:'',
        isDeleteClicked:false,
        name:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchClubs();
            setClubs(res);
        };
        fetcher();
    }, [isViewOpened, setUpdateClub]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        clubs={clubs}
                        setUpdateClub={setUpdateClub}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        clubs={clubs}
                        updateClub={updateClub}
                        setUpdateClub={setUpdateClub}
                    />
                )
            }
        </div>
    );
};





// Export
export default index;