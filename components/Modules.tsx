// Imports
import React from 'react';
import {Check} from 'lucide-react';
import modules from '@/constants/modulesHome';
import { Button } from './ui/button';





// Main functions
const Modules = () => {
    return (
        <section className='grid grid-cols-1 grid-rows-3 rounded-[9px] mt-6 gap-6 lg:grid-cols-3 sm:grid-cols-2'>
            {
                modules.map((module:any) => (
                    <div className=' flex flex-col px-2 bg-white rounded-xl border-b-4 border-[#195382] pl-4 pb-4 pt-4' key={module.title}>

                        <div className='flex flex-row items-center pt-2'>
                            <div className='rounded-[5px] bg-[#e7f0f7] text-[#195382] flex justify-center items-center w-10 h-10'>
                                {React.createElement(module.icon)}
                            </div>
                            <div className='ml-4'>
                                <h4 className='text-xl font-semibold'>{module.title}</h4>
                                <p className='text-hash-color text-xs'>{module.numberOfSections} sections</p>
                            </div>
                        </div>

                        <div className='flex flex-col mt-4'>
                            {
                                module.sections.map((section:any) => (
                                    <div className='flex flex-row'>
                                        <Check color='#195382'/>
                                        <p className='text-sm ml-2'>{section}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <Button
                            className='main-button w-[100%] mt-4'
                        >
                            Go to {module.title}
                        </Button>

                    </div>
                ))
            }
        </section>
    );
};





// Export
export default Modules;