'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import TravelMaster from '@/lib/models/fees/transport/TravelMaster.model';





// Create Travel Master Props
interface CreateTravelMasterProps{
    travel_agency_name:String;
    mobile_no:Number;
    mail_id:String;
};
// Create travel master
export const createTravelMaster = async ({travel_agency_name, mobile_no, mail_id}:CreateTravelMasterProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new travel master
        const newTravelMaster = await TravelMaster.create({travel_agency_name, mobile_no, mail_id});
        newTravelMaster.save();


        // Return
        return newTravelMaster;

        
    } catch (err:any) {
        console.log(`Error creating travel master: ${err.message}`);
    };
};





// Fetch travel masters
export const fetchTravelMasters = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const travelMasters = await TravelMaster.find();
        return travelMasters;

    } catch (err:any) {
        throw new Error(`Error fetching travel masters: ${err}`);
    };
};




// Modify travel master Props
interface ModifyTravelMasterProps{
    id:String;
    travel_agency_name:String;
    mobile_no:Number;
    mail_id:String;
};
// Modify travel master
export const modifyTravelMaster = async ({id, travel_agency_name, mobile_no, mail_id}:ModifyTravelMasterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating travel master
        const updatedTravelMaster = await TravelMaster.findByIdAndUpdate(id, {travel_agency_name, mobile_no, mail_id}, {new:true});


        // Return
        return updatedTravelMaster;

    } catch (err) {
        throw new Error(`Error updating travel master: ${err}`);
    };
};





// Delete travel master
export const deleteTravelMaster = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting board
        await TravelMaster.findByIdAndDelete(id);
        return 'Travel master Deleted';

    } catch (err) {
        throw new Error(`Error deleting travel master: ${err}`);
    };
};