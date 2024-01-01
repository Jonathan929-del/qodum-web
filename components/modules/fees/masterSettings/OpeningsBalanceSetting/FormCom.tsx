'use client';
// Imports
import * as z from 'zod';
import {useEffect, useState} from 'react';
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
import {FeeEntrySettingOthersValidation} from '@/lib/validations/fees/masterSettings/feeEntrySettingOthers.validation';
import { Switch } from '@/components/ui/switch';






// Main function
const FormCom = () => {


    // Toast
    const {toast} = useToast();

    const advnace_types = [
        'Colleage fee',
        'Plawat',
        'Annual fee',
    ]
    // Opened Form
    const [openedFormName, setOpenedFormName] = useState('generate-single-receipt');


    // Selected Form Com
    const [selectedFormCom, setSelectedFormCom] = useState<any>();


    // Form
    const form = useForm({
        resolver:zodResolver(FeeEntrySettingOthersValidation),
        defaultValues:{
           

        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof FeeEntrySettingOthersValidation>) => {
        try {


            toast({title:'Saved Successfully'});

            // Reseting form
            form.reset({
               
            });

        } catch (err:any) {
            console.log(err.message);
        }
    };


    


   


    return (
        <div className='w-[90%]  max-w-[1100px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Fee Opening Balance Setting</h2>
            <h2 className='w-full text-center text-2xl my-4'> Fee Opening Balance and Advance Amount Setting</h2>
            <Form
                {...form}
            >
                
                <div className="section p-1 mb-2 border rounded-xl flex flex-col gap-1 w-[70%] mx-auto">
                    <div className="item">
                        <input type="radio" className='mx-2'  name="name" />
                        <label className='text-xs' htmlFor="">Auto adjust, If advance amount is greater than or equal to next installment amount.</label>
                    </div>
                    <div className="item">
                        <input type="radio" className='mx-2'  name="name" />
                        <label className='text-xs' htmlFor="">Manually adjust advance amount.</label>
                    </div>
                </div>
                
                <div className="section p-1 mb-2  border rounded-xl flex flex-col w-[70%] mx-auto">
                    <div className="item">
                        <input type="radio" className='mx-2'  name="name" />
                        <label className='text-xs' htmlFor="">Auto adjust, If advance amount is greater than or equal to next installment amount.</label>
                    </div>
                    <div className="item">
                        <input type="radio" className='mx-2'  name="name" />
                        <label className='text-xs' htmlFor="">Manually adjust advance amount.</label>
                    </div>
                </div>
                
                <div className="section p-2 mb-2  border rounded-xl flex flex-col  w-[70%] mx-auto">
     
                    <FormField
                        control={form.control}
                        name='group'
                        render={({field}) => (
                            <FormItem className='relative w-full mb-2 flex flex-col items-start justify-center h-7 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Fee Type For Advance </FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='w-full h-full flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Select'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {advnace_types.length < 1 ? (
                                                        <p>No types found</p>
                                                    ) : advnace_types[0] ? advnace_types.map((type:any, index: number) => (
                                                    <SelectItem 
                                                        value={type} 
                                                        key={index}>{type}</SelectItem>
                                                )) : (
                                                    <LoadingIcon />
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </div>
                                <FormMessage className='absolute text-xs w-[200px] z-10 left-0 sm:left-[30%] top-[100%]'/>
                            </FormItem>
                        )}
                    />

                    <p className='text-sm'>
                        <span className="font-bold">Note</span>:Advance will manage in selected type by default, i.e if "All fee type" option is select while taking a fee than advance will manage in fee type which selected here
                    </p>
                </div>

                    

                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 mt-4 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>
            </Form>
        </div>
    );
};





// Export
export default FormCom;