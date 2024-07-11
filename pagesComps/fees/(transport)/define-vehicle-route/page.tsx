'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/vehicleRoute/FormCom';
import ViewCom from '@/components/modules/fees/transport/vehicleRoute/ViewCom';
import {fetchVehicleRoutes} from '@/lib/actions/fees/transport/vehicleRoute.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Vehicle routes
    const [vehicleRoutes, setVehicleRoutes] = useState([{}]);


    // Update vehicle route
    const [updateVehicleRoute, setUpdateVehicleRoute] = useState({
        id:'',
        isDeleteClicked:false,
        route_no:'',
        route_description:'',
        route_in_charge_name:'',
        route_in_charge_mobile_no:''
    });


    // Use effect
    useEffect(() => {
        const vehicleRoutesFetcher = async () => {
            const res = await fetchVehicleRoutes();
            setVehicleRoutes(res);
        };
        vehicleRoutesFetcher();
    }, [isViewOpened, updateVehicleRoute]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        vehicleRoutes={vehicleRoutes}
                        setUpdateVehicleRoute={setUpdateVehicleRoute}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        vehicleRoutes={vehicleRoutes}
                        updateVehicleRoute={updateVehicleRoute}
                        setUpdateVehicleRoute={setUpdateVehicleRoute}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;