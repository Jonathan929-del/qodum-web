'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchVehicleRoutes} from '@/lib/actions/fees/transport/vehicleRoute.actions';
import FormCom from '@/components/modules/fees/transport/vehiclesRoutesRelation/FormCom';
import ViewCom from '@/components/modules/fees/transport/vehiclesRoutesRelation/ViewCom';
import {fetchVehiclesDetails} from '@/lib/actions/fees/transport/vehicleDetails.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Vehicles
    const [vehicles, setVehicles] = useState([{}]);


    // Routes
    const [routes, setRoutes] = useState([{}]);


    // Selected routes
    const [selectedRoutes, setSelectedRoutes] = useState([{}]);


    // vehicle id
    const [selectedVehicle, setSelectedVehicle] = useState({});


    // Update route
    const [updateRoute, setUpdateRoute] = useState({
        id:'',
        isDeleteClicked:false
    });


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const vehiclesRes = await fetchVehiclesDetails();
            const routesRes = await fetchVehicleRoutes();
            setVehicles(vehiclesRes);
            setRoutes(routesRes);
        };
        fetcher();
    }, [isViewOpened, updateRoute]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        vehicles={vehicles}
                        setUpdateRoute={setUpdateRoute}
                        setSelectedVehicle={setSelectedVehicle}
                    />
                ) : (
                    <FormCom
                        setIsViewOpened={setIsViewOpened}
                        vehicles={vehicles}
                        routes={routes}
                        updateRoute={updateRoute}
                        setUpdateRoute={setUpdateRoute}
                        selectedRoutes={selectedRoutes}
                        setSelectedRoutes={setSelectedRoutes}
                        selectedVehicle={selectedVehicle}
                        setSelectedVehicle={setSelectedVehicle}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;