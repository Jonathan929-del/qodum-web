'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchTravelMasters} from '@/lib/actions/fees/transport/travelMaster.actions';
import FormCom from '@/components/modules/fees/transport/travelAgencyMaster/FormCom';
import ViewCom from '@/components/modules/fees/transport/travelAgencyMaster/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Travel masters
    const [travelMasters, setTravelMasters] = useState([{}]);


    // Update travel master
    const [updateTravelMaster, setUpdateTravelMaster] = useState({
        id:'',
        isDeleteClicked:false,
        travel_agency_name:'',
        mobile_no:null,
        mail_id:''
    });


    // Use effect
    useEffect(() => {
        const travelMastersFetcher = async () => {
            const res = await fetchTravelMasters();
            setTravelMasters(res);
        };
        travelMastersFetcher();
    }, [isViewOpened, updateTravelMaster]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        travelMasters={travelMasters}
                        setUpdateTravelMaster={setUpdateTravelMaster}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        travelMasters={travelMasters}
                        updateTravelMaster={updateTravelMaster}
                        setUpdateTravelMaster={setUpdateTravelMaster}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;