'use client';
// Imports
import * as z from 'zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {NarrationMasterValidation} from '@/lib/validations/narrationMaster';
import {createNarrationMaster} from '@/lib/actions/accounts/accounts.actions';
import AccountsGlobalMasterButtons from '@/components/modules/shared/AccountsGlobalMasterButtons';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const FormCom = ({setIsViewOpened}:any) => {


    // Toast
    const {toast} = useToast();


    // Form
    const form = useForm({
        resolver:zodResolver(NarrationMasterValidation),
        defaultValues:{
            voucher_type:'Cash Payment Voucher',
            narration:''
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof NarrationMasterValidation>) => {
        await createNarrationMaster({
            voucher_type:values.voucher_type,
            narration:values.narration
        });
        toast({title:'Added Successfully!'});
        form.reset();
    };


    return (
        <div className='flex flex-col items-center rounded-[8px] border-2 border-[#E8E8E8]'>

            <h2 className='w-full px-44 py-2 text-xs font-bold text-[#3a3a3a] bg-[#E8E8E8]'>Define Narration Master</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='voucher_type'
                        render={({field}) => (
                            <FormItem className='h-20 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='text-xs text-[#726E71]'>Select voucher type</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] h-8'>
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
                            <FormItem className='h-20 flex flex-row items-center justify-center gap-2'>
                                <FormLabel className='text-xs text-[#726E71]'>Narration</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4'>
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
                    <AccountsGlobalMasterButtons setIsViewOpened={setIsViewOpened}/>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;