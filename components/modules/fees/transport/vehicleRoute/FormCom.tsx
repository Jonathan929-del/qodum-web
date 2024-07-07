'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {VehicleRouteValidation} from '@/lib/validations/fees/transport/vehicelRoute.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createVehicleRoute, deleteVehicleRoute, modifyVehicleRoute} from '@/lib/actions/fees/transport/vehicleRoute.actions';





// Main function
const FormCom = ({setIsViewOpened, vehicleRoutes, updateVehicleRoute, setUpdateVehicleRoute}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        route_no:updateVehicleRoute.route_no,
        route_description:updateVehicleRoute.route_description,
        route_in_charge_name:updateVehicleRoute.route_in_charge_name,
        route_in_charge_mobile_no:updateVehicleRoute.route_in_charge_mobile_no
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(VehicleRouteValidation),
        defaultValues:{
            route_no:updateVehicleRoute.id === '' ? '' : updateVehicleRoute.route_no,
            route_description:updateVehicleRoute.id === '' ? '' : updateVehicleRoute.route_description,
            route_in_charge_name:updateVehicleRoute.id === '' ? '' : updateVehicleRoute.route_in_charge_name,
            route_in_charge_mobile_no:updateVehicleRoute.id === '' ? '' : updateVehicleRoute.route_in_charge_mobile_no
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof VehicleRouteValidation>) => {
        // Create vehicle route
        if(updateVehicleRoute.id === ''){
            if(vehicleRoutes.map((vehicleRoute:any) => vehicleRoute.route_no).includes(values.route_no)){
                toast({title:'Route no. already exists', variant:'error'});
                return;
            };
            const res = await createVehicleRoute({
                route_no:values.route_no,
                route_description:values.route_description,
                route_in_charge_name:values.route_in_charge_name,
                route_in_charge_mobile_no:values.route_in_charge_mobile_no
            });
            if(res === 0){
                toast({title:'Please create a session first', variant:'alert'});
                return;
            };
            toast({title:'Added Successfully!'});
        }
        // Modify vehicle route
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.route_no !== values.route_no && vehicleRoutes.map((vehicleRoute:any) => vehicleRoute.route_no).includes(values.route_no)) {
                toast({title:'Route no. already exists', variant:'error'});
                return;
            };
            await modifyVehicleRoute({
                id:updateVehicleRoute.id,
                route_no:values.route_no,
                route_description:values.route_description,
                route_in_charge_name:values.route_in_charge_name,
                route_in_charge_mobile_no:values.route_in_charge_mobile_no
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete vehicle route
        else if(updateVehicleRoute.isDeleteClicked){
            await deleteVehicleRoute({id:updateVehicleRoute.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateVehicleRoute({
            id:'',
            isDeleteClicked:false,
            route_no:'',
            route_description:'',
            route_in_charge_name:'',
            route_in_charge_mobile_no:''
        });
        // Reseting form
        form.reset({
            route_no:'',
            route_description:'',
            route_in_charge_name:'',
            route_in_charge_mobile_no:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Vehicle Route</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-8 px-2 sm:px-4 sm:gap-3'
                >


                    {/* Route No. */}
                    <FormField
                        control={form.control}
                        name='route_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8 mt-6 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Route No.</FormLabel>
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

                    {/* Vehicle Description */}
                    <FormField
                        control={form.control}
                        name='route_description'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Vehicle Description</FormLabel>
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

                    {/* Route Incharge Name */}
                    <FormField
                        control={form.control}
                        name='route_in_charge_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Route Incharge Name</FormLabel>
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

                    {/* Route Incharge Mobile No. */}
                    <FormField
                        control={form.control}
                        name='route_in_charge_mobile_no'
                        render={({field}) => (
                            <FormItem className='w-full h-8 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
                                <FormLabel className='basis-auto text-center text-xs text-[#726E71] sm:basis-[30%]'>Route Incharge Mobile No.</FormLabel>
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
                        <Buttons setIsViewOpened={setIsViewOpened} vehicleRoutes={vehicleRoutes} updateVehicleRoute={updateVehicleRoute} setUpdateVehicleRoute={setUpdateVehicleRoute} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;