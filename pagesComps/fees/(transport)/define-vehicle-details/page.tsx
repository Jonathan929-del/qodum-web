'use client';
// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/fees/transport/vehicleDetails/FormCom';
import ViewCom from '@/components/modules/fees/transport/vehicleDetails/ViewCom';
import {fetchVehicleTypes} from '@/lib/actions/fees/transport/vehicleType.actions';
import {fetchTravelMasters} from '@/lib/actions/fees/transport/travelMaster.actions';
import {fetchVehiclesDetails} from '@/lib/actions/fees/transport/vehicleDetails.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Vehicle details
    const [vehiclesDetails, setVehiclesDetails] = useState([{}]);


    // Vehicles Types
    const [vehiclesTypes, setVehiclesTypes] = useState(['']);


    // Update vehicle details
    const [updateVehicleDetails, setUpdateVehicleDetails] = useState({
        id:'',
        isDeleteClicked:false,
        vehicle_owner:'school',
        vehicle_type:'',
        vehicle_name:'',
        vehicle_reg_no:'',
        driver_name:'',
        attendent_name:'',
        fule_type:'',
        seating_capacity:0,
        facility_in_bus:{
            cctv:false,
            wifi:false,
            gps:false,
            ac:false
        },
        driver_mobile_no:'',
        gps_no:'',
        service_due_date:moment(new Date()).format('D-MMM-yy'),
        insurance_due_date:moment(new Date()).format('D-MMM-yy'),
        vendor:''
    });


    // Vendors
    const [vendors, setVendors] = useState([{}]);


    // Use effect
    useEffect(() => {
        const vehicleDetailsFetcher = async () => {
            const vehiclesDetailsRes = await fetchVehiclesDetails();
            const vehicelesTypesRes = await fetchVehicleTypes();
            const vendorsRes = await fetchTravelMasters();
            setVehiclesDetails(vehiclesDetailsRes);
            setVehiclesTypes(vehicelesTypesRes.map((v:any) => v.vehicle_name));
            setVendors(vendorsRes);
        };
        vehicleDetailsFetcher();
    }, [isViewOpened, updateVehicleDetails]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        setIsViewOpened={setIsViewOpened}
                        vehiclesDetails={vehiclesDetails}
                        setUpdateVehicleDetails={setUpdateVehicleDetails}
                    />
                ) : (
                    <FormCom
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        vehiclesTypes={vehiclesTypes}
                        vehiclesDetails={vehiclesDetails}
                        updateVehicleDetails={updateVehicleDetails}
                        setUpdateVehicleDetails={setUpdateVehicleDetails}
                        vendors={vendors}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;