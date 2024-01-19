// Imports
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronsUpDown, X } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useState } from 'react';





// Main Function
const StudentsList = ({ form }: any) => {


    const [students, setStudents] = useState([
        { admin_no: '1375', bill_no: '120120', name: 'mohammed', father_name: 'father one', assigned_class: 'ass class', new_class: 'new class', assigned_section: 'ass section', new_section: 'new section' },
        { admin_no: '1375', bill_no: '120120', name: 'mohammed', father_name: 'father one', assigned_class: 'ass class', new_class: 'new class', assigned_section: 'ass section', new_section: 'new section' },
        { admin_no: '1375', bill_no: '120120', name: 'mohammed', father_name: 'father one', assigned_class: 'ass class', new_class: 'new class', assigned_section: 'ass section', new_section: 'new section' },
        { admin_no: '1375', bill_no: '120120', name: 'mohammed', father_name: 'father one', assigned_class: 'ass class', new_class: 'new class', assigned_section: 'ass section', new_section: 'new section' },

    ])



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
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-2 border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>

                        <li className=' basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Select
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            bill no
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            admin no
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            father name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            assigned class
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[45%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            new class
                            <div className="w-full  flex items-center justify-between lg:justify-start gap-1">
                                <FormField
                                    control={form.control}
                                    name='new_class'
                                    render={({ field }) => (
                                        <FormItem className='max-w-[80px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-[130px] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Year' className='text-xs' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='sp'>Special</SelectItem>
                                                        <SelectItem value='cl'>Classes</SelectItem>
                                                        <SelectItem value='sp2'>Special</SelectItem>
                                                        <SelectItem value='sp3'>Special</SelectItem>
                                                        <SelectItem value='sp5'>Special</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[25%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            assigned section
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className=' basis-[45%] flex flex-row items-center justify-between px-2 py-[2px]'>
                            new section
                            <div className="w-full  flex items-center justify-between lg:justify-start gap-1">
                                <FormField
                                    control={form.control}
                                    name='new_class'
                                    render={({ field }) => (
                                        <FormItem className='max-w-[80px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-[130px] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Year' className='text-xs' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='sp'>Special</SelectItem>
                                                        <SelectItem value='cl'>Classes</SelectItem>
                                                        <SelectItem value='sp2'>Special</SelectItem>
                                                        <SelectItem value='sp3'>Special</SelectItem>
                                                        <SelectItem value='sp5'>Special</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                    value={`${students.indexOf(student) + 1} ${student.bill_no}  ${student.admin_no}  ${student.name} ${student.father_name} ${student.assigned_class} ${student.new_class} ${student.assigned_section} ${student.new_section} `}
                                    className='w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-2 border-[#ccc] sm:text-xs md:text-md'
                                >
                                    <li className=' basis-[10%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>{students.indexOf(student) + 1}</li>
                                    <li className=' basis-[20%] flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
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
                                    <li className=' basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.admin_no}`}
                                    </li>
                                    <li className=' basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.bill_no}`}
                                    </li>
                                    <li className=' basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.name}`}
                                    </li>
                                    <li className=' basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.father_name}`}
                                    </li>
                                    <li className=' basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.assigned_class}`}
                                    </li>
                                    <li className=' basis-[45%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.new_class}`}
                                    </li>
                                    <li className=' basis-[25%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {`${student.assigned_section}`}
                                    </li>
                                    <li className=' basis-[45%] flex-grow flex flex-row items-center px-2 '>
                                        {`${student.new_section}`}
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