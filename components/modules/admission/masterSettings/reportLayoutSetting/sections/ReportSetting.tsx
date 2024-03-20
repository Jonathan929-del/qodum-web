// Imports
import {Input} from '@/components/ui/input';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const ReportSetting = ({form}:any) => {
    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Report Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row'>
                {/* Report Name */}
                <FormField
                    control={form.control}
                    name='report_setting.report_name'
                    render={({ field }) => (
                        <FormItem className='w-full lg:mt-2'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Report Name</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                {/* Report Title */}
                <FormField
                    control={form.control}
                    name='report_setting.report_title'
                    render={({ field }) => (
                        <FormItem className='w-full mt-2'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Report Title</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4'>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};





// Export
export default ReportSetting;