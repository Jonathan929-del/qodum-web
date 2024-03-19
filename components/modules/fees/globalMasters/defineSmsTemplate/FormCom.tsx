'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {SmsTemplateValidation} from '@/lib/validations/fees/globalMasters/smsTemplate.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createSmsTemplate, deleteSmsTemplate, modifySmsTemplate} from '@/lib/actions/fees/globalMasters/smsTemplate.actions';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main function
const FormCom = ({setIsViewOpened, smsTemplates, updateSmsTemplate, setUpdateSmsTemplate}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        sms_type:updateSmsTemplate.sms_type,
        sms_template:updateSmsTemplate.sms_template,
        is_enable:updateSmsTemplate.is_enable
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(SmsTemplateValidation),
        defaultValues:{
            sms_type:updateSmsTemplate.id === '' ? '' : updateSmsTemplate.sms_type,
            sms_template:updateSmsTemplate.id === '' ? '' : updateSmsTemplate.sms_template,
            is_enable:updateSmsTemplate.id === '' ? false : updateSmsTemplate.is_enable
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof SmsTemplateValidation>) => {
        // Create sms template
        if(updateSmsTemplate.id === ''){
            await createSmsTemplate({
                sms_type:values.sms_type,
                sms_template:values.sms_template,
                is_enable:values.is_enable
            });
            toast({title:'Added Successfully!'});
        }
        // Modify sms template
        else if(!deepEqual(comparisonObject, values)){
            await modifySmsTemplate({
                id:updateSmsTemplate.id,
                sms_type:values.sms_type,
                sms_template:values.sms_template,
                is_enable:values.is_enable
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete sms template
        else if(updateSmsTemplate.isDeleteClicked){
            await deleteSmsTemplate({id:updateSmsTemplate.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateSmsTemplate({
            id:'',
            isDeleteClicked:false,
            sms_type:'',
            sms_template:'',
            is_enable:false
        });
        // Reseting form
        form.reset({
            sms_type:'',
            sms_template:'',
            is_enable:false
        });
    };


    return (
        <div className='w-[90%] max-w-[600px] h-[90%] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] overflow-y-scroll custom-sidebar-scrollbar sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define SMS Template</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-2 px-2 py-4 sm:px-4'
                >



                    {/* SMS Type */}
                    <FormField
                        control={form.control}
                        name='sms_type'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-row items-center justify-center sm:gap-2'>
                                <FormLabel className='basis-[30%] h-full flex justify-start items-center text-[10px] text-[#726E71] lg:text-xs sm:justify-end sm:basis-[20%]'>SMS Type</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4 sm:basis-[80%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Admission SMS'>Admission SMS</SelectItem>
                                                <SelectItem value='Cheque Bounce'>Cheque Bounce</SelectItem>
                                                <SelectItem value='Defaulter SMS'>Defaulter SMS</SelectItem>
                                                <SelectItem value='Fee Deposition'>Fee Deposition</SelectItem>
                                                <SelectItem value='General'>General</SelectItem>
                                                <SelectItem value='Insurance'>Insurance</SelectItem>
                                                <SelectItem value='Item approachint out of stock'>Item approachint out of stock</SelectItem>
                                                <SelectItem value='Item Maintainance'>Item Maintainance</SelectItem>
                                                <SelectItem value='Item out of max limit'>Item out of max limit</SelectItem>
                                                <SelectItem value='Item out of stock'>Item out of stock</SelectItem>
                                                <SelectItem value='Permit for Delhi'>Permit for Delhi</SelectItem>
                                                <SelectItem value='Permit for UP'>Permit for UP</SelectItem>
                                                <SelectItem value='Pollution'>Pollution</SelectItem>
                                                <SelectItem value='Registration SMS'>Registration SMS</SelectItem>
                                                <SelectItem value='Salary SMS'>Salary SMS</SelectItem>
                                                <SelectItem value='Vehicle Fitness'>Vehicle Fitness</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* SMS */}
                    <FormField
                        control={form.control}
                        name='sms_template'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-end text-xs text-[#726E71] sm:basis-[20%]'>SMS</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[80%]'>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className='flex flex-row items-center h-[150px] text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Is Enable */}
                    <FormField
                        control={form.control}
                        name='is_enable'
                        render={({field}) => (
                            <FormItem className='w-full flex-1 h-10 flex flex-row items-start justify-between sm:items-center sm:gap-2'>
                                <FormControl>
                                    <div className='flex-1 flex items-center justify-end space-x-2'>
                                        <Label
                                            htmlFor='is_enable'
                                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Is Enable
                                        </Label>
                                        <Switch
                                            id='is_enable'
                                            {...field}
                                            value={field.value}
                                            onCheckedChange={field.onChange}
                                            checked={field.value}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Plus */}
                    <div className='w-full flex justify-end'>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='text-[16px] w-[75px] py-[2px] text-white bg-[#4CA7DE] transition border-[1px] rounded-[4px] border-white hover:opacity-80'
                            >
                                +
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                    This action will add the general sms templates for :-
                                    Fee deposition, Fee defaulter and Cheque bounce.
                                    Do you want to continue?
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <AlertDialogAction>
                                        Yes
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} smsTemplates={smsTemplates} updateSmsTemplate={updateSmsTemplate} setUpdateSmsTemplate={setUpdateSmsTemplate} onSubmit={onSubmit} form={form}/>
                    </div>


                    {/* Note */}
                    <div className='flex flex-col gap-2 mt-4'>
                        <p className='text-xs font-semibold'>
                            Note:- For using all below fields please use the symbols of that fields instead of field Name.
                        </p>
                        <div className='flex flex-col lg:flex-row gap-2'>
                            {/* Row one */}
                            <div className='flex flex-col items-start gap-[2px]'>
                                <p className='text-xs text-hash-color'>StudentName :-	S____</p>
                                <p className='text-xs text-hash-color'>Receiving Date :-	Rd____</p>
                                <p className='text-xs text-hash-color'>Installment Name:-	IN____</p>
                                <p className='text-xs text-hash-color'>School name:-	#school__</p>
                                <p className='text-xs text-hash-color'>Salary Month:-	M____</p>
                                <p className='text-xs text-hash-color'>Absent Days:-	AB____</p>
                                <p className='text-xs text-hash-color'>Payment URL:-	#payurl__</p>
                            </div>
                            {/* Row two */}
                            <div className='flex flex-col items-start gap-[2px]'>
                                <p className='text-xs text-hash-color'>Amount :-	Amt____</p>
                                <p className='text-xs text-hash-color'>ReceiptNo :-	Rid____	</p>
                                <p className='text-xs text-hash-color'>RegistrationNo:-	#RegNo__</p>
                                <p className='text-xs text-hash-color'>Class Name:-	#Class__</p>
                                <p className='text-xs text-hash-color'>Total Days:-	W____</p>
                                <p className='text-xs text-hash-color'>Total Salary:-	Sal____</p>
                            </div>
                            {/* Row three */}
                            <div className='flex flex-col items-start gap-[2px]'>
                                <p className='text-xs text-hash-color'>Bus Stop Name	#Stop__</p>
                                <p className='text-xs text-hash-color'>Vehicle Name	#Vehicle__</p>
                                <p className='text-xs text-hash-color'>Route Name	#Route__</p>
                                <p className='text-xs text-hash-color'>Staff Name:-	R____</p>
                                <p className='text-xs text-hash-color'>Present Days:-	D____</p>
                                <p className='text-xs text-hash-color'>Line Change:-	%0A</p>
                            </div>
                        </div>
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;