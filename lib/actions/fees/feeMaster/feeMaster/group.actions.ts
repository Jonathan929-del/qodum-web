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
export const assignFeeGroupToFeeHead = async ({group_name, affiliated_heads}:AssignFeeGroupToFeeHeadProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Assigning
        console.log(affiliated_heads);
        await Group.findOneAndUpdate(
            {name:group_name},
            {affiliated_heads},
            {new:true}
        );
        

    } catch (err) {
        throw new Error(`Error assigning fee group to fee head: ${err}`);      
    }
};





// Fetch group by name
export const fetchGroupByName = async ({name}:{name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching group
        const group = await Group.findOne({name});
        return group;

    } catch (err) {
        throw new Error(`Error fetching group: ${err}`);      
    }
};





// Assign amount group props
interface AssignAmountGroupValidation{
    group_name:String;
    installment:String;
    affiliated_heads:{
        head_name:String;
        amount:Number;
    }[]
};
// Assign amount group
export const assignAmountGroup = async ({group_name, installment, affiliated_heads}:AssignAmountGroupValidation) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Selected installment in group
        const group = await Group.findOne({name:group_name});
        const selectedHeads = group.affiliated_heads.filter((head:any) => head.installment === installment);
        const newHeads = selectedHeads.map((head:any) => {
            return{
                ...head,
                amount:affiliated_heads[selectedHeads.indexOf(head)].amount
            }
        });
        const unselectedHeads = group.affiliated_heads.filter((head:any) => head.installment !== installment);


        // Assigning
        await Group.findOneAndUpdate(
            {name:group_name},
            {affiliated_heads:[...newHeads, ...unselectedHeads]},
            {new:true}
        );
        

    } catch (err) {
        throw new Error(`Error assigning fee group amount: ${err}`);      
    }
};





// Fetch group heads using installment props
interface FetchGroupHeadWithInstallmentValidation{
    group_name:String;
    installment:String;
};
// Fetch group heads using installment
export const fetchGroupHeadWithInstallment = async ({group_name, installment}:FetchGroupHeadWithInstallmentValidation) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Selected installment in group
        const group = await Group.findOne({name:group_name});
        const selectedHeads = group.affiliated_heads.filter((head:any) => head.installment === installment);


        // Return
        return selectedHeads;

    } catch (err) {
        throw new Error(`Error fetching group: ${err}`);      
    }
};