import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function FormCom({form}: any) {
    return (
        <div className='bg-[#f0f0f0] w-full lg:w-[900px] py-2 flex flex-col'>

            <div className="w-full flex gap-2 items-start flex-wrap  py-4 px-5 lg:items-end flex-col lg:flex-row justify-between text-left">


                <div className="w-full lg:w-[49%] flex items-center justify-between lg:justify-start gap-1">
                    <FormLabel className='text-xs w-[95px] text-[#726E71] '>Select Class</FormLabel>
                    <FormField
                        control={form.control}
                        name='class'
                        render={({ field }) => (
                            <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-[130px] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Year' className='text-xs' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='sp'>Special</SelectItem>
                                            <SelectItem value='cl'>Classes</SelectItem>
                                            <SelectItem value='sp2'>Special</SelectItem>
                                            <SelectItem value='sp3'>Special</SelectItem>
                                            <SelectItem value='sp5'>Special</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
               
                <div className="w-full lg:w-[49%] flex items-center justify-between lg:justify-start gap-1">
                    <FormLabel className='text-xs w-[95px] text-[#726E71] '>Current Session</FormLabel>
                    <FormField
                        control={form.control}
                        name='current_session'
                        render={({ field }) => (
                            <FormItem className='max-w-[180px] flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-[130px] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Year' className='text-xs' />
                                            <ChevronDown  className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='sp'>Special</SelectItem>
                                            <SelectItem value='cl'>Classes</SelectItem>
                                            <SelectItem value='sp2'>Special</SelectItem>
                                            <SelectItem value='sp3'>Special</SelectItem>
                                            <SelectItem value='sp5'>Special</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full lg:w-[49%] flex justify-between lg:justify-start gap-1">
                    <FormLabel className='text-xs w-[95px] text-[#726E71] '>Next Session</FormLabel>
                    <FormField
                        control={form.control}
                        name='next_session'
                        render={({ field }) => (
                            <FormItem className='max-w-[180px] w-full flex-1 flex flex-col items-center justify-center  sm:flex-row sm:items-center sm:gap-2 sm:mt-0'>
                                <FormControl>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className='w-[130px] h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder='Year' className='text-xs' />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='sp'>Special</SelectItem>
                                            <SelectItem value='cl'>Classes</SelectItem>
                                            <SelectItem value='sp2'>Special</SelectItem>
                                            <SelectItem value='sp3'>Special</SelectItem>
                                            <SelectItem value='sp5'>Special</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>



            </div>

            <Button
                type='submit'
                className='w-24 mx-auto px-[8px] mt-5 sm:mt-0 h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
            >
                Update
            </Button>

        </div>
    )
}

export default FormCom