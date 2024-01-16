// Imports
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, X } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {  FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';





// Main Function
const StudentsList = ({ students}: any) => {

    // Form
   
    return (
       
                <Command
                    className='w-[100%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[100%]'
                >

                    {/* Header */}
                    <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                        <h2>Student List</h2>
                    </div>
                    <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                        {/* Heads */}
                        <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                            {/* Headers */}
                            <ul className='w-full min-w-[600px] flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>

                                <li className='w-[15%] basis-[15%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    Sr. No.
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    Select
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    admin no
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    name
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    father name
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    DOB
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                    DOA
                                    <ChevronsUpDown size={12} />
                                </li>
                                <li className='w-[30%] basis-[30%] flex flex-row items-center justify-between px-2'>
                                    Is New Name
                                    <ChevronsUpDown size={12} />
                                </li>

                            </ul>
                            {/* Values */}
                            <CommandList>
                                {
                                    students.length < 1 ? (
                                        <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-2 border-[#ccc]'>
                                            No heads yet
                                        </p>
                                    ) : !students[0] ? (
                                        <LoadingIcon />
                                    ) : students.map((student: any, index: number) => (
                                        <CommandItem
                                            key={index}
                                            value={`${students.indexOf(student) + 1}  ${student.name} ${student.father_name} ${student.DOB} ${student.DOA} ${student.Is_new_name ? 'True' : 'Flase'}`}
                                            className='w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'
                                        >
                                            <li className='w-[15%] basis-[15%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                {`${student.admin_no}`}
                                            </li>
                                            <li className='w-[30%] basis-[30%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                <FormField
                                                    // control={form.control}
                                                    name="class"
                                                    render={({ field }: any) => {
                                                        return (
                                                            <FormItem
                                                                key={student.admin_no}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl >

                                                                    <Checkbox
                                                                        checked={field.value?.includes(student)}
                                                                        onCheckedChange={(checked: any) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, student])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value: any) => value !== student
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
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                {`${student.name}`}
                                            </li>
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                {`${student.father_name}`}
                                            </li>
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                {`${student.DOB}`}
                                            </li>
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                                {`${student.DOA}`}
                                            </li>
                                            <li className='w-[30%] basis-[30%] flex-grow flex flex-row items-center px-2'>
                                                {`${student.Is_new_name}`}
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
export default StudentsList;