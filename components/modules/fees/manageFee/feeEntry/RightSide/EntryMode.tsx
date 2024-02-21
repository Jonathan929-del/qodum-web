// Imports
import {Label} from '@/components/ui/label';
import {FormControl, FormLabel} from '@/components/ui/form';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';





// Main function
const EntryMode = ({form}:any) => {
    return (
        <div className='flex flex-col gap-2 p-2 rounded-[5px] border-[0.5px] border-[#ccc] lg:flex-row lg:justify-between'>
            {/* Entry Mode */}
            <div className='h-full flex flex-row items-center gap-2'>
                <FormLabel className='w-full text-start text-sm text-[#726E71]'>Entry Mode: </FormLabel>
                <FormControl>
                    <RadioGroup className='h-full flex flex-row items-center'>
                        <div className='flex flex-row items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='School'
                                id='School'
                                onClick={() => form.setValue('entry_mode', 'School')}
                                checked={form.getValues().entry_mode === 'School'}
                            />
                            <Label htmlFor='School' className='text-xs text-hash-color'>School</Label>
                        </div>
                        <div className='flex flex-row items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='Bank'
                                id='Bank'
                                onClick={() => form.setValue('entry_mode', 'Bank')}
                                checked={form.getValues().entry_mode === 'Bank'}
                            />
                            <Label htmlFor='Bank' className='text-xs text-hash-color'>Bank</Label>
                        </div>
                        <div className='flex flex-row items-center space-x-[2px]'>
                            <RadioGroupItem
                                value='Online'
                                id='Online'
                                onClick={() => form.setValue('entry_mode', 'Online')}
                                checked={form.getValues().entry_mode === 'Online'}
                            />
                            <Label htmlFor='Online' className='text-xs text-hash-color'>Online</Label>
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            {/* Buttons */}
            <div className='flex flex-row gap-2'>
                {/* Show Button */}
                <span
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Show
                </span>
                {/* Show Installment Button */}
                <span
                    className='flex items-center justify-center px-3 h-6 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    Show Installment
                </span>
            </div>
        </div>
    );
};





// Export
export default EntryMode;