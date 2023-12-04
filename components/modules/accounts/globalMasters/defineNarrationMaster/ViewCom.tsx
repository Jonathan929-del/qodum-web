// Imports
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {ChevronsUpDown, Search, X} from 'lucide-react';
import {fetchNarrationMasters} from '@/lib/actions/accounts/accounts.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { useEffect, useState } from 'react';





// Main Function
const ViewCom = ({setIsViewOpened}:any) => {


    // Narration Masters
    const [narrations, setNarrations] = useState<any>([]);


    useEffect(() => {
        const narrationsFetcher = async () => {
            const narrationsRes = await fetchNarrationMasters();
            setNarrations(narrationsRes.narrations);
        };
        narrationsFetcher();
    }, []);


    return (
        <div className='w-[70%] flex flex-col items-center pb-20 gap-2 rounded-[8px] border-2 border-[#ccc]'>
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-[#3a3a3a] bg-[#F1F1F1] rounded-t-[8px]'>
                <h2>Narration List</h2>
                <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => setIsViewOpened(false)}/>
            </div>
            <div className='w-[95%] pt-2 flex flex-col items-center border-[1px] border-[#ccc] bg-[#F1F1F1] rounded-[8px]'>


                {/* Search input */}
                <div className='w-full flex flex-row justify-end pr-4 pb-2 border-b-2 border-[#ccc]'>
                    <div className='relative'>
                        <Input
                            placeholder='Search'
                            className='rounded-[5px] border-[#ccc] text-xs text-hash-color w-[250px] bg-white'
                        />
                        <Search
                            size={20}
                            className='absolute right-2 top-[25%] text-hash-color cursor-pointer'
                        />
                    </div>
                </div>


                {/* Narration master */}
                <div className='w-full flex flex-col'>
                    <ul className='w-full flex flex-row text-sm border-b-2 border-[#ccc] text-hash-color cursor-pointer'>
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
                        narrations.map((narration:any) => (
                            <ul className='w-full flex flex-row text-xs bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                <li className='basis-[10%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{narrations.indexOf(narration) + 1}</li>
                                <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>
                                    <Button className='h-5 my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>Select</Button>
                                </li>
                                <li className='basis-[20%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{narration?.narration}</li>
                                <li className='basis-[50%] flex flex-row items-center px-2'>{narration?.voucher_type}</li>
                            </ul>
                        ))
                    }
                </div>


                {/* Items per page */}
                <div className='w-full flex flex-row items-center justify-between py-4 px-2'>
                    <div className='flex flex-row items-center gap-2 text-sm'>
                        <p className='text-hash-color'>Items per page:</p>
                        <Select>
                            <SelectTrigger className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] h-8'>
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
                    <div className='flex flex-row items-center gap-[2px]'>
                        <Button disabled className='h-5 text-xs my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>First</Button>
                        <Button disabled className='h-5 text-xs my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>Prev.</Button>
                        <Button disabled className='h-5 text-xs my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>1</Button>
                        <Button disabled className='h-5 text-xs my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>Next</Button>
                        <Button disabled className='h-5 text-xs my-[0.5px] bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1]'>Last</Button>
                    </div>
                </div>


            </div>
        </div>
    );
};





// Export
export default ViewCom;