// Imports
import {Input} from '@/components/ui/input';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const SwipedCardDetaila = ({swipedCardDetails, setSwipedCardDetails, form}:any) => {
    return (
        <div className='flex flex-col'>
            {/* Reference No. */}
            <FormField
                control={form?.control}
                name='paymode_details.reference_no'
                render={({field}) => (
                    <FormItem className='w-full'>
                        <div className='relative flex flex-row items-center gap-2'>
                            <FormLabel className='basis-[35%] text-end text-[11px] text-[#726E71]'>Reference No.</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='basis-[65%] h-7 flex flex-row items-center text-[11px] pl-2 bg-[#fff] border-[0.5px] border-[#E4E4E4]'
                                />
                            </FormControl>
                            <FormMessage className='absolute w-[120%] top-[100%] left-0 text-[11px]'/>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};





// Export
export default SwipedCardDetaila;