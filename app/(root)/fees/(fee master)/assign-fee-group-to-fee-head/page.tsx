'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import {fetchAffiliatedHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import FormCom from '@/components/modules/fees/feeMaster/assignFeeGroupToFeeHead/FormCom';





// Main function
const page = () => {


    // Groups
    const [groups, setGroups] = useState([{}]);


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const groupsRes = await fetchGroups();
            const headsRes = await fetchAffiliatedHeads();
            setHeads(headsRes);
            setGroups(groupsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                groups={groups}
                heads={heads}
                setHeads={setHeads}
            />
        </div>
    );
};





// Export
export default page;