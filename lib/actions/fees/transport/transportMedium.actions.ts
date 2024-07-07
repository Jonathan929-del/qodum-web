'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import TransportMedium from '@/lib/models/fees/transport/TransportMedium.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create Transport Medium Props
interface CreateTransportMediumProps{
    transport_medium:String;
};
// Create transport mediun
export const createTransportMedium = async ({transport_medium}:CreateTransportMediumProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the transport medium already exists
        const existingTransportMedium = await TransportMedium.findOne({transport_medium});
        if(existingTransportMedium){
            throw new Error('Transport medium already exists');
        };


        // Creating new transport medium
        const newTranportMedium = await TransportMedium.create({session:activeSession.year_name, transport_medium});
        newTranportMedium.save();


        // Return
        return newTranportMedium;

        
    } catch (err:any) {
        console.log(`Error creating transport medium: ${err.message}`);
    };
};





// Fetch transport mediums
export const fetchTransportMediums = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const transportMediums = await TransportMedium.find();
        return transportMediums;

    } catch (err:any) {
        throw new Error(`Error fetching transport mediums: ${err}`);
    };
};





// Modify transport medium props
interface ModifyTransportMediumProps{
    id:String;
    transport_medium:String;
};
// Modify transport medium
export const modifyTransportMedium = async ({id, transport_medium}:ModifyTransportMediumProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the transport medium already exists
        const transportMediums = await TransportMedium.find();
        const existingTransportMedium = await TransportMedium.findById(id);
        if(existingTransportMedium.transport_medium !== transport_medium && transportMediums.map(i => i.transport_medium).includes(transport_medium)){throw new Error('Transport medium already exists')};


        // Updating transport medium
        const updatedTransportMedium = await TransportMedium.findByIdAndUpdate(id, {transport_medium}, {new:true});


        // Return
        return updatedTransportMedium;

    } catch (err) {
        throw new Error(`Error updating transport medium: ${err}`);
    };
};





// Delete transport medium
export const deleteTransportMedium = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting transport medium
        await TransportMedium.findByIdAndDelete(id);
        return 'Transport medium deleted';

    } catch (err) {
        throw new Error(`Error deleting transport medium: ${err}`);      
    };
};