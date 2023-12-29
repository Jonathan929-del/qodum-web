'use client';
// Imports
import * as z from 'zod';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import Buttons from '@/components/modules/accounts/accounts/accountGroup/Buttons';
import {AccountGroupValidation} from '@/lib/validations/accounts/accounts/accountGroup.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createAccountGroup, deleteAccountGroup, modifyAccountGroup} from '@/lib/actions/accounts/accounts/accountGroup.actions';





// Main function
const FormCom = ({setIsViewOpened, accountGroups, updateAccountGroup, setUpdateAccountGroup}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        group_name:updateAccountGroup.group_name,
        category:updateAccountGroup.category,
        group_type:updateAccountGroup.group_type,
        group_no:updateAccountGroup.group_no
    };


    // Form
    const form = useForm({
        resolver:zodResolver(AccountGroupValidation),
        defaultValues:{
            group_name:updateAccountGroup.id === '' ? '' : updateAccountGroup.group_name,
            category:updateAccountGroup.id === '' ? '' : updateAccountGroup.category,
            group_type:updateAccountGroup.id === '' ? '' : updateAccountGroup.group_type,
            group_no:updateAccountGroup.id === '' ? null : updateAccountGroup.group_no
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof AccountGroupValidation>) => {
        // Create Account Group
        if(updateAccountGroup.id === ''){
            if(accountGroups.map((group:any) => group.group_name).includes(values.group_name)){
                toast({title:'Account group already exists', variant:'error'});
                return;
            }
            else if(accountGroups.map((group:any) => group.group_no).includes(values.group_no)){
                toast({title:'Group number already exists', variant:'error'});
                return;
            }
            else{
                await createAccountGroup({
                    group_name:values.group_name,
                    category:values.category,
                    group_type:values.group_type,
                    group_no:values.group_no
                });
                toast({title:'Added Successfully!'});
            };
        }
        // Modify Account Group
        else if(!deepEqual(comparisonObject, values)){
            // Ensuring unique account group name
            if(comparisonObject.group_name !== values.group_name && accountGroups.map((group:any) => group.group_name).includes(values.group_name)){
                toast({title:'Account group already exists', variant:'error'});
                return;
            }
            // Ensuring unique account group number
            else if(comparisonObject.group_no !== values.group_no && accountGroups.map((group:any) => group.group_no).includes(values.group_no)){
                toast({title:'Group number already exists', variant:'error'});
                return;
            }
            // Update
            else{
                await modifyAccountGroup({
                    id:updateAccountGroup.id,
                    group_name:values.group_name,
                    category:values.category,
                    group_type:values.group_type,
                    group_no:values.group_no
                });
                toast({title:'Updated Successfully!'});
            };
        }
        // Delete Account Group
        else if(updateAccountGroup.isDeleteClicked){
            await deleteAccountGroup({id:updateAccountGroup.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateAccountGroup({
            group_name:'',
            category:'',
            group_type:'',
            group_no:null,
            id:'',
            isDeleteClicked:false
        });
        // Reseting form
        form.reset({
            group_name:'',
            category:'',
            group_type:'',
            group_no:'',
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Account Group</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center px-2 sm:px-4'
                >


                    {/* Group Name */}
                    <FormField
                        control={form.control}
                        name='group_name'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-8 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto mb-[-4px] text-xs text-[#726E71] sm:basis-[30%] sm:mb-0'>Group Name</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-[35%] top-0 lg:left-[101%] lg:top-[50%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Category */}
                    <FormField
                        control={form.control}
                        name='category'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-8 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-2'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] mb-[-4px] sm:basis-[30%] sm:mb-0'>Category</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%] sm:h-10'>
                                    <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                                    <SelectValue placeholder='Select'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Bank'>Bank</SelectItem>
                                                    <SelectItem value='Party'>Party</SelectItem>
                                                    <SelectItem value='General'>General</SelectItem>
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-[35%] top-0 lg:left-[101%] lg:top-[50%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Group Type */}
                    <FormField
                        control={form.control}
                        name='group_type'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-8 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-[2px]'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] mb-[-4px] sm:basis-[30%] sm:mb-0'>Group Type</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%] sm:h-10'>
                                    <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%] sm:h-8'>
                                                    <SelectValue placeholder='Select'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Assets'>Assets</SelectItem>
                                                    <SelectItem value='Liability'>Liability</SelectItem>
                                                    <SelectItem value='Trading'>Trading</SelectItem>
                                                    <SelectItem value='Profit & Loss'>Profit & Loss</SelectItem>
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-[35%] top-0 lg:left-[101%] lg:top-[50%]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Group No. */}
                    <FormField
                        control={form.control}
                        name='group_no'
                        render={({field}) => (
                            <FormItem className='relative w-full flex flex-col items-start justify-center h-8 mt-6 sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] mb-[-4px] sm:basis-[30%] sm:mb-0'>Group No.</FormLabel>
                                <div className='w-full h-full flex flex-col items-start sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute text-xs w-[200px] left-[35%] top-0 lg:left-[101%] lg:top-[50%]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} accountGroups={accountGroups} updateAccountGroup={updateAccountGroup} setUpdateAccountGroup={setUpdateAccountGroup} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;