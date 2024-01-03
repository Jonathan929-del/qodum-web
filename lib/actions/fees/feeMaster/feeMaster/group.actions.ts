'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Group from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeGroup.model';





// Create Group Props
interface CreateGroupProps{
    name:String;
    is_special:Boolean;
};
// Create Group Year
export const createGroup = async ({name, is_special}:CreateGroupProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if the group name already exists
        const existingGroup = await Group.findOne({name});
        if(existingGroup){
            throw new Error('HeaGroupd name already exists');
        };


        // Creating new group
        const newGroup = await Group.create({
            name,
            is_special
        });
        newGroup.save();


        // Return
        return newGroup;

        
    } catch (err:any) {
        console.log(`Error Creating Group: ${err.message}`);
    }
};





// Fetch Groups
export const fetchGroups = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching Groups
        const groups = await Group.find();
        return groups;

    } catch (err:any) {
        throw new Error(`Error fetching groups: ${err}`);
    }
};





// Modify Group Props
interface ModifyGroupProps{
    id:String;
    name:String;
    is_special:Boolean;
}
// Modify group with id
export const modifyGroup = async ({id, name, is_special}:ModifyGroupProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the group name already exists
        const groups = await Group.find();
        const existingGroup = await Group.findById(id);
        if(existingGroup.name !== name && groups.map(i => i.name).includes(name)){throw new Error('Group name already exists')};


        // Update group
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            {
                name,
                is_special
            },
            {new:true}
        );


        // Return 
        return updatedGroup;

    } catch (err) {
        throw new Error(`Error updating groups: ${err}`);
    }
};





// Delete group
export const deleteGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting group
        await Group.findByIdAndDelete(id);
        return 'Group Deleted';

    } catch (err) {
        throw new Error(`Error deleting group: ${err}`);      
    }
};