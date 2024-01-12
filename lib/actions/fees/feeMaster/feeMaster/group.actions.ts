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





// Fee group to fee head props
interface AssignFeeGroupToFeeHeadProps{
    group_name:String;
    affiliated_heads:{
        type_name:String;
        head_name:String;
        schedule_type:String;
        installment:String;
        account:String;
        post_account:String;
    }[]
};
// Fee group to fee head
// export const assignFeeGroupToFeeHead = async ({group_name, affiliated_heads:[{type_name, head_name, schedule_type, installment, account, post_account}]}:AssignFeeGroupToFeeHeadProps) => {
export const assignFeeGroupToFeeHead = async ({group_name, affiliated_heads}:AssignFeeGroupToFeeHeadProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Assigning
        const group = await Group.findOne({name:group_name});
        await Group.findOneAndUpdate(
            {name:group_name},
            {affiliated_heads:affiliated_heads.map((head:any) => {
                return {
                    type_name:head.type_name,
                    head_name:head.head_name,
                    schedule_type:head.schedule_type,
                    installment:head.installment,
                    account:head.account,
                    post_account:head.post_account
                }
            })},
            {new:true}
        );
        

    } catch (err) {
        throw new Error(`Error assigning fee group to fee head: ${err}`);      
    }
};