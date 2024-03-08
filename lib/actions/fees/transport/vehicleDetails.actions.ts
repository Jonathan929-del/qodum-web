'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import VehicleDetails from '@/lib/models/fees/transport/VehicleDetails.model';





// Create vehicle details props
interface CreateVehicleTDetailsProps{
    vehicle_owner:String;
    vehicle_type:String;
    vehicle_name:String;
    vehicle_reg_no:String;
    driver_name:String;
    attendent_name:String;
    fule_type:String;
    seating_capacity:Number;
    facility_in_bus:{
        cctv:Boolean;
        wifi:Boolean;
        gps:Boolean;
        ac:Boolean;
    };
    driver_mobile_no:String;
    gps_no:String;
    service_due_date:String;
    insurance_due_date:String;
    vendor:String;
};
// Create vehicle details
export const createVehicleDetails = async ({vehicle_owner, vehicle_type, vehicle_name, vehicle_reg_no, driver_name, attendent_name, fule_type, seating_capacity, facility_in_bus, driver_mobile_no, gps_no, service_due_date, insurance_due_date, vendor}:CreateVehicleTDetailsProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new vehicle details
        const newVehicleDetails = await VehicleDetails.create({vehicle_owner, vehicle_type, vehicle_name, vehicle_reg_no, driver_name, attendent_name, fule_type, seating_capacity, facility_in_bus, driver_mobile_no, gps_no, service_due_date, insurance_due_date, vendor});
        newVehicleDetails.save().then(async () => {
            await VehicleDetails.findByIdAndUpdate(newVehicleDetails._id, {routes:[]});
        });


        // Return
        return newVehicleDetails;


    } catch (err:any) {
        console.log(`Error Creating Vehicle Details: ${err.message}`);
    }
};





// Fetch vehicles details
export const fetchVehiclesDetails = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching vehicles details
        const vehiclesDetails = await VehicleDetails.find();
        return vehiclesDetails;

    } catch (err:any) {
        throw new Error(`Error fetching vehicles details: ${err}`);
    }
};





// Modify vehecle details props
interface ModifyVehicleDetailsProps{
    id:String;
    vehicle_owner:String;
    vehicle_type:String;
    vehicle_name:String;
    vehicle_reg_no:String;
    driver_name:String;
    attendent_name:String;
    fule_type:String;
    seating_capacity:Number;
    facility_in_bus:{
        cctv:Boolean;
        wifi:Boolean;
        gps:Boolean;
        ac:Boolean;
    };
    driver_mobile_no:String;
    gps_no:String;
    service_due_date:String;
    insurance_due_date:String;
    vendor:String;
}
// Modify vehicle details
export const modifyVehicleDetails = async ({id, vehicle_owner, vehicle_type, vehicle_name, vehicle_reg_no, driver_name, attendent_name, fule_type, seating_capacity, facility_in_bus, driver_mobile_no, gps_no, service_due_date, insurance_due_date, vendor}:ModifyVehicleDetailsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update vehicle details
        const updatedVehicleDetails = await VehicleDetails.findByIdAndUpdate(id, {vehicle_owner, vehicle_type, vehicle_name, vehicle_reg_no, driver_name, attendent_name, fule_type, seating_capacity, facility_in_bus, driver_mobile_no, gps_no, service_due_date, insurance_due_date, vendor}, {new:true});


        // Return 
        return updatedVehicleDetails;

    } catch (err) {
        throw new Error(`Error updating vehicle name: ${err}`);
    }
};





// Delete vehicle details
export const deleteVehicleDetails = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting vehicle details
        await VehicleDetails.findByIdAndDelete(id);
        return 'Vehicle details deleted';

    } catch (err) {
        throw new Error(`Error deleting vehicle details: ${err}`);      
    }
};





// Relate vehicle to route
export const relateVehicleToRoute = async ({id, routes}:{id:String, routes:any}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting vehicle details
        await VehicleDetails.findByIdAndUpdate(id, {routes});
        return 'Vehicle routes updated';

    } catch (err) {
        throw new Error(`Error updating vehicle routes: ${err}`);      
    }
};