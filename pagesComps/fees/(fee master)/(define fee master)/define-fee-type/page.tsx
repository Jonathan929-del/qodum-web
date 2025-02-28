'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeType/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeType/ViewCom';
import {fetchFreeHeads, fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';





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


    // Fetcher
    const fetcher = async () => {
        const typesRes = await fetchTypes();
        const headsRes = (await fetchFreeHeads()).reduce((acc, cur) => {
            acc.push(cur.name)
            return acc; 
        }, []);
        setTypes(typesRes);
        setHeads(headsRes);
    };


    // Use effect
    useEffect(() => {
        fetcher();
    }, [isViewOpened, updateType]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white '>
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
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateType={updateType}
                        setUpdateType={setUpdateType}
                        fetcher={fetcher}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;