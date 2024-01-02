'use client';
// Imports
import * as z from 'zod';
import {useEffect, useSgit tate} from 'react';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {FeeEntrySettingValidation} from '@/lib/validations/fees/masterSettings/feeEntrySetting.validation';
import {fetchClass, modifyClassSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {RelateClassValidation} from '@/lib/validations/fees/globalMasters/defineClassDetails/relateClass.validation';






// Main function
const FormCom = () => {


    // Toast
    const {toast} = useToast();


    // Opened Form
    const [openedFormName, setOpenedFormName] = useState('generate-single-receipt');


    // Selected Form Com
    const [selectedFormCom, setSelectedFormCom] = useState<any>();


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntrySettingValidation),
        defaultValues:{
            single_prefix:'',
            single_lead_zero:'',
            single_receipt_no:'',
            single_suffix:'',
            school_prefix:'',
            school_lead_zero:'',
            school_receipt_no:'',
            school_suffix:'',
            fee_school_prefix:'',
            fee_transport_prefix:'',
            fee_tution_prefix:'',
            fee_school_lead_zero:'',
            fee_transport_lead_zero:'',
            fee_tution_lead_zero:'',
            fee_school_receipt_no:'',
            fee_transport_receipt_no:'',
            fee_tution_receipt_no:'',
            fee_school_suffix:'',
            fee_transport_suffix:'',
            fee_tution_suffix:''
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntrySettingValidation>) => {
        try {



            toast({title:'Updated Successfully'});

            // Reseting form
            form.reset({
                single_prefix:'',
                single_lead_zero:'',
                single_receipt_no:'',
                single_suffix:'',
                school_prefix:'',
                school_lead_zero:'',
                school_receipt_no:'',
                school_suffix:'',
                fee_school_prefix:'',
                fee_transport_prefix:'',
                fee_tution_prefix:'',
                fee_school_lead_zero:'',
                fee_transport_lead_zero:'',
                fee_tution_lead_zero:'',
                fee_school_receipt_no:'',
                fee_transport_receipt_no:'',
                fee_tution_receipt_no:'',
                fee_school_suffix:'',
                fee_transport_suffix:'',
                fee_tution_suffix:''
            });

        } catch (err:any) {
            console.log(err.message);
        }
    };


    const threeAndFour = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* Fee Type */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Fee Type</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>SCHOOL</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>TRANSPORT</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>TUTION FEE</li>
            </ul>
            {/* Fee Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_school_prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_transport_prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_tution_prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_school_lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_transport_lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_tution_lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_school_receipt_no'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_transport_receipt_no'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_tution_receipt_no'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Fee Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_school_suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_transport_suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='fee_tution_suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>

        </div>
    );


    const two = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* School Type */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>School Name</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>Franciscan Global School</li>
            </ul>
            {/* School Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='school_prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='school_lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='school_receipt_no'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='school_suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
        </div>
    );


    const one = (
        <div className='h-full flex flex-row overflow-x-scroll custom-scrollbar'>
            {/* Single Prefix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Prefix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='single_prefix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter prefix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Single Lead Zero */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Lead Zero</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='single_lead_zero'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='0'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* Single Receipt No. */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>RCPT No. Start</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='single_receipt_no'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='1'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
            {/* School Suffix */}
            <ul className='h-full flex flex-col text-xs'>
                <li className='flex-1 flex items-center px-2 text-sm border-[0.5px] border-[#ccc]'>Suffix</li>
                <li className='flex-1 flex items-center px-2 border-[0.5px] border-[#ccc] bg-[#E2E4FF]'>
                    <FormField
                        control={form.control}
                        name='single_suffix'
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Enter Suffix'
                                        className='h-[90%] w-[100px] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[1px] border-[#E4E4E4] placeholder:text-hash-color'
                                    />
                                </FormControl>
                                <FormMessage className='mt-[-20px] text-xs'/>
                            </FormItem>
                        )}
                    />
                </li>
            </ul>
        </div>
    );


    // Use effect
    useEffect(() => {
        switch (openedFormName){
            case 'generate-single-receipt':
                setSelectedFormCom(one);
                return;
            case 'generate-school-wise-receipt':
                setSelectedFormCom(two);
                return;
            case 'generate-fee-type-wise-receipt':
                setSelectedFormCom(threeAndFour);
                return;
            case 'generate-school-with-fee-type-wise-receipt':
                setSelectedFormCom(threeAndFour);
                return;
        };
    }, [openedFormName]);


    return (
        <div className='w-[90%] max-w-[1100px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col py-4 items-center px-2 sm:px-4'
                >


                    <div className='w-full flex flex-col items-between justify-between gap-4 xl:flex-row'>
                        <RadioGroup defaultValue='generate-single-receipt' className='h-[150px]' onValueChange={(v:any) => setOpenedFormName(v)}>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-single-receipt' id='generate-single-receipt'/>
                                <Label htmlFor='generate-single-receipt' className='text-xs'>Generate Single Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-school-wise-receipt' id='generate-school-wise-receipt'/>
                                <Label htmlFor='generate-school-wise-receipt' className='text-xs'>Generate School Wise Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-fee-type-wise-receipt' id='generate-fee-type-wise-receipt'/>
                                <Label htmlFor='generate-fee-type-wise-receipt' className='text-xs'>Generate Fee Type Wise Receipt</Label>
                            </div>
                            <div className='flex items-center space-x-[4px]'>
                                <RadioGroupItem value='generate-school-with-fee-type-wise-receipt' id='generate-school-with-fee-type-wise-receipt'/>
                                <Label htmlFor='generate-school-with-fee-type-wise-receipt' className='text-xs'>Generate School with Fee Type Wise Receipt</Label>
                            </div>
                        </RadioGroup>
                        <div className={`${openedFormName === 'generate-single-receipt' || openedFormName === 'generate-school-wise-receipt' ? 'h-[120px]' : 'h-[200px]'} flex flex-col`}>
                            <h4>Set below details:</h4>
                            {selectedFormCom}
                        </div>
                    </div>


                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 mt-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Update
                    </Button>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;