'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import TransportGroup from '@/lib/models/fees/transport/TransportGroup.model';





// Create Transport Group Props
interface CreateTransportGroupProps{
    distance_name:String;
    distance_amount:Number;
    distance_from:Number;
    distance_to:Number;
};
// Create transport group
export const createTransportGroup = async ({distance_name, distance_amount, distance_from, distance_to}:CreateTransportGroupProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the distance name already exists
        const existingTransportGroup = await TransportGroup.findOne({distance_name});
        if(existingTransportGroup){
            throw new Error('Distance name already exists');
        };


        // Creating new transport group
        const newTranportGroup = await TransportGroup.create({distance_name, distance_amount, distance_from, distance_to});
        newTranportGroup.save();


        // Return
        return newTranportGroup;

        
    } catch (err:any) {
        console.log(`Error creating transport group: ${err.message}`);
    };
};





// Fetch transport groups
export const fetchTransportGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const transportGroups = await TransportGroup.find();
        return transportGroups;

    } catch (err:any) {
        throw new Error(`Error fetching transport groups: ${err}`);
    };
};




// Modify transport groups props
interface ModifyTransportGroupProps{
    id:String;
    distance_name:String;
    distance_amount:Number;
    distance_from:Number;
    distance_to:Number;
};
// Modify transport group
export const modifyTransportGroup = async ({id, distance_name, distance_amount, distance_from, distance_to}:ModifyTransportGroupProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the distance name already exists
        const transportGroups = await TransportGroup.find();
        const existingTransportGroup = await TransportGroup.findById(id);
        if(existingTransportGroup.distance_name !== distance_name && transportGroups.map(i => i.distance_name).includes(distance_name)){throw new Error('Distance name already exists')};


        // Updating transport group
        const updatedTransports = await TransportGroup.findByIdAndUpdate(id, {distance_name, distance_amount, distance_from, distance_to}, {new:true});


        // Return
        return updatedTransports;

    } catch (err) {
        throw new Error(`Error updating transport group: ${err}`);
    };
};





// Delete transport group
export const deleteTransportGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting transport group
        await TransportGroup.findByIdAndDelete(id);
        return 'Transport group deleted';

    } catch (err) {
        throw new Error(`Error deleting transport group: ${err}`);      
    };
};