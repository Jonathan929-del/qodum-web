'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import FormCom from '@/components/modules/fees/feeMaster/assignAmountGroup/FormCom';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';





// Main function
const page = () => {


    // Groups
    const [groups, setGroups] = useState([{}]);


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const groupsRes = await fetchGroups();
            const installmentsRes = await fetchInstallments();
            setInstallments(installmentsRes);
            setGroups(groupsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <FormCom
                groups={groups}
                installments={installments}
            />
        </div>
    );
};





// Export
export default page;