// Imports
import {ChevronDown} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const PageOrientationAndLayoutSetting = ({form}:any) => {
    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Page Orientation and Layout Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row'>
                {/* Page Orientation */}
                <div className='w-full flex flex-col items-center'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71]'>Page Orientation</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                        <FormField
                            control={form.control}
                            name='page_orientation_and_layout_setting.page_orientation'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Portrait'>Portrait</SelectItem>
                                                <SelectItem value='Landscape'>Landscape</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Page Layout */}
                <div className='w-full flex flex-col items-center'>
                    <FormLabel className='w-full h-2 text-[11px] text-start pr-[4px] text-[#726E71]'>Page Layout</FormLabel>
                    <div className='relative w-full h-full flex flex-row items-center justify-between gap-2'>
                        <FormField
                            control={form.control}
                            name='page_orientation_and_layout_setting.page_layout'
                            render={({ field }) => (
                                <FormItem className='flex-1 flex flex-col items-start justify-center mt-2'>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field?.value}
                                            onValueChange={field?.onChange}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='A4'>A4</SelectItem>
                                                <SelectItem value='A3'>A3</SelectItem>
                                                <SelectItem value='Legal'>Legal</SelectItem>
                                                <SelectItem value='Custom'>Custom</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className='absolute left-0 top-[60%] text-[11px]'/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};





// Export
export default PageOrientationAndLayoutSetting;