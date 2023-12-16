// Imports
import moment from 'moment';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, X} from 'lucide-react';
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from '@/components/ui/command';





// Main Function
const ViewCom = ({setIsViewOpened, academicYears, setUpdateAcademicYear}:any) => {


    // Month abbreviation converter
    const monthConverter = (month:String) => {
        let monthAbr;
        switch (month) {
            case 'January':
                monthAbr = 'Jan';
                break;
            case 'February':
                monthAbr = 'Feb';
                break;
            case 'March':
                monthAbr = 'Mar';
                break;
            case 'April':
                monthAbr = 'Apr';
                break;
            case 'May':
                monthAbr = 'May';
                break;
            case 'June':
                monthAbr = 'Jun';
                break;
            case 'July':
                monthAbr = 'Jul';
                break;
            case 'August':
                monthAbr = 'Aug';
                break;
            case 'September':
                monthAbr = 'Sep';
                break;
            case 'October':
                monthAbr = 'Oct';
                break;
            case 'November':
                monthAbr = 'Nov';
                break;
            case 'December':
                monthAbr = 'Dec';
                break;
        }
        return monthAbr;
    };


    // Select handler
    const selectHandler = (year:any) => {
        setUpdateAcademicYear({
            id:year._id,
            year_name:year.year_name,
            start_date:{
                day:year.start_date.day,
                month:year.start_date.month,
                year:year.start_date.year
            },
            end_date:{
                day:year.end_date.day,
                month:year.end_date.month,
                year:year.end_date.year
            },
            is_active:year.is_active,
            isDeleteClicked:false
        });
        setIsViewOpened(false);
    };


    return (
        <Command
            className='w-[90%] max-h-[90%] flex flex-col items-center pb-4 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[70%]'
        >


            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Academic Year List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>


            <div className='w-[95%] h-[90%] flex flex-col items-center border-[1px] border-[#ccc] bg-[#F1F1F1] rounded-[8px]'>
                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-2 py-2 border-b-2 border-[#ccc] sm:pr-4'>
                    <CommandInput
                        placeholder='Search list'
                        className='h-full text-xs text-hash-color w-[250px] bg-white'
                    />
                </div>


                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headings */}
                    <ul className='w-full flex flex-row min-w-[700px] text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[7.5%] flex flex-row items-center justify-between px-2 py-[2px] border-r-2 border-[#ccc] sm:basis-[10%]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Year Name
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc] sm:basis-[10%]'>
                            Is Active
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Start Date
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[17.5%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc] sm:basis-[20%]'>
                            End Date
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2'>
                            Modified Date
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>


                    {/* Values */}
                    <CommandList>
                        {
                            !academicYears[0]?.year_name ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                    No academic years yet
                                </p>
                            ) : academicYears.map((year:any) => (
                                <CommandItem
                                    value={`
                                        ${academicYears.indexOf(year) + 1}
                                        select
                                        ${year.year_name}
                                        ${year.start_date.day}
                                        ${monthConverter(year.start_date.month)}
                                        ${year.start_date.year}
                                        ${year.is_active ? 'True' : 'False'}
                                        ${year.end_date.day}
                                        ${monthConverter(year.end_date.month)}
                                        ${year.end_date.year}
                                        ${moment(year.updatedAt).format('D-MMM-yy')}
                                    `}
                                    className='w-full flex flex-row min-w-[700px] text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[10%]'>{academicYears.indexOf(year) + 1}</li>
                                    <li className='basis-[12.5%] flex flex-row items-center justify-center px-2 border-r-2 border-[#ccc]'>
                                        <Button
                                            className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                                            onClick={() => selectHandler(year)}
                                        >
                                            Select
                                        </Button>
                                    </li>
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{year.year_name}</li>
                                    <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[10%]'>{year.is_active ? 'True' : 'False'}</li>
                                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{`${year.start_date.day}-${monthConverter(year.start_date.month)}-${year.start_date.year}`}</li>
                                    <li className='basis-[17.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[20%]'>{`${year.end_date.day}-${monthConverter(year.end_date.month)}-${year.end_date.year}`}</li>
                                    <li className='basis-[15%] flex flex-row items-center px-2'>{moment(year.updatedAt).format('D-MMM-yy')}</li>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                    <CommandEmpty>No results found</CommandEmpty>
                </div>


            </div>
        </Command>
    );
};





// Export
export default ViewCom;