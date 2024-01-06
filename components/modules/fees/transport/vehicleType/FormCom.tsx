'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {VehicleTypeValidation} from '@/lib/validations/fees/transport/vehicelType.validation';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createVehicleType, deleteVehicleType, modifyVehicleType} from '@/lib/actions/fees/transport/vehicleType.actions';





// Main function
const FormCom = ({setIsViewOpened, vehicleTypes, updateVehicleType, setUpdateVehicleType}:any) => {


    // Toast
    const {toast} = useToast();


    // Comparison object
    const comparisonObject = {
        vehicle_name:updateVehicleType.vehicle_name
    };
    
    
    // Form
    const form = useForm({
        resolver:zodResolver(VehicleTypeValidation),
        defaultValues:{
            vehicle_name:updateVehicleType.id === '' ? '' : updateVehicleType.vehicle_name
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof VehicleTypeValidation>) => {
        // Create vehicle type
        if(updateVehicleType.id === ''){
            if(vehicleTypes.map((vehicleType:any) => vehicleType.vehicle_name).includes(values.vehicle_name)){
                toast({title:'Vehicle type already exists', variant:'error'});
                return;
            };
            await createVehicleType({
                vehicle_name:values.vehicle_name
            });
            toast({title:'Added Successfully!'});
        }
        // Modify vehicle type
        else if(!deepEqual(comparisonObject, values)){
            if(comparisonObject.vehicle_name !== values.vehicle_name && vehicleTypes.map((vehicleType:any) => vehicleType.vehicle_name).includes(values.vehicle_name)) {
                toast({title:'Vehicle type already exists', variant:'error'});
                return;
            };
            await modifyVehicleType({
                id:updateVehicleType.id,
                vehicle_name:values.vehicle_name
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete vehicle type
        else if(updateVehicleType.isDeleteClicked){
            await deleteVehicleType({id:updateVehicleType.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateVehicleType({
            id:'',
            isDeleteClicked:false,
            vehicle_name:'',
        });
        // Reseting form
        form.reset({
            vehicle_name:''
        });
    };


    return (
        <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Define Vehicle Type</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full flex flex-col items-center gap-2 px-2 sm:px-4'
                >


                    {/* Vehicle Name */}
                    <FormField
                        control={form.control}
                        name='vehicle_name'
                        render={({field}) => (
                            <FormItem className='w-full h-8 mt-6 flex flex-col items-start justify-center sm:flex-row sm:items-center sm:gap-2'>
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


                    {/* Buttons */}
                    <div className='sm:px-10'>
                        <Buttons setIsViewOpened={setIsViewOpened} vehicleTypes={vehicleTypes} updateVehicleType={updateVehicleType} setUpdateVehicleType={setUpdateVehicleType} onSubmit={onSubmit} form={form}/>
                    </div>
                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;