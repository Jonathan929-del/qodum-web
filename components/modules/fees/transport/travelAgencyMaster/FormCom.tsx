'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {TravelMasterValidation} from '@/lib/validations/fees/transport/travelMaster.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createTravelMaster, deleteTravelMaster, modifyTravelMaster} from '@/lib/actions/fees/transport/travelMaster.actions';





// Main function
const FormCom = ({setIsViewOpened, travelMasters, updateTravelMaster, setUpdateTravelMaster}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        travel_agency_name:updateTravelMaster.travel_agency_name,
        mobile_no:updateTravelMaster.mobile_no,
        mail_id:updateTravelMaster.mail_id
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(TravelMasterValidation),
        defaultValues:{
            travel_agency_name:updateTravelMaster.id === '' ? '' : updateTravelMaster.travel_agency_name,
            mobile_no:updateTravelMaster.id === '' ? null : updateTravelMaster.mobile_no,
            mail_id:updateTravelMaster.id === '' ? '' : updateTravelMaster.mail_id
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof TravelMasterValidation>) => {
        // Create travel master
        if(updateTravelMaster.id === ''){
            await createTravelMaster({
                travel_agency_name:values.travel_agency_name,
                mobile_no:values.mobile_no,
                mail_id:values.mail_id
            });
            toast({title:'Added Successfully!'});
        }
        // Modify travel master
        else if(!deepEqual(comparisonObject, values)){
            console.log('Excuting');
            await modifyTravelMaster({
                id:updateTravelMaster.id,
                travel_agency_name:values.travel_agency_name,
                mobile_no:values.mobile_no,
                mail_id:values.mail_id
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete travel master
        else if(updateTravelMaster.isDeleteClicked){
            await deleteTravelMaster({id:updateTravelMaster.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateTravelMaster({
            id:'',
            isDeleteClicked:false,
            travel_agency_name:'',
            mobile_no:'',
            mail_id:''
        });
        // Reseting form
        form.reset({
            travel_agency_name:'',
            mobile_no:'',
            mail_id:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Travel Master</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-2 px-2 sm:px-4'
                >


                    {/* Travel Agency Name */}
                    <FormField
                        control={form.control}
                        name='travel_agency_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Travel Agency Name</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Mobile No. */}
                    <FormField
                        control={form.control}
                        name='mobile_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Mobile No.</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Mail Id */}
                    <FormField
                        control={form.control}
                        name='mail_id'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-xs text-[#726E71] sm:basis-[30%]'>Mail Id</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='flex flex-row items-center h-full text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] resize-none'
                                        />
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} travelMasters={travelMasters} updateTravelMaster={updateTravelMaster} setUpdateTravelMaster={setUpdateTravelMaster} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;