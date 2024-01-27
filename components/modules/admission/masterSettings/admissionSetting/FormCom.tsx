// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormControl, Form, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAcademicYears} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import {AdmissionSettingValidation} from '@/lib/validations/admission/masterSettings/admissionSetting.validation';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';





// Main function
function FormCom() {


    // Toast
    const {toast} = useToast();


    // Sessions
    const [sessions, setSessions] = useState([{}]);


    // Form
    const form = useForm({
        resolver: zodResolver(AdmissionSettingValidation),
        defaultValues: {
            session:'',
            pay_mode:'',
            send_sms:false,
            is_auto_roll_no:false,
            school:'',
            class:'',
            board:'',
            number:'',
            should_be:'',
            rec_no_start_from:'',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AdmissionSettingValidation>) => {
        try {

            toast({title:'Settings Saved Successfully!'});

        } catch (err: any) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const sessionsRes = await fetchAcademicYears();
            setSessions(sessionsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='w-[90%] max-w-[1000px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
                >


                    <div className='flex flex-row w-full gap-2'>
                        {/* Session */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Session</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='session'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sessions.length < 1 ? (
                                                            <p>No sessions</p>
                                                        ) : // @ts-ignore
                                                            !sessions[0].year_name ? (
                                                            <LoadingIcon />
                                                        ) : sessions.map((session:any) => (
                                                            <SelectItem value={session.year_name} key={session._id}>{session.year_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Paymode */}
                        <div className='w-full flex flex-col items-center sm:flex-row'>
                            <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71] sm:basis-[35%] sm:text-end'>Paymode</FormLabel>
                            <div className='w-full h-full flex flex-row items-center justify-between gap-2 sm:basis-[65%]'>
                                <FormField
                                    control={form.control}
                                    name='pay_mode'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value='Cash'>Cash</SelectItem>
                                                        <SelectItem value='Cheque'>Cheque</SelectItem>
                                                        <SelectItem value='Credit Card'>Credit Card</SelectItem>
                                                        <SelectItem value='DD'>DD</SelectItem>
                                                        <SelectItem value='Debit Card'>Debit Card</SelectItem>
                                                        <SelectItem value='NEFT'>NEFT</SelectItem>
                                                        <SelectItem value='Net Banking'>Net Banking</SelectItem>
                                                        <SelectItem value='Swiped Card'>Swiped Card</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>


                    <div className='flex flex-row w-full gap-2'>
                        {/* Send SMS */}
                        <FormField
                            control={form.control}
                            name='send_sms'
                            render={({ field }) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-end justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='flex-1 flex items-center justify-end space-x-2'>
                                                <Label
                                                    htmlFor='send_sms'
                                                    className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Send SMS After Enquiry
                                                </Label>
                                                <Switch
                                                    id='send_sms'
                                                    {...field}
                                                    // @ts-ignore
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                />
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />
                        {/* Is Auto Roll No. */}
                        <FormField
                            control={form.control}
                            name='is_auto_roll_no'
                            render={({ field }) => (
                                <FormItem className='w-full flex-1 h-10 pt-4 flex flex-row items-start justify-between sm:items-center sm:gap-2 sm:mt-0'>
                                    <>
                                        <FormControl>
                                            <div className='flex-1 flex items-center justify-end space-x-2'>
                                                <Label
                                                    htmlFor='is_auto_roll_no'
                                                    className='text-xs text-[#726E71] text-end pr-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                >
                                                    Is Auto Roll No.
                                                </Label>
                                                <Switch
                                                    id='is_auto_roll_no'
                                                    {...field}
                                                    // @ts-ignore
                                                    value={field.value}
                                                    onCheckedChange={field.onChange}
                                                    checked={field.value}
                                                />
                                            </div>
                                        </FormControl>
                                    </>
                                </FormItem>
                            )}
                        />
                    </div>

                    
                    {/* Buttons */}
                    <Button
                        type='submit'
                        className='px-8 h-8 mb-4 mt-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px]'
                    >
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}





// Export
export default FormCom;