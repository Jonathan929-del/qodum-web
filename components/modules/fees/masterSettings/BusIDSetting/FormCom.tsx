'use client';
// Imports
import * as z from 'zod';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {FeeEntrySettingOthersValidation} from '@/lib/validations/fees/masterSettings/feeEntrySettingOthers.validation';
import { BusIdSettingValidation } from '@/lib/validations/fees/masterSettings/busIdSetting.validation';






// Main function
const FormCom = () => {


    // Toast
    const {toast} = useToast();


    // Form
    const form = useForm({
        resolver: zodResolver(BusIdSettingValidation),
        defaultValues:{
            bus_id_type:'Automatic',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof BusIdSettingValidation>) => {
        try {


            toast({ title: 'Saved Successfully' });

            // Reseting form
            form.reset({
                bus_id_type:'Automatic',
                prefix:'',
                start_from:'',
                lead_zero:'',
                suffix:''
            });

        } catch (err: any) {
            console.log(err.message);
        }
    };


    return (
        <div className='w-[90%] sm:w-[60%]  max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Bus ID Setting</h2>
            <Form
                {...form}
            >

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >

                    {/* Bus id type */}
                    <FormField
                        control={form.control}
                        name='bus_id_type'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Bus id should be</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                    <RadioGroup className='flex justify-between' defaultValue="default" aria-label='View density'>
                                        <div className='flex items-center'>
                                            <RadioGroupItem className="RadioGroupItem mx-2" value="default" id="r1">
                                            </RadioGroupItem>
                                            <label className="Label" htmlFor="r1">
                                                Automatic
                                            </label>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <RadioGroupItem className="RadioGroupItem mx-2" value="manual" id="r1">
                                            </RadioGroupItem>
                                            <label className="Label" htmlFor="r1">
                                                Manual
                                            </label>
                                        </div>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]' />
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Prefix */}
                    <FormField
                        control={form.control}
                        name='prefix'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Prefix</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]' />
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Start from */}
                    <FormField
                        control={form.control}
                        name='start_from'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Start from</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Lead Zero  */}
                    <FormField
                        control={form.control}
                        name='lead_zero'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Lead Zero</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Suffix  */}
                    <FormField
                        control={form.control}
                        name='suffix'
                        render={({ field }) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>suffix</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none placeholder:text-red-500l'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-0 sm:left-[30%] top-[100%]' />
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 mt-4 mb-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;