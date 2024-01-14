'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import StationaryDetails from '@/lib/models/admission/globalMasters/StationaryDetails.model';





// Create stationary details props
interface CreateStationaryDetailsProps{
    stationary_name:String;
    amount:Number;
    post_account_name:String;
    school_name:String;
    session:String;
};
// Create stationary details
export const createStationaryDetails = async ({stationary_name, amount, post_account_name, school_name, session}:CreateStationaryDetailsProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the stationary name already exists
        const existinStationaryDetails = await StationaryDetails.findOne({stationary_name});
        if(existinStationaryDetails){
            throw new Error('Stationary name already exists');
        };


        // Creating new stationary details
        const newStationaryDetails = await StationaryDetails.create({stationary_name, amount, post_account_name, school_name, session});
        newStationaryDetails.save();


        // Return
        return newStationaryDetails;

        
    } catch (err:any) {
        console.log(`Error creating stationary details: ${err.message}`);
    };
};





// Fetch stationary details
export const fetchStationaryDetails = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const stationaryDetails = await StationaryDetails.find();
        return stationaryDetails;

    } catch (err:any) {
        throw new Error(`Error fetching stationary details: ${err}`);
    };
};




// Modify stationary details props
interface ModifyStationaryDetailsProps{
    id:String;
    stationary_name:String;
    amount:Number;
    post_account_name:String;
    school_name:String;
    session:String;
}
// Modify stationry details
export const modifyStationaryDetails = async ({id, stationary_name, amount, post_account_name, school_name, session}:ModifyStationaryDetailsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the stationary details already exists
        const stationaryDetails = await StationaryDetails.find();
        const existingStationaryDetails = await StationaryDetails.findById(id);
        if(existingStationaryDetails.stationary_name !== stationary_name && stationaryDetails.map(s => s.stationary_name).includes(stationary_name)){throw new Error('Stationary name already exists')};


        // Updating stationary details
        const updatedStationaryDetails = await StationaryDetails.findByIdAndUpdate(id, {stationary_name, amount, post_account_name, school_name, session}, {new:true});


        // Return
        return updatedStationaryDetails;

    } catch (err) {
        throw new Error(`Error updating stationary details: ${err}`);
    };
};




// Delete stationary details
export const deleteStationaryDetails = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting stationary details
        await StationaryDetails.findByIdAndDelete(id);
        return 'Stationary details deleted';

    } catch (err) {
        throw new Error(`Error deleting stationary details: ${err}`);      
    };
};