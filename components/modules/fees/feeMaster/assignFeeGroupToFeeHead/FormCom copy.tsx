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
import {fetchAffiliatedHeads} from '@/lib/actions/fees/feeMaster/feeMaster/head.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {assignFeeGroupToFeeHead, fetchGroupByName} from '@/lib/actions/fees/feeMaster/feeMaster/group.actions';
import {AssignFeeGroupToFeeHeadValidation} from '@/lib/validations/fees/feeMaster/assignFeeGroupToFeeHead.validation';





// Main function
const FormCom = ({groups}: any) => {


    // Toast
    const {toast} = useToast();


    // Heads
    const [heads, setHeads] = useState([{}]);


    // Selected heads
    const [selectedHeads, setSelectedHeads] = useState([{}]);


    // Form
    const form = useForm({
        resolver:zodResolver(AssignFeeGroupToFeeHeadValidation),
        defaultValues: {
            group_name:'',
            affiliated_heads:[{
                type_name:'',
                head_name:'',
                schedule_type:'',
                installment:'',
                account:'',
                post_account:''
            }]
        }
    });


    // Submit handler
    const onSubmit = async (values: z.infer<typeof AssignFeeGroupToFeeHeadValidation>) => {
        await assignFeeGroupToFeeHead({
            group_name:values.group_name,
            affiliated_heads:values.affiliated_heads.filter(head => head.head_name !== '')
        });
        toast({title:'Saved Successfully!'});
        form.reset({
            group_name:'',
            affiliated_heads:[]
        });
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            if(form.getValues().group_name !== ''){
                const group = await fetchGroupByName({name:form.getValues().group_name});
                const groupHeads = group.affiliated_heads;
                groupHeads.map((head:any) => {
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.type_name`, head.type_name);
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.head_name`, head.head_name);
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.schedule_type`, head.schedule_type);
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.installment`, head.installment);
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.account`, head.account);
                    form.setValue(`affiliated_heads.${groupHeads.indexOf(head)}.post_account`, head.post_account);
                });
            }
        };
        fetcher();
    }, [form.watch('group_name')]);

    useEffect(() => {
        const fetcher = async () => {
            const headsRes = await fetchAffiliatedHeads();
            setHeads(headsRes);
        };
        fetcher();
    }, []);
    

    return (
        <div className='w-[100%] max-w-[1500px] h-full overflow-y-scroll overflow-x-hidden custom-sidebar-scrollbar flex flex-col items-center'>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 items-center px-2 gap-4 sm:px-4'
                >


                    {/* Fee group */}
                    <FormField
                        control={form.control}
                        name='group_name'
                        render={({field}) => (
                            <FormItem className='w-full max-w-[300px]'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Fee Group</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Group'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {groups.length < 1 ? (
                                                    <p>No Group</p>
                                                ) : !groups[0] ? (
                                                    <LoadingIcon />
                                                ) : groups.map((group:any) => (
                                                    <SelectItem value={group.name} key={group._id}>{group.name}</SelectItem>
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
                        heads={heads}
                        setHeads={setHeads}
                        form={form}
                    />


                    {/* Save button */}
                    <Button
                        type='submit'
                        className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>


                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;