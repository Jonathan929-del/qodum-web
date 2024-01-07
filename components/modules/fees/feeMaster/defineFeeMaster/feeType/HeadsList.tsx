// Imports
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, X } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';





// Main Function
const HeadsList = ({ heads, setSelectedHeads, selectedHeads, form }: any) => {

    const toggleTypeHead = (selected: boolean | string, head: any) => {

        if (selected) {
            setSelectedHeads((old: any) => [...old, head])
        } else {
            let filterd = selectedHeads.filter((hd: any) => hd._id !== head._id);
            setSelectedHeads(filterd)
        }
    }

    return (
        <Command
            className='w-[80%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[100%]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Heads List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[300px] flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-2 border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[30%] flex-grow flex flex-row items-center justify-between px-2 border-r-2 border-[#ccc]'>
                            Head Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[30%] flex flex-row items-center justify-between px-2'>
                            Select
                            <ChevronsUpDown size={12} />
                        </li>

                    </ul>
                    {/* Values */}
                    <CommandList>
                        {
                            heads.length < 1 ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                    No heads yet
                                </p>
                            ) : !heads[0]?.name ? (
                                <LoadingIcon />
                            ) : heads.map((head: any, index: number) => (
                                <CommandItem
                                    key={index}
                                    value={`${heads.indexOf(head) + 1} ${head.name}   `}
                                    className='w-full min-w-[300px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                    <li className='basis-[30%] flex-grow flex flex-row items-center px-2 border-r-2 border-[#ccc]'>{head.name}</li>
                                    <li className='basis-[30%] flex flex-row items-center px-2 border-r-2 border-[#ccc]'>

                                        <FormField
                                            control={form.control}
                                            name="heads"
                                            render={({ field  } : any) => {
                                                return (
                                                    <FormItem
                                                        key={head.name}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(head._id)}
                                                                onCheckedChange={(checked) => {
                                                                    
                                                                    return checked
                                                                        ? field.onChange([...field.value, head._id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value: any) => value._id !== head._id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    </li>

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
export default HeadsList;