'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import BloodGroup from '@/lib/models/admission/globalMasters/BloodGroup.model';





// Create blood group props
interface CreateBloodGroupProps{
    blood_group:String,
};
// Create blood group
export const createBloodGroup = async ({blood_group}:CreateBloodGroupProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Checking if the blood group already exists
        const existingBloodGroup = await BloodGroup.findOne({blood_group});
        if(existingBloodGroup){
            throw new Error('Blood group already exists');
        };


        // Creating new blood group
        const newBloodGroup = await BloodGroup.create({blood_group});
        newBloodGroup.save();


        // Return
        return newBloodGroup;

        
    } catch (err:any) {
        console.log(`Error creating blood group: ${err.message}`);
    };
};





// Fetch blood groups 
export const fetchBloodGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const bloodGroups = await BloodGroup.find();
        return bloodGroups;

    } catch (err:any) {
        throw new Error(`Error fetching blood groups: ${err}`);
    };
};




// Modify blood group props
interface ModifyBloodGroupProps{
    id:String;
    blood_group:String;
}
// Modify blood group
export const modifyBloodGroup = async ({id, blood_group}:ModifyBloodGroupProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the blood group already exists
        const bloodGroups = await BloodGroup.find();
        const existingBloodGroup = await BloodGroup.findById(id);
        if(existingBloodGroup.blood_group !== blood_group && bloodGroups.map(r => r.blood_group).includes(blood_group)){throw new Error('Blood group already exists')};


        // Updating blood group
        const updatedBloodGroup = await BloodGroup.findByIdAndUpdate(id, {blood_group}, {new:true});


        // Return
        return updatedBloodGroup;

    } catch (err) {
        throw new Error(`Error updating blood group: ${err}`);
    };
};




// Delete blood group
export const deleteBloodGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting blood group
        await BloodGroup.findByIdAndDelete(id);
        return 'Blood Group Deleted';

    } catch (err) {
        throw new Error(`Error deleting blood group: ${err}`);      
    };
};