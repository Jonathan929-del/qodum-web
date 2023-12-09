'use client';
// Imports
import * as z from 'zod';
import {useForm} from 'react-hook-form';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {NarrationMasterValidation} from '@/lib/validations/narrationMaster';
import AccountsGlobalMasterButtons from '@/components/modules/shared/AccountsGlobalMasterButtons';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createNarrationMaster, modifyNarrationMaster} from '@/lib/actions/accounts/accounts.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const FormCom = ({setIsViewOpened, narrations, updateNarration, setUpdateNarration}:any) => {


    // Toast
    const {toast} = useToast();


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
        if(updateNarration.id === ''){
            await createNarrationMaster({
                voucher_type:values.voucher_type,
                narration:values.narration
            });
            toast({title:'Added Successfully!'});
        }else{
            await modifyNarrationMaster({
                id:updateNarration.id,
                narration:values.narration,
                voucher_type:values.voucher_type
            });
            toast({title:'Updated Successfully!'});
        }
        form.reset();
    };


    return (
        <div className='w-[400px] flex flex-col items-center rounded-[8px] border-2 border-[#E8E8E8] sm:w-[500px]'>
            <h2 className='w-full text-center py-2 text-xs border-b-2 border-[#E8E8E8] rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Narration Master</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full px-10'
                >
                    <FormField
                        control={form.control}
                        name='voucher_type'
                        render={({field}) => (
                            <FormItem className='w-full h-20 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] text-xs text-[#726E71]'>Select voucher type</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='basis-[70%] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Cash payment voucher' className='text-xs'/>
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
                    <FormField
                        control={form.control}
                        name='narration'
                        render={({field}) => (
                            <FormItem className='w-full h-20 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='basis-[30%] text-xs text-[#726E71]'>Narration</FormLabel>
                                <div className='basis-[70%] flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className='sm:px-10'>
                        <AccountsGlobalMasterButtons setIsViewOpened={setIsViewOpened} narrations={narrations} updateNarration={updateNarration} setUpdateNarration={setUpdateNarration} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;