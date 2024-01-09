'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import House from '@/lib/models/admission/globalMasters/House.model';





// Create house props
interface CreateHouseProps{
    house_name:String;
};
// Create house
export const createHouse = async ({house_name}:CreateHouseProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the house already exists
        const existinHouse = await House.findOne({house_name});
        if(existinHouse){
            throw new Error('House already exists');
        };


        // Creating new house
        const newHouse = await House.create({house_name});
        newHouse.save();


        // Return
        return newHouse;

        
    } catch (err:any) {
        console.log(`Error creating house: ${err.message}`);
    };
};





// Fetch houses
export const fetchHouses = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const houses = await House.find();
        return houses;

    } catch (err:any) {
        throw new Error(`Error fetching houses: ${err}`);
    };
};




// Modify house props
interface ModifyHouseProps{
    id:String;
    house_name:String;
}
// Modify stationry details
export const modifyHouse = async ({id, house_name}:ModifyHouseProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the house already exists
        const houses = await House.find();
        const existingHouse = await House.findById(id);
        if(existingHouse.house_name !== house_name && houses.map(h => h.house_name).includes(house_name)){throw new Error('House already exists')};


        // Updating house
        const updatedHouse = await House.findByIdAndUpdate(id, {house_name}, {new:true});


        // Return
        return updatedHouse;

    } catch (err) {
        throw new Error(`Error updating house: ${err}`);
    };
};




// Delete house
export const deleteHouse = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting house
        await House.findByIdAndDelete(id);
        return 'House deleted';

    } catch (err) {
        throw new Error(`Error deleting house: ${err}`);      
    };
};