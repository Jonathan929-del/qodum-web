// Imports
import AccountsImage from '@/public/assets/Modules Icons/Accounts.png';
import FessImage from '@/public/assets/Modules Icons/Fees.png';
import AdmissionImage from '@/public/assets/Modules Icons/Admission.png';
import PayrollImage from '@/public/assets/Modules Icons/Payroll.png';
import StocksImage from '@/public/assets/Modules Icons/Stocks.png';
import UsersImage from '@/public/assets/Modules Icons/Users.png';
import AttendenceImage from '@/public/assets/Modules Icons/Attendance.png';
import TimetableImage from '@/public/assets/Modules Icons/Users.png';
import ExamanationImage from '@/public/assets/Modules Icons/Examination.png';
import LibraryImage from '@/public/assets/Modules Icons/Library.png';
import CBSEImage from '@/public/assets/Modules Icons/CBSE DIOS.png';





// Modules
const modules:any = [
    {
        icon:FessImage,
        title:'Fees',
        sections:[
            'Fee Entry',
            'Student Fee Entry',
            'Print Fee Receipt',
            'Student Fee Details',
        ]
    },
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
    {
        icon:AdmissionImage,
        title:'Admission',
        sections:[
            'TC Form',
            'Student Details',
            'Print Fee Receipt',
            'Student Registration',
        ]
    },
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
    {
        icon:TimetableImage,
        title:'Timetable',
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },
    {
        icon:ExamanationImage,
        title:'Examination',
        numberOfSections:7,
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },
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
    {
        icon:CBSEImage,
        title:'CBSE/DIOS',
        numberOfSections:7,
        sections:[
            'Teacher Setting',
            'Define Resource',
            'Auto Generate Timetable',
            'Class Timetable Details',
        ]
    },
];





// Export
export default modules;