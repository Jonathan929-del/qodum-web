'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createParish, deleteParish, modifyParish} from '@/lib/actions/admission/globalMasters/parish.actions';
import {ParishValidation} from '@/lib/validations/admission/globalMasters/parish.validation';

import {Check, ChevronDown, X} from 'lucide-react';
import {Select, SelectContent, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';





// Main function
const FormCom = ({ setIsViewOpened, parishes, updateParish, religions, setUpdateParish, selectedReligions, setSelectedReligions }: any) => {


    // Toast
    const { toast } = useToast();


    // Comparison object
    const comparisonObject = {
        parish: updateParish.parish,
        religion: updateParish.religion
    };


    // Form
    const form: any = useForm({
        resolver: zodResolver(ParishValidation),
        defaultValues: {
            parish: updateParish.id === '' ? '' : updateParish.parish,
            religion: updateParish.id === '' ? '' : selectedReligions,
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof ParishValidation>) => {
        // Create parish
        if (updateParish.id === '') {
            console.log('id', values)
            if (parishes.map((parish: any) => parish.parish).includes(values.parish)) {
                toast({ title: 'Parish Name already exists', variant: 'error' });
                return;
            };
            await createParish({
                parish: values.parish,
                religion: selectedReligions
            });
            toast({ title: 'Added Successfully!' });
        }
        // Modify Parish
        else if (!deepEqual(comparisonObject, values)) {
            console.log('no id', values)
            // if (comparisonObject.parish !== values.parish && parishes.map((parish: any) => parish.parish).includes(values.parish)) {
            //     toast({ title: 'Parish Name is already exists', variant: 'error' });
            //     return;
            // };
            await modifyParish({
                id: updateParish.id,
                parish: values.parish,
                religion: selectedReligions
            });
            toast({ title: 'Updated Successfully!' });
        }
        // Delete Parish
        else if (updateParish.isDeleteClicked) {
            await deleteParish({ id: updateParish.id });
            toast({ title: 'Deleted Successfully!' });
        };


        // Reseting update entity
        setUpdateParish({
            id: '',
            isDeleteClicked: false,
            parish: '',
            religion: []
        });
        setSelectedReligions([])
        // Reseting form
        form.reset({
            parish: '',
            religion: []
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define parish</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4'
                >



                    {/* Parish Name */}
                    <FormField
                        control={form.control}
                        name='parish'
                        render={({ field }) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Parish Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex h-8 flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <div className='mt-[-10px] text-xs'>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />





                    {/* Religions */}
                    <div className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center mt-2'>
                        <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Select Religion</p>
                        <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>

                            <Select name='religion'>
                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder={selectedReligions?.length < 1 ? 'Select religion' : selectedReligions?.length === 1 ? '1 religion selected' : `${selectedReligions?.length} religions selected`} className='text-xs' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            // @ts-ignore
                                            onClick={() => setSelectedReligions(religions)}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12} />
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setSelectedReligions([])}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12} />
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className='mt-2'>
                                        {religions.map((religion: any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={religion}>
                                                <Checkbox
                                                    className='rounded-[2px] font-semibold'
                                                    checked={selectedReligions?.map((r: any) => r).includes(religion)}
                                                    // @ts-ignore
                                                    onClick={() => selectedReligions?.includes(religion) ? setSelectedReligions(selectedReligions?.filter((r: any) => r !== religion)) : setSelectedReligions([...selectedReligions, religion])}
                                                />
                                                <p className='text-xs font-semibold'>{religion}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>


            



                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} parishes={parishes} updateParish={updateParish} setSelectedReligions={setSelectedReligions} setUpdateParish={setUpdateParish} onSubmit={onSubmit} form={form} />


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;