/* eslint-disable react-hooks/rules-of-hooks */
'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeHead/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeHead/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Update head
    const [updateHead, setUpdateHead] = useState({
        id:'',
        name:'',
        print_name:'',
        pay_schedule:'',
        priority_no:0,
        type:'',
        show_in_certificate:false,
        fee_refundable:false
    });


    // Use effect
    useEffect(() => {
        const headsFetcher = async () => {
            const res = await fetchHeads();
            setHeads(res);
        };
        headsFetcher();
    }, [isViewOpened, updateHead]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white '>
            {
                isViewOpened ? (
                    <ViewCom
                        heads={heads}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateHead={setUpdateHead}
                    />
                ) : (
                    <FormCom
                        heads={heads}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateHead={updateHead}
                        setUpdateHead={setUpdateHead}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;