'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import FormCom from '@/components/modules/fees/feeMaster/assignFeeGroupToFeeHead/FormCom';





// Main function
const page = () => {


    // Groups
    const [groups, setGroups] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const groupsRes = await fetchGroups();
            setGroups(groupsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                groups={groups}
            />
        </div>
    );
};





// Export
export default page;