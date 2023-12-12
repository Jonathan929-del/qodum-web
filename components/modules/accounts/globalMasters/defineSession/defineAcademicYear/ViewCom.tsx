// Imports
import moment from 'moment';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, Search, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





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


    return (
        <div className='w-[90%] max-h-[90%] flex flex-col items-center pb-4 gap-2 rounded-[8px] border-[0.5px] border-[#ccc] lg:w-[70%]'>
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Academic Year List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>
            <div className='w-[95%] h-[90%] pt-2 flex flex-col items-center border-[1px] border-[#ccc] bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-2 border-[#ccc]'>
                    <div className='relative'>
                        <Input
                            placeholder='Search'
                            className='h-full rounded-[5px] border-[#ccc] text-xs text-hash-color w-[250px] bg-white'
                        />
                        <Search
                            size={20}
                            className='absolute right-2 top-[25%] text-hash-color cursor-pointer'
                        />
                    </div>
                </div>


                {/* Academic Year */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
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
                    {
                        !academicYears[0]?.year_name ? (
                            <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                No academic years yet
                            </p>
                        ) : academicYears.map((year:any) => (
                            <ul className='w-full flex flex-row min-w-[700px] text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'>
                                <li className='basis-[7.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[10%]'>{academicYears.indexOf(year) + 1}</li>
                                <li className='basis-[12.5%] flex flex-row items-center justify-center px-2 border-r-2 border-[#ccc]'>
                                    <Button
                                        className='h-5 my-2 text-[10px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs lg:my-[2px] lg:text-md'
                                        onClick={() => {
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
                                        }}
                                    >
                                        Select
                                    </Button>
                                </li>
                                <li className='basis-[15%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{year.year_name}</li>
                                <li className='basis-[12.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[10%]'>{year.is_active ? 'True' : 'False'}</li>
                                <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{`${year.start_date.day}-${monthConverter(year.start_date.month)}-${year.start_date.year}`}</li>
                                <li className='basis-[17.5%] flex flex-row items-center px-2 border-r-2 border-[#ccc] sm:basis-[20%]'>{`${year.end_date.day}-${monthConverter(year.end_date.month)}-${year.end_date.year}`}</li>
                                <li className='basis-[15%] flex flex-row items-center px-2'>{moment(year.updatedAt).format('D-MMM-yy')}</li>
                            </ul>
                        ))
                    }
                </div>


                {/* Items per page */}
                {/* <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-2 border-[#ccc]'>
                    <div className='text-[10px] flex flex-col items-center gap-2 sm:text-sm sm:flex-row'>
                        <p className='text-hash-color'>Items per page:</p>
                        <Select>
                            <SelectTrigger className='flex flex-row items-center h-8 pl-2 text-[10px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:text-xs'>
                                <SelectValue placeholder='1000' className='text-xs'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='10'>10</SelectItem>
                                <SelectItem value='15'>15</SelectItem>
                                <SelectItem value='50'>50</SelectItem>
                                <SelectItem value='100'>100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-row items-center gap-[2px] sm:gap-[4px]'>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>First</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Prev.</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>1</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Next</Button>
                        <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Last</Button>
                    </div>
                </div> */}


            </div>
        </div>
    );
};





// Export
export default ViewCom;