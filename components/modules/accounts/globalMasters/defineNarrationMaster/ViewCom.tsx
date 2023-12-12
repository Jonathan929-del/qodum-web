// Imports
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, Search, X} from 'lucide-react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const ViewCom = ({setIsViewOpened, narrations, setUpdateNarration}:any) => {
    return (
        <div className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#ccc] lg:w-[70%]'>
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Narration List</h2>
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


                {/* Narration master */}
                <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
                    <ul className='w-full flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-2 border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Narration
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[50%] flex flex-row items-center justify-between px-2'>
                            Voucher Type
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>
                    {
                        !narrations[0]?.narration ? (
                            <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                No narrations yet
                            </p>
                        ) : narrations.map((narration:any) => (
                            <ul className='w-full flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{narrations.indexOf(narration) + 1}</li>
                                <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-2 border-[#ccc]'>
                                    <Button
                                        className='h-5 my-2 text-[10px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs lg:my-[2px] lg:text-md'
                                        onClick={() => {
                                            setUpdateNarration({
                                                id:narration._id,
                                                narration:narration.narration,
                                                voucher_type:narration.voucher_type,
                                                isDeleteClicked:false
                                            });
                                            setIsViewOpened(false);
                                        }}
                                    >
                                        Select
                                    </Button>
                                </li>
                                <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{narration?.narration}</li>
                                <li className='basis-[50%] flex flex-row items-center px-2'>{narration?.voucher_type}</li>
                            </ul>
                        ))
                    }
                </div>


                {/* Items per page */}
                <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-2 border-[#ccc]'>
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
                </div>


            </div>
        </div>
    );
};





// Export
export default ViewCom;