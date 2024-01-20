'use client';
// Imports
import * as z from 'zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {EnquiryNoSettingValidation} from '@/lib/validations/admission/masterSettings/enquiryNoSetting.validation';



// Main function
const page = () => {


    // Toast
    const { toast } = useToast();


    // Form
    const form = useForm({
        resolver: zodResolver(EnquiryNoSettingValidation),
        defaultValues: {
            session:'2023-2024',
            // @ts-ignore
            setting_type:typeof(window) !== 'undefined' ? JSON.parse(window.localStorage.getItem('enquiry_no_setting')).setting_type || 'Automatic' : 'Automatic',
            // @ts-ignore
            prefix:typeof(window) !== 'undefined' ? JSON.parse(window.localStorage.getItem('enquiry_no_setting')).prefix || '' : '',
            // @ts-ignore
            start_from:typeof(window) !== 'undefined' ? JSON.parse(window.localStorage.getItem('enquiry_no_setting')).start_from || 0 : 0,
            // @ts-ignore
            lead_zero:typeof(window) !== 'undefined' ? JSON.parse(window.localStorage.getItem('enquiry_no_setting')).lead_zero || '' : '',
            // @ts-ignore
            suffix:typeof(window) !== 'undefined' ? JSON.parse(window.localStorage.getItem('enquiry_no_setting')).suffix || '' : '',
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof EnquiryNoSettingValidation>) => {
        try {

            window.localStorage.setItem('enquiry_no_setting', JSON.stringify({
                session:values.session,
                setting_type:values.setting_type,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            }));
            toast({title:'Setting Saved Successfully!'});

        } catch (err:any) {
            console.log(err);
        }
    };



    useEffect(() => {
        window.localStorage.setItem('item', 'TEXT');
    }, [form.watch('setting_type')]);
    useEffect(() => {
        console.log(form.getValues());
    }, [form.watch('lead_zero'), form.watch('start_from')]);





    return (
        <div className="flex mx-auto py-4 w-full h-full bg-white">
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative mx-auto w-full sm:w-[1000px]  flex flex-col pt-4 items-center px-2 sm:px-4 sm:gap-2'
                >

                <div className="w-full flex gap-2 items-start bg-[#f0f0f0] py-4 px-5 lg:items-end flex-col lg:flex-row justify-between text-left">
                        <div className='me-2 min-w-[150px] flex justify-between lg:justify-start gap-1'>
                            <FormLabel className='text-xs text-[#726E71] mt-2'>Session</FormLabel>
                            <FormField
                                control={form.control}
                                name='session'
                                render={({ field }) => (
                                    <FormItem className='flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            <Select disabled>
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                    <SelectValue placeholder='2023-2024' className='text-xs' />
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
                        <div className="me-2 h-full w-full flex flex-row items-center lg:justify-start lg:w-auto gap-1">
                            <FormLabel className='text-xs text-[#726E71]  me-3'>Enquiry No. setting should be</FormLabel>
                            <FormField
                                control={form.control}
                                name='setting_type'
                                render={({ field }) => (
                                    <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <RadioGroup defaultValue={form.getValues().setting_type} className='flex gap-2'>
                                                <RadioGroupItem
                                                    value='Automatic'
                                                    onClick={() => form.setValue('setting_type', 'Automatic')}
                                                />
                                                <Label className='text-xs text-[#726E71] '>Automatic</Label>
                                                <RadioGroupItem
                                                    value='Manual'
                                                    onClick={() => form.setValue('setting_type', 'Manual')}
                                                />
                                                <Label className='text-xs text-[#726E71] '>Manual</Label>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full flex item-end justify-end lg:w-auto'>
                            <Button
                                type='submit'
                                className='w-24 px-[8px] mt-5 sm:mt-0 h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                            >
                                Modify
                            </Button>
                        </div>


                    </div>

                    <div className="w-full mt-5 sm:mt-2 flex flex-col gap-2 items-center bg-[#f0f0f0] py-4 px-5 xl:flex-row justify-between text-left">
                        { form.getValues().setting_type === 'Automatic' ? (
                            <>
                                <div className="me-2 flex items-center justify-between sm:justify-start gap-[2px]">
                                    <FormLabel className='text-xs w-[70px] text-[#726E71]'>Prefix</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='prefix'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                    <FormLabel className='text-xs w-[70px] text-[#726E71]'>Start From</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='start_from'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                    <FormLabel className='text-xs w-[70px] text-[#726E71]'>Lead Zero</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='lead_zero'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="me-2 flex items-center justify-between sm:justify-start gap-1">
                                    <FormLabel className='text-xs w-[70px] text-[#726E71]'>Suffix</FormLabel>
                                    <FormField
                                        control={form.control}
                                        name='suffix'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-[90%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-xs' />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        ) : ''}




                    </div>

                </form>
            </Form>
        </div>
    )
}





// Export
export default page;