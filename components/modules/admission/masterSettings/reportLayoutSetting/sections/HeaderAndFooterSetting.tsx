// Imports
import {useEffect} from 'react';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';





// Main function
const HeaderAndFooterSetting = ({form}:any) => {

    // Use effect
    useEffect(() => {}, [form.watch('header_and_footer_setting')]);

    return (
        <div className='w-full flex flex-col border-[0.5px] border-[#EDF1F5] rounded-[5px]'>
            <h2 className='w-full bg-[#EDF1F5] font-[900] text-start text-xs py-2 px-2 rounded-[5px]'>Header and Footer Setting</h2>
            <div className='flex flex-col px-4 py-4 gap-2 lg:flex-row'>

                <div className='flex flex-col items-start gap-1'>
                    {/* Is Header Enable */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_header_enable}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_header_enable', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_header_enable' className='text-[11px] text-hash-color'>
                            Is Header Enable
                        </Label>
                    </div>
                    {/* Is Footer Enable */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_footer_enable}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_footer_enable', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_footer_enable' className='text-[11px] text-hash-color'>
                            Is Footer Enable
                        </Label>
                    </div>
                    {/* Is Logo Enable */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_logo_enable}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_logo_enable', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_logo_enable' className='text-[11px] text-hash-color'>
                            Is Logo Enable
                        </Label>
                    </div>
                    {/* Is Group */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_group}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_group', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_group' className='text-[11px] text-hash-color'>
                            Is Group
                        </Label>
                    </div>
                </div>

                <div className='flex flex-col items-start gap-1'>
                    {/* Is Header Line Enable */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_header_line_enable}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_header_line_enable', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_header_line_enable' className='text-[11px] text-hash-color'>
                            Is Header Line Enable
                        </Label>
                    </div>
                    {/* Is Footer Line Enable */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_footer_line_enable}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_footer_line_enable', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_footer_line_enable' className='text-[11px] text-hash-color'>
                            Is Footer Line Enable
                        </Label>
                    </div>
                    {/* Is Row No. */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_row_no}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_row_no', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_row_no' className='text-[11px] text-hash-color'>
                            Is Row No.
                        </Label>
                    </div>
                    {/* Is Sum */}
                    <div className='flex items-center justify-center space-x-[2px]'>
                        <Checkbox
                            checked={form.getValues().header_and_footer_setting.is_sum}
                            onCheckedChange={(v:any) => form.setValue('header_and_footer_setting.is_sum', v)}
                            className='rounded-[2px] text-hash-color'
                        />
                        <Label htmlFor='is_sum' className='text-[11px] text-hash-color'>
                            Is Sum
                        </Label>
                    </div>
                </div>

            </div>
        </div>
    );
};





// Export
export default HeaderAndFooterSetting;