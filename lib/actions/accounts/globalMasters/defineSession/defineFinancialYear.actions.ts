'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import FinancialYear from '@/lib/models/accounts/globalMasters/defineSession/FinancialYear.model';





// Create Financial Year Props
interface CreateFinancialYearProps{
    year_name:String;
    start_date:{
        day:String,
        month:String,
        year:String
    };
    end_date:{
        day:String,
        month:String,
        year:String
    };
    is_active:Boolean;
};
// Create Financial Year
export const createFinancialYear = async ({year_name, start_date, end_date, is_active}:CreateFinancialYearProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new financial year
        const newFinancialYear = await FinancialYear.create({
            year_name,
            start_date:{
                day:start_date.day,
                month:start_date.month,
                year:start_date.year
            },
            end_date:{
                day:end_date.day,
                month:end_date.month,
                year:end_date.year
            },
            is_active
        });
        newFinancialYear.save();
        return newFinancialYear;

        
    } catch (err:any) {
        console.log(`Error Creating Financial Year: ${err.message}`);
    };
};





// Fetch Financial Years
export const fetchFinancialYears = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const financialYears = await FinancialYear.find();
        return financialYears;

    } catch (err:any) {
        throw new Error(`Error fetching financial years: ${err}`);
    };
};




// Modify Financial Years Props
interface ModifyFinancialYearsProps{
    id:String;
    year_name:String;
    start_date:{
        day:String,
        month:String,
        year:String
    };
    end_date:{
        day:String,
        month:String,
        year:String
    };
    is_active:Boolean;
}
// Modify Financial Years
export const modifyFinancialYears = async ({id, year_name, start_date, end_date, is_active}:ModifyFinancialYearsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update Financial Year
        const updatedFinancialYear = await FinancialYear.findByIdAndUpdate(
            id,
            {
                year_name,
                start_date:{
                    day:start_date.day,
                    month:start_date.month,
                    year:start_date.year
                },
                end_date:{
                    day:end_date.day,
                    month:end_date.month,
                    year:end_date.year
                },
                is_active,
            },
            {new:true}
        );
        return updatedFinancialYear;

    } catch (err) {
        throw new Error(`Error updating financial year: ${err}`);
    };
};




// Delete Financial Year
export const deleteFinancialYear = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Financial Year
        await FinancialYear.findByIdAndDelete(id);
        return 'Financial Year Deleted';

    } catch (err) {
        throw new Error(`Error deleting financial year: ${err}`);      
    };
};