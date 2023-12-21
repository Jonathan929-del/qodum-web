'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AccountGroup from '@/lib/models/accounts/accounts/AccountGroup.model';





// Create bank ledger props
interface CreateAccountGroupProps{
    group_name:String;
    category:String;
    group_type:String;
    group_no:Number;
};
// Create account group
export const createAccountGroup = async ({group_name, category, group_type, group_no}:CreateAccountGroupProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if account group already exists
        const existingAccountGroup = await AccountGroup.findOne({group_name});
        if(existingAccountGroup){
            throw new Error('Account group already exists');
        };


        // Creating new account group
        const newAccountGroup = await AccountGroup.create({
            group_name,
            category,
            group_type,
            group_no
        });
        newAccountGroup.save();
        return newAccountGroup;

        
    } catch (err:any) {
        console.log(`Error Creating Account Group: ${err.message}`);
    }
};





// Fetch Account Groups
export const fetchAccountGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const accountGroups = await AccountGroup.find();
        return accountGroups;

        
    } catch (err:any) {
        throw new Error(`Error fetching account groups: ${err}`);
    }
};




// Modify Account Groups Props
interface ModifyAccountGroupsProps{
    id:String;
    group_name:String;
    category:String;
    group_type:String;
    group_no:Number;
}
// Modify Account Group
export const modifyAccountGroup = async ({id, group_name, category, group_type, group_no}:ModifyAccountGroupsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the account group already exists
        const accountGroups = await AccountGroup.find();
        const existingAccountGroup = await AccountGroup.findById(id);
        if(existingAccountGroup.group_name !== group_name && accountGroups.map(accountGroup => accountGroup.group_name).includes(group_name)){throw new Error('Account group already exists')};


        // Update Account Group
        const updatedAccountGroup = await AccountGroup.findByIdAndUpdate(id, {group_name, category, group_type, group_no}, {new:true});
        return updatedAccountGroup;


    } catch (err) {
        throw new Error(`Error updating account group: ${err}`);
    }
};




// Delete Account Group
export const deleteAccountGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Account Group
        await AccountGroup.findByIdAndDelete(id);
        return 'Account Group Deleted';

    } catch (err) {
        throw new Error(`Error deleting account group: ${err}`);      
    }
};