// Imports
import AccountsImage from '@/public/assets/Modules Icons/Menu icons/Accounts.png';
import FessImage from '@/public/assets/Modules Icons/Menu icons/Fees.png';
import AdmissionImage from '@/public/assets/Modules Icons/Menu icons/Admission.png';
import PayrollImage from '@/public/assets/Modules Icons/Menu icons/Payroll.png';
import StocksImage from '@/public/assets/Modules Icons/Menu icons/Stocks.png';
import UsersImage from '@/public/assets/Modules Icons/Menu icons/Users.png';
import AttendenceImage from '@/public/assets/Modules Icons/Menu icons/Attendance.png';
import TimetableImage from '@/public/assets/Modules Icons/Menu icons/Time Table.png';
import ExamanationImage from '@/public/assets/Modules Icons/Menu icons/Examination.png';
import LibraryImage from '@/public/assets/Modules Icons/Menu icons/Library.png';
import QodumCareImage from '@/public/assets/Modules Icons/Menu icons/CBSE DIOS.png';
import MarksImage from '@/public/assets/Modules Icons/Menu icons/Marks.png';





// Modules
const modules:any = [

    // Admission
    {
        icon:AdmissionImage,
        title:'Admission',
        sections:[
            'Enquiry',
            'Admission',
            'Admission Report'
        ]
    },


    // Fees
    {
        icon:FessImage,
        title:'Fees',
        sections:[
            'Fee Entry',
            'Print Fee Receipt',
            'Daily Collection Report',
            'Assign Transport To Student',
        ]
    },


    // Attendance
    {
        icon:AttendenceImage,
        title:'Attendance',
        sections:[
            'Define Holiday',
            'Attendance Report',
            'Upload Attendance',
            'Employee Enrollment',
        ]
    },


    // Payroll
    {
        icon:PayrollImage,
        title:'Payroll',
        sections:[
            'Define Staff',
            'Salary Sheets',
            'Salary Generation',
            'Bank Statement Reports',
        ]
    },


    // Marks Entry
    {
        icon:MarksImage,
        title:'Marks Entry',
        numberOfSections:7,
        sections:[
            'Marks Entry Subject Wise',
            'CSA Entry Activity Wise',
            'Marks Consolidated Report',
            'Marks SMS',
        ]
    },


    // Examinations
    {
        icon:ExamanationImage,
        title:'Examinations',
        numberOfSections:7,
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },


    // Time Table
    {
        icon:TimetableImage,
        title:'Time Table',
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },


    // Accounts
    {
        icon:AccountsImage,
        title:'Accounts',
        sections:[
            'Cheque Printing',
            'Session Transfer',
            'Daily Cash Status',
            'Define Account Group',
        ]
    },


    // Stocks
    {
        icon:StocksImage,
        title:'Stocks',
        sections:[
            'Define Items',
            'Stock Issues',
            'Student Fee Entry',
            'Print Fee Receipt',
        ]
    },
    
    
    // Library
    {
        icon:LibraryImage,
        title:'Library',
        numberOfSections:7,
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },


    // Users
    {
        icon:UsersImage,
        title:'Users',
        sections:[
            'User Role',
            'Create User',
            'Create Role',
            'Define Session',
        ]
    },


    // Qodum Care
    {
        icon:QodumCareImage,
        title:'Qodum Care',
        numberOfSections:7,
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    }

];





// Export
export default modules;