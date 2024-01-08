'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Religion from '@/lib/models/admission/globalMasters/Religion.model';





// Create religion Props
interface CreateReligionProps{
    religion_name:String,
};
// Create religion
export const createReligion = async ({religion_name}:CreateReligionProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the religion name already exists
        const existinReligion = await Religion.findOne({religion_name});
        if(existinReligion){
            throw new Error('Religion name already exists');
        };


        // Creating new religion
        const newReligion = await Religion.create({religion_name});
        newReligion.save();


        // Return
        return newReligion;

        
    } catch (err:any) {
        console.log(`Error creating religion: ${err.message}`);
    };
};





// Fetch religions
export const fetchReligions = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const religions = await Religion.find();
        return religions;

    } catch (err:any) {
        throw new Error(`Error fetching religions: ${err}`);
    };
};




// Modify religion props
interface ModifyReligionProps{
    id:String;
    religion_name:String;
}
// Modify religion
export const modifyReligion = async ({id, religion_name}:ModifyReligionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the religion already exists
        const religions = await Religion.find();
        const existingReligion = await Religion.findById(id);
        if(existingReligion.religion_name !== religion_name && religions.map(r => r.religion_name).includes(religion_name)){throw new Error('Religion already exists')};


        // Updating religion
        const updatedReligion = await Religion.findByIdAndUpdate(id, {religion_name}, {new:true});


        // Return
        return updatedReligion;

    } catch (err) {
        throw new Error(`Error updating religion: ${err}`);
    };
};




// Delete religion
export const deleteReligion = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting religion
        await Religion.findByIdAndDelete(id);
        return 'Religion Deleted';

    } catch (err) {
        throw new Error(`Error deleting religion: ${err}`);      
    };
};