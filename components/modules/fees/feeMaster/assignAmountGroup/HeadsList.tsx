// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';





// Main Function
const HeadsList = ({heads, form, isDataFetching}:any) => {


    // Total number
    const [totalNumber, setTotalNumber] = useState(0);


    // Number change
    const numberChange = () => {

        let myNums = form.getValues().affiliated_heads.map((h:any) => Number(h.amount));
        let sum = 0;
        for (let i = 0; i < myNums.length; i++ ) {sum += myNums[i];};
        setTotalNumber(sum);

    };

    // Use effect
    useEffect(() => {
        numberChange();
    }, [form.watch('affiliated_heads'), heads]);


    return (
        <Command
            className='max-w-[500px] max-h-[50%] flex flex-col items-center gap-2 rounded-[4px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:max-h-[70%]'
        >
            
            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[4px]'>
                <h2>Group Amount List</h2>
            </div>
            <div className='flex-1 w-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col'>
                    {/* Headers */}
                    <ul className='w-full min-w-[300px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Head
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[50%] flex flex-row items-center justify-between px-2'>
                            Amount
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            isDataFetching ? (
                                <LoadingIcon />
                            ) : heads.length === 0 ? (
                                <p className='w-full min-w-[300px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads
                                </p>                                
                            ) : form.getValues().affiliated_heads[0]?.head_name === '' ? (
                                <p className='w-full min-w-[300px] flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads
                                </p>
                            ) :  heads.map((head:any) => (
                                    <CommandItem key={head._id} className='w-full min-w-[300px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                        <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[30%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.head_name}</li>

                                        {/* Amount */}
                                        <li className='basis-[50%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <FormField
                                                control={form.control}
                                                name={`affiliated_heads.${heads.indexOf(head)}.amount`}
                                                render={({field}) => (
                                                    <FormItem className='w-full'>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                onBlurCapture={numberChange}
                                                                className='h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                            />
                                                        </FormControl>
                                                        <FormMessage className='text-xs'/>
                                                </FormItem>
                                                )}
                                            />
                                        </li>
                                    </CommandItem>
                                ))
                        }

                        {/* Total */}
                        {heads.length > 1 && (
                            <ul className='w-full min-w-[300px] flex flex-row text-[10px] font-semibold bg-[#E2E4FF] sm:text-xs md:text-md'>
                                <li className='basis-[20%] h-full py-2 flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc] text-[#E2E4FF]'>-</li>
                                <li className='basis-[30%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>Total</li>
                                {/* Amount */}
                                <li className='basis-[50%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                    {totalNumber}
                                </li>
                            </ul>
                        )}
                    </CommandList>
                </div>
            </div>
        </Command>
    );
};





// Export
export default HeadsList;