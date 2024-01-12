'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeGroup/FormCom';





// Main function
const page = () => {


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
    }, [updateGroup]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                groups={groups}
                updateGroup={updateGroup}
                setUpdateGroup={setUpdateGroup}
            />
        </div>
    );
};





// Export
export default page;