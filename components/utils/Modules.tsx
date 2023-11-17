// Imports
import React from 'react';
import {Check} from 'lucide-react';
import modules from '@/constants/modulesHome';
import { Button } from '../ui/button';
import Link from 'next/link';





// Main functions
const Modules = () => {
    return (
        <section className='grid grid-cols-1 grid-rows-3 rounded-[9px] mt-6 px-4 pb-2 gap-6 lg:grid-cols-3 sm:grid-cols-2'>
            {
                modules.map((module:any) => (
                    // <div className=' flex flex-col px-2 bg-[#FAFAFA] rounded-xl border-b-4 border-t-4 border-l-4 border-main-color pl-4 pb-4 pt-4' key={module.title}>

                    //     <div className='flex flex-row items-center pt-2'>
                    //         <div className='rounded-[5px] bg-white text-hash-color flex justify-center items-center w-10 h-10'>
                    //             {React.createElement(module.icon)}
                    //         </div>
                    //         <div className='ml-4'>
                    //             <h4 className='text-xl font-semibold'>{module.title}</h4>
                    //             <p className='text-hash-color text-xs'>{module.numberOfSections} sections</p>
                    //         </div>
                    //     </div>

                    //     <div className='flex flex-col mt-4'>
                    //         {
                    //             module.sections.map((section:any) => (
                    //                 <div className='flex flex-row'>
                    //                     <Check className='text-hash-color'/>
                    //                     <p className='text-sm ml-2'>{section}</p>
                    //                 </div>
                    //             ))
                    //         }
                    //     </div>

                    //     <Link
                    //         href={`/${module.title.toLowerCase()}`}
                    //     >
                    //         <Button
                    //             className='group bg-[#E6E6E6] w-[100%] mt-4 rounded-[8px] hover:bg-main-color'
                    //         >
                    //             <p
                    //                 className='text-hash-color group-hover:text-white transition'
                    //             >
                    //                 Go to {module.title}
                    //             </p>
                    //         </Button>
                    //     </Link>

                    // </div>



                    <Link
                        href={`/${module.title.toLowerCase()}`}
                    >
                        <div className='flex flex-col items-center justify-center h-32 bg-[#FAFAFA] rounded-xl border-2 border-main-color' key={module.title}>
                            <div className='text-hash-color'>
                                {React.createElement(module.icon)}
                            </div>
                            <h4 className='text-xl font-semibold'>{module.title}</h4>
                        </div>
                    </Link>
                ))
            }
        </section>
    );
};





// Export
export default Modules;