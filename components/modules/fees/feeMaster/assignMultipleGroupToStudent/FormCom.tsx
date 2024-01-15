'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
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





// Main function
const FormCom = ({ setIsViewOpened, installments, updateInstallment, setUpdateInstallment, selectedMonths, setSelectedMonths }: any) => {


    // Toast
    const { toast } = useToast();

    // Comparison object
    const comparisonObject = {

    };


    // Form
    const form = useForm({
        resolver: zodResolver(InstallmentValidation),
        defaultValues: {
            group_type: '',
            fees_group: '',
            fees_installment: '',
            class: ''
        }
    });


    // Submit handler
    // const onSubmit = async (values:z.infer<typeof InstallmentValidation>) => {
    //     try {
    //     // Create installment
    //     if(updateInstallment.id === ''){
    //         // Dates arrangment validation
    //         if(values.due_on_date.year > values.due_date.year){
    //             toast({title:'Due date cannot be earlier than due on date', variant:'error'});
    //             return;
    //         };
    //         // Duplicate installment name check
    //         if(installments.map((installment:any) => installment.name).includes(values.name)){
    //             toast({title:'Installment name already exists', variant:'error'});
    //             return;
    //         };
    //         // Duplicate installment preference number check
    //         if(installments.map((installment:any) => installment.preference_no).includes(values.preference_no)){
    //             toast({title:'Installment preference number already exists', variant:'error'});
    //             return;
    //         };
    //         await createInstallment({

    //         });
    //         toast({title:'Added Successfully!'});
    //     }
    //     // Modify installment
    //     else if(JSON.stringify(updateInstallment.months) !== JSON.stringify(selectedMonths) || !deepEqual(comparisonObject, values)){
    //         // Duplicate installment name check
    //         if(comparisonObject.name !== values.name && installments.map((installment:any) => installment.name).includes(values.name)){
    //             toast({title:'Installment name already exists', variant:'error'});
    //             return;
    //         };
    //         // Duplicate installment preference number check
    //         if(comparisonObject.preference_no !== values.preference_no && installments.map((installment:any) => installment.preference_no).includes(values.preference_no)){
    //             toast({title:'Installment preference number already exists', variant:'error'});
    //             return;
    //         };
    //         await modifyInstallment({

    //         });
    //         toast({title:'Updated Successfully!'});
    //     }
    //     // Delete Installment
    //     else if(updateInstallment.isDeleteClicked){
    //         await deleteInstallment({id:updateInstallment.id});
    //         toast({title:'Deleted Successfully!'});
    //     };


    //     // Reseting update entity
    //     setUpdateInstallment({
    //         id:'',
    //         isDeleteClicked:false,

    //     });
    //     // Reseting form
    //     form.reset({

    //     });
    //     setSelectedMonths([]);
    //     } catch (err:any) {
    //         console.log(err);
    //     }
    // };

    const [selctedClasses, setSelectedClasses] = useState([]);

    const students = [
        {admin_no: '1375', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true},
        {admin_no: '1374', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true},
        {admin_no: '1345', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true},
        {admin_no: '1236', name: 'mohammed', father_name: 'father one', DOB: '12/2/2024', DOA: '244544', Is_new_name: true},
    ]
    const classes = ['class1', 'class2', 'class3'];

    const onSubmit = () => {


    }





    return (
        <div className='w-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] sm:w-[80%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-6 pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >


                    <div className="w-full flex gap-2 items-start lg:items-end flex-col lg:flex-row justify-start text-left">

                        <div className="groupType min-w-[160px]">
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
                                                    <SelectItem value='sp'>Special</SelectItem>
                                                    <SelectItem value='cl'>Classes</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="groupType min-w-[160px]">
                            <FormLabel className='text-xs text-[#726E71]'>Fees Group</FormLabel>
                            <FormField
                                control={form.control}
                                name='fees_type'
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
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="groupType min-w-[160px]">
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
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="groupType min-w-[160px]">
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
                                        {classes.map((cls: any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={cls}>
                                                <Checkbox
                                                    className='rounded-[2px] font-semibold'
                                                    checked={selctedClasses?.map((m: any) => m).includes(cls)}
                                                    // @ts-ignore
                                                    onClick={() => selctedClasses?.includes(cls) ? setSelectedClasses(selctedClasses?.filter((m: any) => m !== cls)) : setSelectedClasses([...selectedClasses, cls])}
                                                />
                                                <p className='text-xs font-semibold'>{cls}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>

                        </div>

                        {form.formState.isDirty && (
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

                        <StudentsList students={students}  from={form} />

                


                    {/* Buttons */}
                    <div className='flex flex-col items-center mt-[-20px]'>
                        {/* <Buttons setIsViewOpened={setIsViewOpened} installments={installments} updateInstallment={updateInstallment} setUpdateInstallment={setUpdateInstallment} onSubmit={onSubmit} form={form} setSelectedMonths={setSelectedMonths}/> */}
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;