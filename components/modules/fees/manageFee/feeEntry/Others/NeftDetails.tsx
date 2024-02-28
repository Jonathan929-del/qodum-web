// Imports
import Draggable from 'react-draggable';
import {Input} from '@/components/ui/input';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const NeftDetails = ({neftDetails, setNeftDetails}:any) => {
    return (
        <div className='flex flex-col'>
            {/* Neft Name */}
            <FormItem className='w-full'>
                <div className='relative flex flex-col'>
                    <FormLabel className='w-full text-start text-[11px] text-[#726E71]'>Neft Name</FormLabel>
                    <FormControl>
                        <Input
                            value={neftDetails.neft_name}
                            onChange={(e:any) => setNeftDetails({...neftDetails, neft_name:e.target.value})}
                            className='h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                        />
                    </FormControl>
                    <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                </div>
            </FormItem>
        </div>
    );
};





// Export
export default NeftDetails;