'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchRouteStops} from '@/lib/actions/fees/transport/routeStop.actions';
import FormCom from '@/components/modules/fees/transport/routeStop/FormCom';
import ViewCom from '@/components/modules/fees/transport/routeStop/ViewCom';
import { fetchVehicleRoutes } from '@/lib/actions/fees/transport/vehicleRoute.actions';
import { fetchTransportGroups } from '@/lib/actions/fees/transport/transportGroup.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Route stops
    const [routeStops, setRouteStops] = useState([{}]);


    // Update route stop
    const [updateRouteStop, setUpdateRouteStop] = useState({
        id:'',
        isDeleteClicked:false,
        route_no:'',
        stop_no:'',
        stop_name:'',
        morning_arrival_time:{
            hour:'01',
            minute:'00',
            meridiem:'AM'
        },
        afternoon_arrival_time:{
            hour:'01',
            minute:'00',
            meridiem:'PM'
        },
        transport_groups:{
            jan:'',
            feb:'',
            mar:'',
            apr:'',
            may:'',
            jun:'',
            jul:'',
            aug:'',
            sep:'',
            oct:'',
            nov:'',
            dec:''
        }
    });


    // Vehicle routes
    const [vehicleRoutes, setVehicleRoutes] = useState([{}]);


    // Transport groups
    const [transportGroups, setTransportGroups] = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const routeStopsRes = await fetchRouteStops();
            const vehiclesRoutesRes = await fetchVehicleRoutes();
            const transportGroupsRes = await fetchTransportGroups();
            setRouteStops(routeStopsRes);
            setVehicleRoutes(vehiclesRoutesRes);
            setTransportGroups(transportGroupsRes);
        };
        fetcher();
    }, [isViewOpened, updateRouteStop]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        routeStops={routeStops}
                        setUpdateRouteStop={setUpdateRouteStop}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        routeStops={routeStops}
                        updateRouteStop={updateRouteStop}
                        setUpdateRouteStop={setUpdateRouteStop}
                        vehicleRoutes={vehicleRoutes}
                        transportGroups={transportGroups}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;