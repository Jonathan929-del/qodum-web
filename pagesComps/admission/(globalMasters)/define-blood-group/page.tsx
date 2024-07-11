'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchBloodGroups} from '@/lib/actions/admission/globalMasters/bloodGroup.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineBloodGroup/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineBloodGroup/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Blood groups
    const [bloodGroups, setBloodGroups] = useState([{}]);


    // Update blood group
    const [updateBloodGroup, setUpdateBloodGroup] = useState({
        id:'',
        isDeleteClicked:false,
        blood_group:''
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchBloodGroups();
            setBloodGroups(res);
        };
        fetcher();
    }, [isViewOpened, setUpdateBloodGroup]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        bloodGroups={bloodGroups}
                        setUpdateBloodGroup={setUpdateBloodGroup}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        bloodGroups={bloodGroups}
                        updateBloodGroup={updateBloodGroup}
                        setUpdateBloodGroup={setUpdateBloodGroup}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;