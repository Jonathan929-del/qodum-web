'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Installment from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeInstallment.model';





// Create Installment Props
interface CreateInstallmentProps{
    name:String;
    print_name:String;
    preference_no:Number;
    due_on_date:{
        day:String,
        month:String,
        year:String
    };
    due_date:{
        day:String,
        month:String,
        year:String
    };
    months:string[];
};
// Create Installment Year
export const createInstallment = async ({name, print_name, preference_no, due_on_date, due_date, months}:CreateInstallmentProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');
        console.log(months);


        // Checking if the installment name already exists
        const existingInstallment = await Installment.findOne({name});
        if(existingInstallment){
            throw new Error('Installment name already exists');
        };


        // Checking if the preference no. already exists
        const installments = await Installment.find();
        if(installments.map((installment:any) => installment.preference_no).includes(preference_no)){
            throw new Error('Preference number already exists');
        };


        // Creating new installment
        const newInstallment = await Installment.create({
            name,
            print_name,
            preference_no,
            due_on_date:{
                day:due_on_date.day,
                month:due_on_date.month,
                year:due_on_date.year
            },
            due_date:{
                day:due_date.day,
                month:due_date.month,
                year:due_date.year
            },
            months
        });
        newInstallment.save();


        // Return
        return newInstallment;

        
    } catch (err:any) {
        console.log(`Error Creating Installment: ${err.message}`);
    }
};





// Fetch Installments
export const fetchInstallments = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching installments
        const installments = await Installment.find();
        return installments;

    } catch (err:any) {
        throw new Error(`Error fetching installments: ${err}`);
    }
};





// Modify Installment Props
interface ModifyInstallmentProps{
    id:String;
    name:String;
    print_name:String;
    preference_no:Number;
    due_on_date:{
        day:String,
        month:String,
        year:String
    };
    due_date:{
        day:String,
        month:String,
        year:String
    };
    months:String[];
}
// Modify Installment with id
export const modifyInstallment = async ({id, name, print_name, preference_no, due_on_date, due_date, months}:ModifyInstallmentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the year name already exists
        const installments = await Installment.find();
        const existingInstallment = await Installment.findById(id);
        if(existingInstallment.name !== name && installments.map(i => i.name).includes(name)){throw new Error('Installment name already exists')};

        // Checking if the preference number already exists
        if(existingInstallment.preference_no !== preference_no && installments.map(i => i.preference_no).includes(preference_no)){throw new Error('Preference number already exists')};


        // Update installment
        const updatedInstallment = await Installment.findByIdAndUpdate(
            id,
            {
                name,
                print_name,
                preference_no,
                due_on_date:{
                    day:due_on_date.day,
                    month:due_on_date.month,
                    year:due_on_date.year
                },
                due_date:{
                    day:due_date.day,
                    month:due_date.month,
                    year:due_date.year
                },
                months
            },
            {new:true}
        );


        // Return 
        return updatedInstallment;

    } catch (err) {
        throw new Error(`Error updating installment: ${err}`);
    }
};





// Delete Insallment
export const deleteInstallment = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting installment
        await Installment.findByIdAndDelete(id);
        return 'Installment Deleted';

    } catch (err) {
        throw new Error(`Error deleting installment: ${err}`);      
    }
};