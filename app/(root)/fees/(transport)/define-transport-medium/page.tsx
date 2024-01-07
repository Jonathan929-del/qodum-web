'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/transportMedium/FormCom';
import ViewCom from '@/components/modules/fees/transport/transportMedium/ViewCom';
import {fetchTransportMediums} from '@/lib/actions/fees/transport/transportMedium.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Transport mediums
    const [transportMediums, setTransportMediums] = useState([{}]);


    // Update transport medium
    const [updateTransportMedium, setUpdateTransportMedium] = useState({
        id:'',
        isDeleteClicked:false,
        transport_medium:''
    });


    // Use effect
    useEffect(() => {
        const TransportMediumFetcher = async () => {
            const res = await fetchTransportMediums();
            setTransportMediums(res);
        };
        TransportMediumFetcher();
    }, [isViewOpened, updateTransportMedium]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        transportMediums={transportMediums}
                        setUpdateTransportMedium={setUpdateTransportMedium}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        transportMediums={transportMediums}
                        updateTransportMedium={updateTransportMedium}
                        setUpdateTransportMedium={setUpdateTransportMedium}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;