'use client';
// Imports
import * as z from 'zod';
import { FormControl, Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { AdmissionSettingValidation } from '@/lib/validations/admission/masterSettings/admissionSetting.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';



// Main function
const page = () => {




    // Toast
    const { toast } = useToast();


    // Form
    const form = useForm({
        resolver: zodResolver(AdmissionSettingValidation),
        defaultValues: {
            session: '',
            default_pay_mode: '',
            is_validate: false
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AdmissionSettingValidation>) => {
        try {

            toast({ title: 'Group Assigned Successfully!' });

        } catch (err: any) {
            console.log(err);
        }
    };





    return (
        <div className="flex mx-auto py-4 w-full h-full bg-white">
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative mx-auto w-full sm:w-[900px]  flex flex-col pt-4 items-center px-2 sm:px-4 sm:gap-2 '
                >

                    <div className="w-full flex gap-2 items-start bg-[#f0f0f0] py-4 px-5 lg:items-end flex-col lg:flex-row justify-between text-left">

                        <div className="me-2 min-w-[300px] flex justify-between lg:justify-start gap-1">
                            <FormLabel className='text-xs text-[#726E71] mt-2'>Session</FormLabel>
                            <FormField
                                control={form.control}
                                name='session'
                                render={({ field }) => (
                                    <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl className='mt-0 mohammed'>
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

                        <div className="me-2 min-w-[300px] flex justify-between lg:justify-start gap-1">
                            <FormLabel className='text-xs text-[#726E71] mt-2'>Session</FormLabel>
                            <FormField
                                control={form.control}
                                name='session'
                                render={({ field }) => (
                                    <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl className='mt-0 mohammed'>
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






                        <Button
                            type='submit'
                            className='w-24 mx-auto px-[8px] mt-5 sm:mt-0 h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Save
                        </Button>


                    </div>

                    <div className="w-full mt-5 sm:mt-2 flex gap-2 items-center bg-[#f0f0f0] py-4 px-5  flex-col lg:flex-row justify-between text-left">

                        <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                            <FormLabel className='text-xs text-[#726E71]'>Session</FormLabel>
                            <FormField
                                control={form.control}
                                name='is_validate'
                                render={({ field }) => (
                                    <FormItem className='w-full flex-1 h-10 flex flex-row items-center justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Switch
                                                id='is_default'
                                                {...field}
                                                // @ts-ignore
                                                value={field.value}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button
                            type='submit'
                            className='w-24 sm:me-12 mx-auto sm:mx-0 sm:ms-auto px-[8px] mt-5 sm:mt-0 h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Save
                        </Button>


                    </div>

                </form>
            </Form>
        </div>
    )
}





// Export
export default page;