'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/vehicleType/FormCom';
import ViewCom from '@/components/modules/fees/transport/vehicleType/ViewCom';
import {fetchVehicleTypes} from '@/lib/actions/fees/transport/vehicleType.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Vehicle types
    const [vehicleTypes, setVehicleTypes] = useState([{}]);


    // Update vehicle type
    const [updateVehicleType, setUpdateVehicleType] = useState({
        id:'',
        isDeleteClicked:false,
        vahicle_name:''
    });


    // Use effect
    useEffect(() => {
        const vehicleTypesFetcher = async () => {
            const res = await fetchVehicleTypes();
            setVehicleTypes(res);
        };
        vehicleTypesFetcher();
    }, [isViewOpened, updateVehicleType]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        vehicleTypes={vehicleTypes}
                        setUpdateVehicleType={setUpdateVehicleType}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        vehicleTypes={vehicleTypes}
                        updateVehicleType={updateVehicleType}
                        setUpdateVehicleType={setUpdateVehicleType}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;