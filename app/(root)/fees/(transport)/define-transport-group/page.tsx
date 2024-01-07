'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/transportGroup/FormCom';
import ViewCom from '@/components/modules/fees/transport/transportGroup/ViewCom';
import {fetchTransportGroups} from '@/lib/actions/fees/transport/transportGroup.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Transport Groups
    const [transportGroups, setTransportGroups] = useState([{}]);


    // Update transport group
    const [updateTransportGroup, setUpdateTransportGroup] = useState({
        id:'',
        isDeleteClicked:false,
        distance_name:'',
        distance_amount:'',
        distance_from:'',
        distance_to:''
    });


    // Use effect
    useEffect(() => {
        const TransportGroupFetcher = async () => {
            const res = await fetchTransportGroups();
            setTransportGroups(res);
        };
        TransportGroupFetcher();
    }, [isViewOpened, updateTransportGroup]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        transportGroups={transportGroups}
                        setUpdateTransportGroup={setUpdateTransportGroup}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        transportGroups={transportGroups}
                        updateTransportGroup={updateTransportGroup}
                        setUpdateTransportGroup={setUpdateTransportGroup}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;