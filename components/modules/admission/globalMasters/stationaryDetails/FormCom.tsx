'use client';
// Imports
import * as z from 'zod';
import {useState} from 'react';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {StationaryDetailsValidation} from '@/lib/validations/admission/globalMasters/stationaryDetails.validation';
import {createStationaryDetails, deleteStationaryDetails, modifyStationaryDetails} from '@/lib/actions/admission/globalMasters/stationaryDetails.actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';





// Main function
const FormCom = ({setIsViewOpened, stationaryDetails, updateStationaryDetails, setUpdateStationaryDetails, bankLedgers, schools, sessions}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        stationary_name:updateStationaryDetails.stationary_name,
        amount:updateStationaryDetails.amount,
        post_account_name:updateStationaryDetails.post_account_name,
        school_name:updateStationaryDetails.school_name,
        session:updateStationaryDetails.session
    };


    // Form
    const form = useForm({
        resolver:zodResolver(StationaryDetailsValidation),
        defaultValues:{
            stationary_name:updateStationaryDetails.id === '' ? '' : updateStationaryDetails.stationary_name,
            amount:updateStationaryDetails.id === '' ? '' : updateStationaryDetails.amount,
            post_account_name:updateStationaryDetails.id === '' ? '' : updateStationaryDetails.post_account_name,
            school_name:updateStationaryDetails.id === '' ? '' : updateStationaryDetails.school_name,
            session:updateStationaryDetails.id === '' ? '' : updateStationaryDetails.session
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof StationaryDetailsValidation>) => {
        // Create stationary details
        if(updateStationaryDetails.id === ''){
            if(stationaryDetails.map((s:any) => s.stationary_name).includes(values.stationary_name)){
                toast({title:'Stationary name already exists', variant:'error'});
                return;
            };
            await createStationaryDetails({
                stationary_name:values.stationary_name,
                amount:values.amount,
                post_account_name:values.post_account_name,
                school_name:values.school_name,
                session:values.session
            });
            toast({title:'Added Successfully!'});
        }
        // Modify stationary details
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.stationary_name !== values.stationary_name && stationaryDetails.map((s:any) => s.stationary_name).includes(values.stationary_name)){
                toast({title:'Stationary name is already exists', variant:'error'});
                return;
            };
            await modifyStationaryDetails({
                id:updateStationaryDetails.id,
                stationary_name:values.stationary_name,
                amount:values.amount,
                post_account_name:values.post_account_name,
                school_name:values.school_name,
                session:values.session
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete stationary details
        else if(updateStationaryDetails.isDeleteClicked){
            await deleteStationaryDetails({id:updateStationaryDetails.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateStationaryDetails({
            id:'',
            isDeleteClicked:false,
            stationary_name:'',
            amount:'',
            post_account_name:'',
            school_name:'',
            session:''
        });
        // Reseting form
        form.reset({
            stationary_name:'',
            amount:'',
            post_account_name:'',
            school_name:'',
            session:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Stationary Details</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col pt-4 gap-3 items-center px-2 sm:px-4'
                >


                    {/* Stationary Name */}
                    <FormField
                        control={form.control}
                        name='stationary_name'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center mt-2 mb-[-4px] sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Stationary Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row h-8 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Amount */}
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({field}) => (
                            <FormItem className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Amount</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex h-8 flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-xs'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Post Account Name */}
                    <FormField
                        control={form.control}
                        name='post_account_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                                <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Post Account Name</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Account'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {bankLedgers.length < 1 ? (
                                                        <p>No post accounts</p>
                                                    ) : !bankLedgers[0] ? (
                                                        <LoadingIcon />
                                                    ) : bankLedgers.map((account:any) => (
                                                        <SelectItem value={account.account_name} key={account._id}>{account.account_name}</SelectItem>
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


                    {/* School Name */}
                    <FormField
                        control={form.control}
                        name='school_name'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>School Name</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select School'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {schools.length < 1 ? (
                                                    <p>No post accounts</p>
                                                ) : !schools[0] ? (
                                                    <LoadingIcon />
                                                ) : schools.map((school:any) => (
                                                    <SelectItem value={school.school_name} key={school._id}>{school.school_name}</SelectItem>
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


                    {/* Session */}
                    <FormField
                        control={form.control}
                        name='session'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Session</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                <SelectValue placeholder='Select Session'/>
                                                <ChevronDown className='h-4 w-4 opacity-50'/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sessions.length < 1 ? (
                                                    <p>No post accounts</p>
                                                ) : !sessions[0] ? (
                                                    <LoadingIcon />
                                                ) : sessions.map((session:any) => (
                                                    <SelectItem value={session.year_name} key={session._id}>{session.year_name}</SelectItem>
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


                    {/* Buttons */}
                    <Buttons setIsViewOpened={setIsViewOpened} stationaryDetails={stationaryDetails} updateStationaryDetails={updateStationaryDetails} setUpdateStationaryDetails={setUpdateStationaryDetails} onSubmit={onSubmit} form={form}/>

                    
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;