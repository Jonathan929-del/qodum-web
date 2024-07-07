'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {NarrationMasterValidation} from '@/lib/validations/accounts/globalMasters/narrationMaster';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createNarrationMaster, deleteNarrationMaster, modifyNarrationMaster} from '@/lib/actions/accounts/globalMasters/defineNarrationMasters.actions';





// Main function
const FormCom = ({setIsViewOpened, narrations, updateNarration, setUpdateNarration}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        narration:updateNarration.narration,
        voucher_type:updateNarration.voucher_type
    };


    // Form
    const form = useForm({
        resolver:zodResolver(NarrationMasterValidation),
        defaultValues:{
            narration:updateNarration.id === '' ? '' : updateNarration.narration,
            voucher_type:updateNarration.id === '' ? 'Cash Payment Voucher' : updateNarration.voucher_type
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof NarrationMasterValidation>) => {
        // Create Narration
        if(updateNarration.id === ''){
            const res = await createNarrationMaster({
                voucher_type:values.voucher_type,
                narration:values.narration
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify Narration
        else if(!deepEqual(comparisonObject, values)){
            await modifyNarrationMaster({
                id:updateNarration.id,
                narration:values.narration,
                voucher_type:values.voucher_type
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete Narration
        else if(updateNarration.isDeleteClicked){
            await deleteNarrationMaster({id:updateNarration.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateNarration({
            id:'',
            narration:'',
            voucher_type:'',
            isDeleteClicked:false
        });
        // Reseting form
        form.reset({
            narration:'',
            voucher_type:'Cash Payment Voucher'
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Narration Master</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >

                    {/* Narration */}
                    <FormField
                        control={form.control}
                        name='voucher_type'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2 sm:mt-4'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Select voucher type</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                            <SelectValue placeholder='Cash payment voucher'/>
                                            <ChevronDown className='h-4 w-4 opacity-50'/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='Cash Payment Voucher'>Cash Payment Voucher</SelectItem>
                                            <SelectItem value='Cash Receipt Voucher'>Cash Receipt Voucher</SelectItem>
                                            <SelectItem value='Bank Payment Voucher'>Bank Payment Voucher</SelectItem>
                                            <SelectItem value='Bank Receipt Voucher'>Bank Receipt Voucher</SelectItem>
                                            <SelectItem value='Contra Voucher'>Contra Voucher</SelectItem>
                                            <SelectItem value='Journal Voucher'>Journal Voucher</SelectItem>
                                            <SelectItem value='Payment Voucher'>Payment Voucher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    {/* Voucher type */}
                    <FormField
                        control={form.control}
                        name='narration'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Narration</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} narrations={narrations} updateNarration={updateNarration} setUpdateNarration={setUpdateNarration} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;