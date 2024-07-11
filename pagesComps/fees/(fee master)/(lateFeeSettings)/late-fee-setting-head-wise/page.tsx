'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import {fetchGroups} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import {fetchLateFees} from '@/lib/actions/fees/feeMaster/lateFeeSettings/lateFee.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import FormCom from '@/components/modules/fees/feeMaster/lateFeeSettings/lateFeeHeadWise/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/lateFeeSettings/lateFeeHeadWise/ViewCom';
import {fetchLateFeesHeadWise} from '@/lib/actions/fees/feeMaster/lateFeeSettings/lateFeeHeadWise.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // lateFees
    const [lateFees, setLateFees] = useState([{}]);


    // Update late fee
    const [updateLateFee, setUpdateLateFee] = useState({
        id:'',
        isDeleteClicked:false,
        fee_group:'',
        fee_type:'',
        installment:'',
        head:'',
        due_date:new Date(),
        late_fee_type:'',
        amount:0
    });


    // Groups
    const [groups, setGroups] = useState([{}]);


    // Types
    const [types, setTypes] = useState([{}]);


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Late fee types
    const lateFeeTypes = ['Per Day', 'Per Month', 'Per Quarter', 'One Time'];


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchLateFeesHeadWise();
            const groupsRes = await fetchGroups();
            const typesRes = await fetchTypes();
            const installmentsRes = await fetchInstallments();
            const headsRes = await fetchHeads();
            setLateFees(res);
            setGroups(groupsRes);
            setTypes(typesRes);
            setInstallments(installmentsRes);
            setHeads(headsRes);
        };
        fetcher();
    }, [isViewOpened, updateLateFee]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white '>
            {
                isViewOpened ? (
                    <ViewCom
                        lateFees={lateFees}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateLateFee={setUpdateLateFee}
                    />
                ) : (
                    <FormCom
                        lateFees={lateFees}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateLateFee={updateLateFee}
                        setUpdateLateFee={setUpdateLateFee}
                        groups={groups}
                        types={types}
                        installments={installments}
                        heads={heads}
                        lateFeeTypes={lateFeeTypes}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;