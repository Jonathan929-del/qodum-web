'use client';
// Imports
import * as z from 'zod';
import moment from 'moment';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {VehicleDetailsValidation} from '@/lib/validations/fees/transport/vehicelDetails.validation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createVehicleDetails, deleteVehicleDetails, modifyVehicleDetails} from '@/lib/actions/fees/transport/vehicleDetails.actions';





// Main function
const FormCom = ({setIsViewOpened, vehiclesDetails, updateVehicleDetails, setUpdateVehicleDetails, vehiclesTypes}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        vehicle_owner:updateVehicleDetails.vehicle_owner,
        vehicle_type:updateVehicleDetails.vehicle_type,
        vehicle_name:updateVehicleDetails.vehicle_name,
        vehicle_reg_no:updateVehicleDetails.vehicle_reg_no,
        driver_name:updateVehicleDetails.driver_name,
        driver_mobile_no:updateVehicleDetails.driver_mobile_no,
        gps_no:updateVehicleDetails.gps_no,
        service_due_date:updateVehicleDetails.service_due_date,
        insurance_due_date:updateVehicleDetails.insurance_due_date,
        vendor:updateVehicleDetails.vendor
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(VehicleDetailsValidation),
        defaultValues:{
            vehicle_owner:updateVehicleDetails.id === '' ? 'school' : updateVehicleDetails.vehicle_owner,
            vehicle_type:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_type,
            vehicle_name:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_name,
            vehicle_reg_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vehicle_reg_no,
            driver_name:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.driver_name,
            driver_mobile_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.driver_mobile_no,
            gps_no:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.gps_no,
            service_due_date:updateVehicleDetails.id === '' ? moment(new Date()).format('D-MMM-yy') : updateVehicleDetails.service_due_date,
            insurance_due_date:updateVehicleDetails.id === '' ? moment(new Date()).format('D-MMM-yy') : updateVehicleDetails.insurance_due_date,
            vendor:updateVehicleDetails.id === '' ? '' : updateVehicleDetails.vendor
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof VehicleDetailsValidation>) => {
        // Create vehicle details
        if(updateVehicleDetails.id === ''){
            // Ensuring that service and insurance due dates are not empty when the vehicle owner is a vendor
            if(values.vehicle_owner === 'vendor' && values.service_due_date === '' || values.insurance_due_date === ''){
                if(values.service_due_date === '' && values.insurance_due_date === ''){
                    form.setError('service_due_date', {message:'*Service due date is required'});
                    form.setError('insurance_due_date', {message:'*Insurance due date is required'});
                    return;                    
                }
                if(values.service_due_date === ''){
                    form.setError('service_due_date', {message:'*Service due date is required'});
                    return;
                }else{
                    form.setError('insurance_due_date', {message:'*Insurance due date is required'});
                    return;
                }
            }
            // Creating
            else{
                await createVehicleDetails({
                    vehicle_owner:values.vehicle_owner,
                    vehicle_type:values.vehicle_type,
                    vehicle_name:values.vehicle_name,
                    vehicle_reg_no:values.vehicle_reg_no,
                    driver_name:values.driver_name,
                    driver_mobile_no:values.driver_mobile_no,
                    gps_no:values.gps_no,
                    service_due_date:values.service_due_date,
                    insurance_due_date:values.insurance_due_date,
                    vendor:values.vendor
                });
                toast({title:'Added Successfully!'});
            }
        }
        // Modify vehicle details
        else if(!deepEqual(comparisonObject, values)){
            // Ensuring that service and insurance due dates are not empty when the vehicle owner is a vendor
            if(values.vehicle_owner === 'vendor' && values.service_due_date === '' || values.insurance_due_date === ''){
                if(values.service_due_date === '' && values.insurance_due_date === ''){
                    form.setError('service_due_date', {message:'*Service due date is required'});
                    form.setError('insurance_due_date', {message:'*Insurance due date is required'});
                    return;                    
                }
                if(values.service_due_date === ''){
                    form.setError('service_due_date', {message:'*Service due date is required'});
                    return;
                }else{
                    form.setError('insurance_due_date', {message:'*Insurance due date is required'});
                    return;
                }
            }
            // Modifying
            else{
                await modifyVehicleDetails({
                    id:updateVehicleDetails.id,
                    vehicle_owner:values.vehicle_owner,
                    vehicle_type:values.vehicle_type,
                    vehicle_name:values.vehicle_name,
                    vehicle_reg_no:values.vehicle_reg_no,
                    driver_name:values.driver_name,
                    driver_mobile_no:values.driver_mobile_no,
                    gps_no:values.gps_no,
                    service_due_date:values.service_due_date,
                    insurance_due_date:values.insurance_due_date,
                    vendor:values.vendor
                });
                toast({title:'Updated Successfully!'});
            }
        }
        // Delete vehicle details
        else if(updateVehicleDetails.isDeleteClicked){
            await deleteVehicleDetails({id:updateVehicleDetails.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateVehicleDetails({
            id:'',
            isDeleteClicked:false,
            vehicle_owner:'school',
            vehicle_type:'',
            vehicle_name:'',
            vehicle_reg_no:'',
            driver_name:'',
            driver_mobile_no:'',
            gps_no:'',
            service_due_date:moment(new Date()).format('D-MMM-yy'),
            insurance_due_date:moment(new Date()).format('D-MMM-yy'),
            vendor:''
        });
        // Reseting form
        form.reset({
            vehicle_owner:'school',
            vehicle_type:'',
            vehicle_name:'',
            vehicle_reg_no:'',
            driver_name:'',
            driver_mobile_no:'',
            gps_no:'',
            service_due_date:moment(new Date()).format('D-MMM-yy'),
            insurance_due_date:moment(new Date()).format('D-MMM-yy'),
            vendor:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Vehicle Details</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-2 px-2 sm:px-4'
                >


                    {/* Vehicle Owner */}
                    <FormField
                        control={form.control}
                        name='vehicle_owner'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Owner</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <FormControl>
                                        <RadioGroup
                                            {...field}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className='h-full flex flex-row items-center'
                                        >
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='school' id='school' checked={form.getValues().vehicle_owner === 'school'}/>
                                                <Label htmlFor='school'>School</Label>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <RadioGroupItem value='vendor' id='vendor' checked={form.getValues().vehicle_owner === 'vendor'}/>
                                                <Label htmlFor='vendor'>Vendor</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Vehicle Type */}
                    <FormField
                        control={form.control}
                        name='vehicle_type'
                        render={({field}) => (
                            <FormItem className='w-full'>
                            <div className='w-full h-8 flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center'>
                                <FormLabel className='basis-auto pr-2 text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Type</FormLabel>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
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
                                                {vehiclesTypes.length < 1 ? (
                                                    <p>No wings</p>
                                                ) : vehiclesTypes[0] === '' ? (
                                                    <LoadingIcon />
                                                ) : vehiclesTypes.map((v:any) => (
                                                    <SelectItem value={v} key={v}>{v}</SelectItem>
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

                    {/* Vehicle Name */}
                    <FormField
                        control={form.control}
                        name='vehicle_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Name</FormLabel>
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

                    {/* Vehicle Reg. No. */}
                    <FormField
                        control={form.control}
                        name='vehicle_reg_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Reg. No.</FormLabel>
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

                    {/* Driver Name */}
                    <FormField
                        control={form.control}
                        name='driver_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Driver Name</FormLabel>
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

                    {/* Driver Mobile No. */}
                    <FormField
                        control={form.control}
                        name='driver_mobile_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Driver Mobile No.</FormLabel>
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

                    {/* Service Due Date */}
                    <FormField
                        control={form.control}
                        name='service_due_date'
                        render={({field}) => (
                            <FormItem className={`w-full h-8 flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 ${form.getValues().vehicle_owner === 'vendor' ? 'flex' : 'hidden'}`}>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Service Due Date</FormLabel>
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

                    {/* Insurance Due Date */}
                    <FormField
                        control={form.control}
                        name='insurance_due_date'
                        render={({field}) => (
                            <FormItem className={`w-full h-8 flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 ${form.getValues().vehicle_owner === 'vendor' ? 'flex' : 'hidden'}`}>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Insurance Due Date</FormLabel>
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

                    {/* GPS No. */}
                    <FormField
                        control={form.control}
                        name='gps_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8  flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>GPS No.</FormLabel>
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

                    {/* Vendor */}
                    <FormField
                        control={form.control}
                        name='vendor'
                        render={({field}) => (
                            <FormItem className={`w-full h-8 flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2 ${form.getValues().vehicle_owner === 'vendor' ? 'flex' : 'hidden'}`}>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vendor</FormLabel>
                                <div className='w-full h-full flex flex-col items-start gap-4 sm:basis-[70%]'>
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
                                                    <SelectItem value='Select'>Select</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='text-xs mt-[-20px]'/>
                                </div>
                            </FormItem>
                        )}
                    />



                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} vehiclesDetails={vehiclesDetails} updateVehicleDetails={updateVehicleDetails} setUpdateVehicleDetails={setUpdateVehicleDetails} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;