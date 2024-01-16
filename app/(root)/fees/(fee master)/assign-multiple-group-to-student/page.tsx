'use client';
// Imports
import { useEffect, useState } from 'react';
import FormCom from '@/components/modules/fees/feeMaster/assignMultipleGroupToStudent/FormCom';
import { fetchTypes } from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import { fetchGroups } from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import { fetchInstallments } from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import { fetchClasses } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';





// Main function
const page = () => {


    // Is Form for Save
    const [isSave, setIsSave] = useState(true);

    // Types
    const [types, setTypes] = useState([{}]);

    // Groups
    const [groups, setGroups] = useState([{}]);

    // Installments
    const [installments, setInstallments] = useState([{}]);

    // Classes
    const [classes, setClasses] = useState([{}]);



    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const typesRes = await fetchTypes();
            const groupsRes = await fetchGroups();
            const installmentsRes = await fetchInstallments();
            const classesRes = await fetchClasses();

        
            
            setTypes(typesRes);
            setGroups(groupsRes);
            setInstallments(installmentsRes);
            setClasses(classesRes);
        };
        fetcher();
    }, []);



    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white'>
            {

                <FormCom
                    isSave={isSave}
                    setIsSave={setIsSave}
                    installments={installments}
                    classes={classes}
                />

            }
        </div>
    );
};





// Export
export default page;