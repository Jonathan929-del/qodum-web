'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import VehicleRoute from '@/lib/models/fees/transport/VehicleRoute.model';





// Create vehicle route props
interface CreateVehicleRouteProps{
    route_no:Number;
    vehicle_description:String;
    route_in_charge_name:String;
    route_in_charge_mobile_no:Number;
};
// Create vehicle route
export const createVehicleRoute = async ({route_no, vehicle_description, route_in_charge_name, route_in_charge_mobile_no}:CreateVehicleRouteProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the route no. already exists
        const existingVehicleRoute = await VehicleRoute.findOne({route_no});
        if(existingVehicleRoute){
            throw new Error('Vehicle route already exists');
        };


        // Creating new vehicle route
        const newVehicleRoute = await VehicleRoute.create({route_no, vehicle_description, route_in_charge_name, route_in_charge_mobile_no});
        newVehicleRoute.save();


        // Return
        return newVehicleRoute;


    } catch (err:any) {
        console.log(`Error Creating Vehicle Route: ${err.message}`);
    }
};





// Fetch vehicle routes
export const fetchVehicleRoutes = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching vehicle routes
        const vehicleRoutes = await VehicleRoute.find();
        return vehicleRoutes;

    } catch (err:any) {
        throw new Error(`Error fetching vehicle routes: ${err}`);
    }
};





// Modify vehecle routes props
interface ModifyVehicleRoutesProps{
    id:String;
    route_no:Number;
    vehicle_description:String;
    route_in_charge_name:String;
    route_in_charge_mobile_no:Number;
}
// Modify vehicle route
export const modifyVehicleRoute = async ({id, route_no, vehicle_description, route_in_charge_name, route_in_charge_mobile_no}:ModifyVehicleRoutesProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the route no. exists
        const vehicleRoutes = await VehicleRoute.find();
        const existingVehicleRoute = await VehicleRoute.findById(id);
        if(existingVehicleRoute.route_no !== route_no && vehicleRoutes.map(i => i.route_no).includes(route_no)){throw new Error('Vehicle route no. already exists')};


        // Update vehicle route
        const updatedVehicleRoute = await VehicleRoute.findByIdAndUpdate(id, {route_no, vehicle_description, route_in_charge_name, route_in_charge_mobile_no}, {new:true});


        // Return 
        return updatedVehicleRoute;

    } catch (err) {
        throw new Error(`Error updating vehicle route: ${err}`);
    }
};





// Delete vehicle route
export const deleteVehicleRoute = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting vehicle route
        await VehicleRoute.findByIdAndDelete(id);
        return 'Vehicle route deleted';

    } catch (err) {
        throw new Error(`Error deleting vehicle route: ${err}`);      
    }
};