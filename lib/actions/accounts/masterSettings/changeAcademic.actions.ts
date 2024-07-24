'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import FinancialYear from '@/lib/models/accounts/globalMasters/defineSession/FinancialYear.model';
import SchoolGlobalDetails from '@/lib/models/fees/globalMasters/defineSchool/SchoolGlobalDetails.model';





// Fetch Academic Years Names
export const fetchAcademicYearsNames = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const academicYears = await AcademicYear.find();
        const yearsNames = academicYears.map(year => year?.year_name);
        const activeAcademicYear = academicYears.filter(year => year.is_active)[0]?.year_name;
        return {yearsNames, activeAcademicYear};

    } catch (err:any) {
        throw new Error(`Error fetching academic years names: ${err}`);
    }
};





// Fetch Financial Years Names
export const fetchFinancialYearsNames = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const financialYears = await FinancialYear.find();
        const yearsNames = financialYears.map(year => year?.year_name);
        const activeFinancialYear = financialYears.filter(year => year.is_active)[0]?.year_name;
        return {yearsNames, activeFinancialYear};

    } catch (err:any) {
        throw new Error(`Error fetching financial years names: ${err}`);
    }
};





// Fetch Schools Names
export const fetchSchoolsNames = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const schools = await SchoolGlobalDetails.find();
        const schoolsNames = schools.map(school => school.school_name);
        return schoolsNames;

    } catch (err:any) {
        throw new Error(`Error fetching schools names: ${err}`);
    }
};





// Change academic props
interface changeAcademicProps{
    financial_year:String;
    academic_year:String;
    school_name:String;
};
// Change Academic
export const changeAcademic = async ({financial_year, academic_year, school_name}:changeAcademicProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Updating academic year
        AcademicYear.findOneAndUpdate(
            {
                year_name:academic_year
            },
            {
                is_active:true,
            },
            {new:true}
        ).then(async () => {
            try {
                await AcademicYear.updateMany({'year_name': {$ne:academic_year}}, {is_active:false});
            } catch (err:any) {
                console.log(`Error updating other academic years: ${err.message}`);
            }
        });


        // Updating financial year
        FinancialYear.findOneAndUpdate(
            {
                year_name:financial_year
            },
            {
                is_active:true,
            },
            {new:true}
        ).then(async () => {
            try {
                await FinancialYear.updateMany({'year_name': {$ne:financial_year}}, {is_active:false});
            } catch (err:any) {
                console.log(`Error updating other financial years: ${err.message}`);
            }
        });

        
    } catch (err:any) {
        console.log(`Error updating sessions: ${err.message}`);
    }
};