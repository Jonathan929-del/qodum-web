'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import FormCom from '@/components/modules/fees/masterSettings/dueLimit/FormCom';
import ViewCom from '@/components/modules/fees/masterSettings/dueLimit/ViewCom';
import {fetchDueLimits} from '@/lib/actions/fees/masterSettings/dueLimit.actions';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchHeads } from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Due limits
    const [dueLimits, setDueLimits] = useState([{}]);


    // CLasses
    const [classes, setClasses] = useState([{}]);


    // Fee types
    const [feeTypes, setFeeTypes] = useState([{}]);


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Update due limit
    const [updateDueLimit, setUpdateDueLimit] = useState({
        id:'',
        isDeleteClicked:false,
        class_name:'',
        fee_type:'',
        late_fee_on_due:false,
        dues_amount:0,
        is_percent:false,
        heads:'',
        fine_waive_off_setting:'Do not show waive off checkbox on Fee entry form (Default)'
    });


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const duesRes = await fetchDueLimits();
            const classesRes = await fetchClasses();
            const feeTypesRes = await fetchTypes();
            const headsRes = await fetchHeads();
            setDueLimits(duesRes);
            setClasses(classesRes);
            setFeeTypes(feeTypesRes);
            setHeads(headsRes);
        };
        fetcher();
    }, [isViewOpened, updateDueLimit]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        dueLimits={dueLimits}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateDueLimit={setUpdateDueLimit}
                    />
                    ) : (
                    <FormCom
                        dueLimits={dueLimits}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateDueLimit={updateDueLimit}
                        setUpdateDueLimit={setUpdateDueLimit}
                        classes={classes}
                        feeTypes={feeTypes}
                        heads={heads}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;