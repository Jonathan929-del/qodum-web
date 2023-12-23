'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import PartyLedger from '@/lib/models/accounts/accounts/PartyLedger.model';





// Create party ledger props
interface CreatePartyLedgerProps{
    account_name:String;
    group:String;
    account_type:String;
    account_address:String;
    account_city:String;
    pin_code:Number;
    email:String;
    mobile:Number;
    pan:Number;
    tin:Number;
    opening_balance:Number;
    opening_balance_type:String;
    assign_date:Date;
};
// Create party ledger
export const createPartyLedger = async ({account_name, group, account_type, account_address, account_city, pin_code, email, mobile, pan, tin, opening_balance, opening_balance_type, assign_date}:CreatePartyLedgerProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Checking if party ledger already exists
        const existingPartyLedger = await PartyLedger.findOne({account_name});
        if(existingPartyLedger){
            throw new Error('Party ledger already exists');
        };


        // Creating new party ledger
        const newPartyLedger = await PartyLedger.create({
            account_name,
            group,
            account_type,
            account_address,
            account_city,
            pin_code, email,
            mobile,
            pan,
            tin,
            opening_balance,
            opening_balance_type,
            assign_date
        });
        newPartyLedger.save();
        return newPartyLedger;

        
    } catch (err:any) {
        console.log(`Error Creating Party Ledger: ${err.message}`);
    }
};





// Fetch Party Ledgers
export const fetchPartyLedgers = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const partyLedgers = await PartyLedger.find();
        return partyLedgers;

        
    } catch (err:any) {
        throw new Error(`Error fetching party ledgers: ${err}`);
    }
};




// Modify Party Ledger Props
interface ModifyPartyLedgerProps{
    id:String;
    account_name:String;
    group:String;
    account_type:String;
    account_address:String;
    account_city:String;
    pin_code:Number;
    email:String;
    mobile:Number;
    pan:Number;
    tin:Number;
    opening_balance:Number;
    opening_balance_type:String;
    assign_date:Date;
}
// Modify Party Ledger
export const modifyPartyLedger = async ({id, account_name, group, account_type, account_address, account_city, pin_code, email, mobile, pan, tin, opening_balance, opening_balance_type, assign_date}:ModifyPartyLedgerProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the party ledger already exists
        const partyLedgers = await PartyLedger.find();
        const existingPartyLedger = await PartyLedger.findById(id);
        if(existingPartyLedger.account_name !== account_name && partyLedgers.map(ledger => ledger.account_name).includes(account_name)){throw new Error('Party ledger already exists')};


        // Update Party Ledger
        const updatedPartyLedger = await PartyLedger.findByIdAndUpdate(id, {account_name, group, account_type, account_address, account_city, pin_code, email, mobile, opening_balance, opening_balance_type, assign_date}, {new:true});
        return updatedPartyLedger;


    } catch (err) {
        throw new Error(`Error updating party ledger: ${err}`);
    }
};




// Delete Party Ledger
export const deletePartyLedger = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Party Ledger
        await PartyLedger.findByIdAndDelete(id);
        return 'Party Ledger Deleted';

    } catch (err) {
        throw new Error(`Error deleting party ledger: ${err}`);      
    }
};