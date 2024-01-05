/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeType/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeType/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Types
    const [types, setTypes] = useState([{}]);

    // Heads
    const [heads, setHeads] = useState([{}]);


    // Update type
    const [updateType, setUpdateType] = useState({
        id: '',
        name: '',
        preference_no: 0,
        heads: []
    });

    // selected heads for fee type
    const [selectedHeads, setSelectedHeads] = useState([])

    // Use effect for types
    useEffect(() => {
        const typesFetcher = async () => {
            const res = await fetchTypes();
            setTypes(res);
        };
        typesFetcher();
    }, [isViewOpened, updateType]);


    // Use effect for heads
    useEffect(() => {
        const headsFetcher = async () => {
            const res = await fetchHeads();
            setHeads(res);
        };
        headsFetcher();
    }, [isViewOpened, updateType]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white '>
            {
                isViewOpened ? (
                    <ViewCom
                        types={types}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateType={setUpdateType}
                    />
                ) : (
                    <FormCom
                        types={types}
                        heads={heads}
                        setSelectedHeads={setSelectedHeads}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateType={updateType}
                        selectedHeads={selectedHeads}
                        setUpdateType={setUpdateType}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;