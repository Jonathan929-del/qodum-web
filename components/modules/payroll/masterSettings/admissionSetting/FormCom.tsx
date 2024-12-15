// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {StaffAdmissionNumberValidation} from '@/lib/validations/payroll/masterSettings/admission.validation';
import {createStaffAdmissionNumber, deleteStaffAdmissionNumber, modifyStaffAdmissionNumber, getEditableNumbers} from '@/lib/actions/payroll/masterSettings/staffAdmissionNumber.actions';





// Main function
function FormCom({setIsViewOpened, admissions, updateAdmission, setUpdateAdmission}:any){

    // Toast
    const {toast} = useToast();


    // Numbers
    const [numbers, setNumbers] = useState(['Employment Code', 'Applicant Reg. No.']);


    // Editable numbers
    const [editableNumbers, setEditableNumbers] = useState(['']);


    // Comparison object
    const comparisonObject = {
        school:updateAdmission.school,
        class_name:updateAdmission.class_name,
        board:updateAdmission.board,
        setting_type:updateAdmission.setting_type,
        should_be:updateAdmission.should_be,
        rec_no:updateAdmission.rec_no,
        prefix:updateAdmission.prefix,
        start_from:updateAdmission.start_from,
        lead_zero:updateAdmission.lead_zero,
        suffix:updateAdmission.suffix
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StaffAdmissionNumberValidation),
        defaultValues:{
            school:updateAdmission.id === '' ? '' : updateAdmission.school,
            class_name:updateAdmission.id === '' ? '' : updateAdmission.class_name,
            board:updateAdmission.id === '' ? '' : updateAdmission.board,
            setting_type:updateAdmission.id === '' ? '' : updateAdmission.setting_type,
            should_be:updateAdmission.id === '' ? 'Automatic' : updateAdmission.should_be,
            rec_no:updateAdmission.id === '' ? '' : updateAdmission.rec_no,
            prefix:updateAdmission.id === '' ? '' : updateAdmission.prefix,
            start_from:updateAdmission.id === '' ? '' : updateAdmission.start_from,
            lead_zero:updateAdmission.id === '' ? '' : updateAdmission.lead_zero,
            suffix:updateAdmission.id === '' ? '' : updateAdmission.suffix
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StaffAdmissionNumberValidation>) => {

        // Create setting
        if(updateAdmission.id === ''){
            if(values.prefix !== '' && admissions.map((a:any) => a.prefix).includes(values.prefix)){
                toast({title:'Number already exists', variant:'error'});
                return;
            };
            const res = await createStaffAdmissionNumber({
                setting_type:values.setting_type,
                should_be:values.should_be,
                rec_no:values.rec_no,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }

        // Modify setting
        else if(!deepEqual(comparisonObject, values)){
            // Checking if number is in use
            if(!editableNumbers.includes(updateAdmission.setting_type)){
                toast({title:"Can't edit number while in use", variant:'alert'});
                return;
            };
            if(values.prefix !== '' && comparisonObject.prefix !== values.prefix && admissions.map((a:any) => a.prefix).includes(values.prefix)){
                toast({title:'Number already exists', variant:'error'});
                return;
            };
            await modifyStaffAdmissionNumber({
                id:updateAdmission.id,
                setting_type:values.setting_type,
                should_be:values.should_be,
                rec_no:values.rec_no,
                prefix:values.prefix,
                start_from:values.start_from,
                lead_zero:values.lead_zero,
                suffix:values.suffix
            });
            toast({title:'Updated Successfully!'});
        }

        // Delete setting
        else if(updateAdmission.isDeleteClicked){
            await deleteStaffAdmissionNumber({id:updateAdmission.id});
            toast({title:'Deleted Successfully!'});
        };

        // Reseting update entity
        setUpdateAdmission({
            id:'',
            isDeleteClicked:false,
            setting_type:'',
            should_be:'Automatic',
            rec_no:'',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        });
        // Reseting form
        form.reset({
            setting_type:'',
            should_be:'Automatic',
            rec_no:'',
            prefix:'',
            start_from:'',
            lead_zero:'',
            suffix:''
        });

    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const editableNumbersRes = await getEditableNumbers();
            setEditableNumbers(editableNumbersRes);
        };
        fetcher();
    }, []);
    useEffect(() => {}, [form.watch('should_be')]);
    useEffect(() => {
        if(admissions[0]?.setting_type){
            const setValues = admissions.map((a:any) => a.setting_type);
            setNumbers(numbers.filter((n:any) => !setValues.includes(n)));
        }
    }, [admissions]);

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full flex flex-col items-center px-2 pt-6 sm:px-4'
            >


                {/* Registration and Employee Code Settings */}
                <div className='w-full flex flex-col mt-4 border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
                    <h2 className='w-full bg-[#EDF1F5] font-semibold text-start text-sm py-2 px-2 rounded-[5px]'>Registration and Employee Code Settings</h2>
                    <div className='flex flex-col px-4 py-2 gap-2'>

                        <div className='flex flex-col gap-4 lg:flex-row mt-4'>
                            {/* Setting Type */}
                            <div className='flex-1 flex flex-col items-center'>
                                <FormField 
                                    control={form?.control}
                                    name='setting_type'
                                    render={({ field }) => (
                                        <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-0 sm:mt-0'>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={field?.value}
                                                    onValueChange={field?.onChange}
                                                >
                                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {numbers.length < 1 && updateAdmission.id === '' ? (
                                                            <span>No numbers to set</span>
                                                        ) : numbers.map((n:any) => (
                                                            <SelectItem value={n}>{n}</SelectItem>
                                                        ))}
                                                        {updateAdmission.id !== '' && (
                                                            <SelectItem value={updateAdmission.setting_type}>{updateAdmission.setting_type}</SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Should Be */}
                            <div className="flex-1 flex flex-col items-start  gap-1">
                                <FormLabel className='text-start text-xs text-[#726E71] me-3'>should be</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='should_be'
                                    render={({ field }) => (
                                        <FormItem className='flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                            <FormControl>
                                                {/* @ts-ignore */}
                                                <RadioGroup
                                                    {...field}
                                                    defaultValue={form.getValues().should_be}
                                                    className='flex gap-2'
                                                >
                                                    <RadioGroupItem
                                                        value='Automatic'
                                                        onClick={() => form.setValue('should_be', 'Automatic')}
                                                    />
                                                    <Label className='text-xs text-[#726E71] '>Automatic</Label>
                                                    <RadioGroupItem
                                                        value='Manual'
                                                        onClick={() => form.setValue('should_be', 'Manual')}
                                                    />
                                                    <Label className='text-xs text-[#726E71] '>Manual</Label>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Rec. No. Start From (School Wise) */}
                            <FormField
                                control={form?.control}
                                name='rec_no'
                                render={({ field }) => (
                                    <FormItem className='flex-1 mt-2 sm:mt-0'>
                                        <div className='w-full h-7 flex flex-col items-start justify-center'>
                                            <FormLabel className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] sm:basis-[35%]'>Rec. No. Start From (School Wise)</FormLabel>
                                            <div className='h-full w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                    />
                                                </FormControl>
                                                <FormMessage className='mt-[-20px] text-[11px]' />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {form.getValues().should_be === 'Automatic' && (
                            <div className='flex flex-col gap-2 lg:flex-row mt-4'>
                                {/* Prefix */}
                                <FormField
                                    control={form?.control}
                                    name='prefix'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-[11px] text-[#726E71]'>Prefix</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Start From */}
                                <FormField
                                    control={form?.control}
                                    name='start_from'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Start From</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Lead Zero */}
                                <FormField
                                    control={form?.control}
                                    name='lead_zero'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Lead Zero</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {/* Suffix */}
                                <FormField
                                    control={form?.control}
                                    name='suffix'
                                    render={({ field }) => (
                                        <FormItem className='w-full mt-2 lg:mb-2'>
                                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Suffix</FormLabel>
                                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}


                    </div>
                </div>

                
                {/* Buttons */}
                <Buttons setIsViewOpened={setIsViewOpened} admissions={admissions} updateAdmission={updateAdmission} setUpdateAdmission={setUpdateAdmission} onSubmit={onSubmit} form={form} />

            </form>
        </Form>
    )
}





// Export
export default FormCom;