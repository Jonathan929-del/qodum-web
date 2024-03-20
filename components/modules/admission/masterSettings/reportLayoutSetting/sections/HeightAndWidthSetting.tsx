// Imports
import {Input} from '@/components/ui/input';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const HeightAndWidthSetting = ({form}:any) => {
    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Height and Width Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row lg:justify-between'>

                <div className='flex flex-col gap-2'>
                    {/* Page Width */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.page_width'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Width</FormLabel>
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
                    {/* Footer Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.footer_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Footer Height</FormLabel>
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
                    {/* Header Line Width */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.header_line_width'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Header Line Width</FormLabel>
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
                    {/* Column Width */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.column_width'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Column Width (Default)</FormLabel>
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
                    {/* Table Column Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.table_column_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Table Column Height</FormLabel>
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

                <div className='flex flex-col gap-2'>
                    {/* Page Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.page_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Height</FormLabel>
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
                    {/* Header Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.header_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Header Height</FormLabel>
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
                    {/* Logo Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.logo_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Logo Height</FormLabel>
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
                    {/* Footer Line Height */}
                    <FormField
                        control={form.control}
                        name='height_and_width_setting.footer_line_height'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Footer Line Height</FormLabel>
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
        </div>
    );
};





// Export
export default HeightAndWidthSetting;