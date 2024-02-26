// Imports
import Draggable from 'react-draggable';
import {Input} from '@/components/ui/input';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const NeftDetails = ({neftDetails, setNeftDetails}:any) => {
    return (
        <Draggable>
            <div className='absolute z-10 flex flex-col w-[300px] bg-white border-[0.5px] border-[#ccc] '>


                {/* Header */}
                <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7]'>
                    <h2>Neft Details</h2>
                </div>


                {/* Values */}
                <div className='flex flex-col p-2 gap-1'>
                    {/* Neft Name */}
                    <FormItem className='w-full'>
                        <div className='relative flex flex-col'>
                            <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Neft Name</FormLabel>
                            <FormControl>
                                <Input
                                    value={neftDetails.neft_name}
                                    onChange={(e:any) => setNeftDetails({...neftDetails, neft_name:e.target.value})}
                                    className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                />
                            </FormControl>
                            <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                        </div>
                    </FormItem>
                </div>



            </div>
        </Draggable>
    );
};





// Export
export default NeftDetails;