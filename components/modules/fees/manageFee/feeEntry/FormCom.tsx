'use client';
// Imports
import * as z from 'zod';
import HeadsList from './HeadsList';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {AssignAmountGroupValidation} from '@/lib/validations/fees/feeMaster/assignAmountGroup.validation';
import {assignAmountGroup, fetchGroupHeadWithInstallment, fetchRegularGroupHeadsByName} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';





// Main function
const FormCom = ({installments}: any) => {


    // Toast
    const {toast} = useToast();


    // Is data fetching
    const [isDataFetching, setIsDataFetching] = useState(false);


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Form
    const form = useForm({
        resolver:zodResolver(AssignAmountGroupValidation),
        defaultValues: {
            group_name:'',
            installment:'Select All',
            affiliated_heads:[{
                head_name:'',
                amount:0
            }]
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AssignAmountGroupValidation>) => {
        await assignAmountGroup({
            group_name:values.group_name,
            installment:values.installment,
            affiliated_heads:heads
        });
        toast({title:'Saved Successfully!'});
        setHeads([]);
        form.reset({
            group_name:'',
            installment:'Select All',
            affiliated_heads:[]
        });
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            if(form.getValues().group_name !== '' && form.getValues().installment !== ''){
                setIsDataFetching(true);

                const res = form.getValues().installment === 'Select All'
                ? await fetchRegularGroupHeadsByName({name:form.getValues().group_name})
                : await fetchGroupHeadWithInstallment({group_name:form.getValues().group_name, installment:form.getValues().installment});
                setHeads(res);
                setIsDataFetching(false);
            }
        };
        fetcher();
    }, [form.watch('group_name'), form.watch('installment')]);


    return (
        <div className='w-[100%] max-w-[1500px] flex flex-col items-center overflow-y-scroll custom-sidebar-scrollbar'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 gap-8 sm:px-4 sm:gap-4'
                >


                    {/* Installment */}
                    <FormField
                        control={form.control}
                        name='installment'
                        render={({field}) => (
                            <FormItem className='w-full max-w-[300px]'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Installment</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Installment'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Select All'>Select All</SelectItem>
                                                {installments.length < 1 ? (
                                                    <p>No installments</p>
                                                ) : !installments[0].name ? (
                                                    <LoadingIcon />
                                                ) : installments.map((installment:any) => (
                                                    <SelectItem value={installment.name} key={installment._id}>{installment.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </div>
                        </FormItem>
                        )}
                    />


                    {/* Fee heads */}
                    <HeadsList
                        form={form}
                        heads={heads}
                        installments={installments}
                        isDataFetching={isDataFetching}
                    />


                    {/* Buttons */}
                    <div className='flex flex-row items-center gap-4'>
                        <Button
                            type='submit'
                            className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Save
                        </Button>
                        <span
                            className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Show
                        </span>
                    </div>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;