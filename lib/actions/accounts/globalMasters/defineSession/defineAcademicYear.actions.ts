'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create Academic Year Props
interface CreateAcademicYearProps{
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
// Create Academic Year
export const createAcademicYear = async ({year_name, start_date, end_date, is_active}:CreateAcademicYearProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Creating new academic year
        const newAcademicYear = await AcademicYear.create({
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
        newAcademicYear.save();
        return newAcademicYear;

        
    } catch (err:any) {
        console.log(`Error Creating Academic Year: ${err.message}`);
    }
};





// Fetch Academic Years
export const fetchAcademicYears = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const academicYears = await AcademicYear.find();
        return academicYears;

    } catch (err:any) {
        throw new Error(`Error fetching academic years: ${err}`);
    }
};




// Modify Academic Years Props
interface ModifyAcademicYearsProps{
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
// Modify Academic Years
export const modifyAcademicYears = async ({id, year_name, start_date, end_date, is_active}:ModifyAcademicYearsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update Academic Year
        const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(
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
        return updatedAcademicYear;

    } catch (err) {
        throw new Error(`Error updating academic year: ${err}`);
    }
};




// Delete Academic Year
export const deleteAcademicYear = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Academic Year
        await AcademicYear.findByIdAndDelete(id);
        return 'Academic Year Deleted';

    } catch (err) {
        throw new Error(`Error deleting academic year: ${err}`);      
    }
};