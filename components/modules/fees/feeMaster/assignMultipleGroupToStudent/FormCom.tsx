'use client';
// Imports
import * as z from 'zod';
import { deepEqual } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, ChevronDown, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InstallmentValidation } from '@/lib/validations/fees/feeMaster/feeMaster/installment.validation';
import { createInstallment, deleteInstallment, modifyInstallment } from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import { Button } from '@/components/ui/button';
import StudentsList from './StudentList';
import { AssignMultipleGroupToStudentValidation } from '@/lib/validations/fees/feeMaster/assignMultipleGroupToStudent.validation';





// Main function
const FormCom = ({ groups, types, installments, classes }: any) => {


    // Toast
    const { toast } = useToast();

    // Comparison object
    const comparisonObject = {

    };


    // Form
    const form = useForm({
        resolver: zodResolver(AssignMultipleGroupToStudentValidation),
        defaultValues: {
            group_type: '',
            fees_group: '',
            fees_installment: '',
            class: ['']
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AssignMultipleGroupToStudentValidation>) => {
        try {


            toast({ title: 'Group Assigned Successfully!' });

        } catch (err: any) {
            console.log(err);
        }
    };

    const [selctedClasses, setSelectedClasses] = useState([]);

    const [students, setStudents] = useState([
        { admin_no: '1375', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true },
        { admin_no: '1374', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true },
        { admin_no: '1345', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true },
        { admin_no: '1236', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true },
    ])





    return (
        <div className='w-[95%] max-w-[1100px] flex flex-col items-center rounded-[8px] sm:w-[95%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >

                    <div className="w-full flex gap-2 items-start lg:items-end flex-col lg:flex-row justify-start text-left">

                        <div className="min-w-[150px]">
                            <FormLabel className='text-xs text-[#726E71]'>Group Type</FormLabel>
                            <FormField
                                control={form.control}
                                name='group_type'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Group Type' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {/* {groups?.map((grp: any, index: any) => ( */}

                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>

                                                    {/* ))} */}

                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="min-w-[150px]">
                            <FormLabel className='text-xs text-[#726E71]'>Fees Group</FormLabel>
                            <FormField
                                control={form.control}
                                name='fees_group'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Year' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='sp'>Special</SelectItem>
                                                    <SelectItem value='cl'>Classes</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="min-w-[150px]">
                            <FormLabel className='text-xs text-[#726E71]'>fees Installment</FormLabel>
                            <FormField
                                control={form.control}
                                name='fees_installment'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-start justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='Year' className='text-xs' />
                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='sp'>Special</SelectItem>
                                                    <SelectItem value='cl'>Classes</SelectItem>
                                                    <SelectItem value='sp'>Special</SelectItem>
                                                    <SelectItem value='sp'>Special</SelectItem>
                                                    <SelectItem  value='sp'>Special</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="min-w-[150px]">
                            <FormLabel className='text-xs text-[#726E71]'>Selected Class</FormLabel>

                            <Select>
                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selctedClasses?.length < 1 ? 'Select class' : selctedClasses?.length === 1 ? '1 class selected' : `${selctedClasses?.length} classes selected`} className='text-xs' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedClasses(classes)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12} />
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedClasses([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12} />
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className=''>
                                        {/* {classes.map((cls: any) => ( */}
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]' >
                                            <Checkbox
                                                className='rounded-[2px] font-semibold'
                                                checked={selctedClasses?.map((m: any) => m).includes('class1')}
                                                // @ts-ignore
                                                onClick={() => selctedClasses?.includes('class1') ? setSelectedClasses(selctedClasses?.filter((m: any) => m !== 'class1')) : setSelectedClasses([...selectedClasses, 'class1'])}
                                            />
                                            <p className='text-xs font-semibold'>class 1</p>
                                        </li>
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]' >
                                            <Checkbox
                                                className='rounded-[2px] font-semibold'
                                                checked={selctedClasses?.map((m: any) => m).includes('class2')}
                                                // @ts-ignore
                                                onClick={() => selctedClasses?.includes('class2') ? setSelectedClasses(selctedClasses?.filter((m: any) => m !== 'class3')) : setSelectedClasses([...selectedClasses, 'class3'])}
                                            />
                                            <p className='text-xs font-semibold'>class 2</p>
                                        </li>
                                        <li className='flex flex-row items-center space-x-[2px] mt-[2px]' >
                                            <Checkbox
                                                className='rounded-[2px] font-semibold'
                                                checked={selctedClasses?.map((m: any) => m).includes('class3')}
                                                // @ts-ignore
                                                onClick={() => selctedClasses?.includes('class3') ? setSelectedClasses(selctedClasses?.filter((m: any) => m !== 'class2')) : setSelectedClasses([...selectedClasses, 'class2'])}
                                            />
                                            <p className='text-xs font-semibold'>class 3</p>
                                        </li>
                                        {/* ))} */}
                                    </ul>
                                </SelectContent>
                            </Select>

                        </div>


                        <div className='ms-auto'>
                            {form.formState.dirtyFields.group_type && (
                                <Button
                                    type='submit'
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                                >
                                    Show Details
                                </Button>
                            )}

                            <Button
                                type='submit'
                                className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Save
                            </Button>
                        </div>

                    </div>

                    <StudentsList students={students} setStudents={setStudents} from={form} />
                </form>
            </Form>


        </div>
    );
};





// Export
export default FormCom;