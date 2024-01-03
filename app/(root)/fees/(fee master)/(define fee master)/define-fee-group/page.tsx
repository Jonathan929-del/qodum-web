/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeGroup/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeGroup/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Groups
    const [groups, setGroups] = useState([{}]);


    // Update Group
    const [updateGroup, setUpdateGroup] = useState({
        id: '',
        name: '',
        is_special: false
    });


    // Use effect
    useEffect(() => {
        const groupFetcher = async () => {
            const res = await fetchGroups();
            setGroups(res);
        };
        groupFetcher();
    }, [isViewOpened, updateGroup]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        groups={groups}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateGroup={setUpdateGroup}
                    />
                ) : (
                    <FormCom
                        groups={groups}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateGroup={updateGroup}
                        setUpdateGroup={setUpdateGroup}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;