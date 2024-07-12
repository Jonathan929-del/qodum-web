'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import RouteStop from '@/lib/models/fees/transport/RouteStop.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Route stop props
interface CreateRouteStopProps{
    route_no:String;
    stop_no:String;
    stop_name:String;
    morning_arrival_time:{
        hour:String;
        minute:String;
        meridiem:String;
    };
    afternoon_arrival_time:{
        hour:String;
        minute:String;
        meridiem:String;
    };
    transport_groups:{
        jan:String;
        feb:String;
        mar:String;
        apr:String;
        may:String;
        jun:String;
        jul:String;
        aug:String;
        sep:String;
        oct:String;
        nov:String;
        dec:String;
    };
};
// Create route stop
export const createRouteStop = async ({route_no, stop_no, stop_name, morning_arrival_time, afternoon_arrival_time, transport_groups}:CreateRouteStopProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new route stop
        const newRouteStop = await RouteStop.create({session:activeSession.year_name, route_no, stop_no, stop_name, morning_arrival_time, afternoon_arrival_time, transport_groups});
        newRouteStop.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating route stop: ${err.message}`);
    }
};





// Fetch route stops
export const fetchRouteStops = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching route stops
        const routesStops = await RouteStop.find();
        return routesStops;

    } catch (err:any) {
        throw new Error(`Error fetching route stops: ${err}`);
    }
};





// Modify route stop props
interface ModifyRouteStopProps{
    id:String;
    route_no:String;
    stop_no:String;
    stop_name:String;
    morning_arrival_time:{
        hour:String;
        minute:String;
        meridiem:String;
    };
    afternoon_arrival_time:{
        hour:String;
        minute:String;
        meridiem:String;
    };
    transport_groups:{
        jan:String;
        feb:String;
        mar:String;
        apr:String;
        may:String;
        jun:String;
        jul:String;
        aug:String;
        sep:String;
        oct:String;
        nov:String;
        dec:String;
    };
}
// Modify route stop
export const modifyRouteStop = async ({id, route_no, stop_no, stop_name, morning_arrival_time, afternoon_arrival_time, transport_groups}:ModifyRouteStopProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update vehicle type
        const updateRouteStop = await RouteStop.findByIdAndUpdate(id, {route_no, stop_no, stop_name, morning_arrival_time, afternoon_arrival_time, transport_groups}, {new:true});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating route stop: ${err}`);
    }
};





// Delete route stop
export const deleteRouteStop = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting route stop
        await RouteStop.findByIdAndDelete(id);
        return 'Route stop deleted';

    } catch (err) {
        throw new Error(`Error deleting route stop: ${err}`);      
    }
};