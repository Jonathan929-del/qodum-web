// Imports
import {Landmark, Banknote} from 'lucide-react';
import {Progress} from "@/components/ui/progress"





// Main function
const page = () => {
    return (
        <section className='flex flex-col w-full h-[100%]'>

            {/* Bank Statements */}
            <div className='flex flex-row justify-between mt-4 px-4 gap-4'>

                {/* Collection */}
                <div className='flex flex-col flex-1 bg-white py-4 px-2'>
                    <div className='flex flex-row justify-center text-xs'>
                        <p className='font-bold'>COLLECTION</p>
                        <span className='ml-2 text-hash-color'>(YTD)</span>
                    </div>
                    <div className='flex flex-row justify-center mt-2 items-center'>
                        <span className='text-hash-color'>Total:</span>
                        <p className='text-xl font-bold ml-2'>₹ 14,56,25,255.23</p>
                    </div>
                    <div className='flex flex-col mt-4 gap-2'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Landmark color='#FFD700'/>
                                <div className='ml-2 flex-1'>
                                    <Progress value={94.32} indicatorColor='bg-[#FFD700]'/>
                                </div>
                            </div>
                            <div className='flex-1 flex justify-end flex-row text-sm'>
                                <p>₹ 14,56,25,255.23</p>
                                <span className='text-hash-color ml-[1px]'>(94.32%)</span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center justify-between'>
                            <div className='flex-1 flex flex-row items-center justify-start'>
                                <Banknote color='#168118'/>
                                <div className='ml-2 flex-1'>
                                    <Progress value={5.68} indicatorColor='bg-[#168118]'/>
                                </div>
                            </div>
                            <div className='flex-1 flex justify-end flex-row text-sm'>
                                <p>₹ 87,32,850</p>
                                <span className='text-hash-color ml-[1px]'>(5.68%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment */}
                <div
                    className='flex-1 bg-white'
                >
                    2
                </div>

                {/* Today's Summary */}
                <div
                    className='flex-1 bg-white'
                >
                    3
                </div>
            </div>

        </section>
    );
};





// Export
export default page;