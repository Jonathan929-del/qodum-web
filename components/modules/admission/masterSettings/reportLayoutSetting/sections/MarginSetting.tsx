// Imports
import {Input} from '@/components/ui/input';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';





// Main function
const MarginSetting = ({form}:any) => {
    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Margin Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row lg:justify-between'>

                <div className='flex flex-col gap-4'>
                    {/* Page Margin Right */}
                    <FormField
                        control={form.control}
                        name='margin_setting.page_margin_right'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Margin Right</FormLabel>
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
                    {/* Page Margin Bottom */}
                    <FormField
                        control={form.control}
                        name='margin_setting.page_margin_bottom'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Margin Bottom</FormLabel>
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
                    {/* logo Margin Left */}
                    <FormField
                        control={form.control}
                        name='margin_setting.logo_margin_left'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>logo Margin Left</FormLabel>
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
                    {/* Table Margin Left */}
                    <FormField
                        control={form.control}
                        name='margin_setting.table_margin_left'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Tabke Margin Left</FormLabel>
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
                    {/* Footer Line Margin Top */}
                    <FormField
                        control={form.control}
                        name='margin_setting.footer_line_margin_top'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Footer Line Margin Top</FormLabel>
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

                <div className='flex flex-col gap-4'>
                    {/* Page Margin Left */}
                    <FormField
                        control={form.control}
                        name='margin_setting.page_margin_left'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Margin Left</FormLabel>
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
                    {/* Page Margin Top */}
                    <FormField
                        control={form.control}
                        name='margin_setting.page_margin_top'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Page Margin Top</FormLabel>
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
                    {/* Logo Margin Top */}
                    <FormField
                        control={form.control}
                        name='margin_setting.logo_margin_top'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Logo Margin Top</FormLabel>
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
                    {/* Table Margin Top */}
                    <FormField
                        control={form.control}
                        name='margin_setting.table_margin_top'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Tabke Margin Top</FormLabel>
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
                    {/* Header Line Margin Top */}
                    <FormField
                        control={form.control}
                        name='margin_setting.header_line_margin_top'
                        render={({ field }) => (
                            <FormItem className='w-full lg:mt-2'>
                                <div className='w-full h-7 flex flex-col items-start justify-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71]'>Header Line Margin Top</FormLabel>
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
export default MarginSetting;