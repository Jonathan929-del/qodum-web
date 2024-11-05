// Imports
import Link from 'next/link';
import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {ArrowRight, Home} from 'lucide-react';
import modules from '@/constants/modulesHome';
import {AuthContext} from '@/context/AuthContext';





// Main functions
const Modules = () => {

    // User
    const {user} = useContext(AuthContext);


    // Permitted modules
    const [permittedModules, setPermittedModules] = useState(['']);


    // Use effect
    useEffect(() => {
        setPermittedModules(user?.permissions?.filter((p:any) => p?.permissions?.filter((pp:any) => pp?.add || pp?.modify || pp?.delete || pp?.print || pp?.read_only).length > 0)?.map((p:any) => p?.name));
    }, [user]);

    return (
        <section className='w-full grid grid-cols-1 grid-rows-3 rounded-[9px] mt-8 px-4 pb-2 gap-2 gap-y-8 lg:grid-cols-3 sm:grid-cols-2'>
            {
                modules.filter((module:any) => permittedModules.includes(module.title)).map((module:any) => (
                    <div className='relative flex flex-col rounded-[4px] p-4 bg-[#FAFAFA]' key={module.title}>

                        <div className='absolute top-[-30px] left-[38%] flex items-center justify-center w-[85px] h-[85px] rounded-full border-4 border-[#ecedf0] bg-white'>
                            <Image
                                src={module.icon}
                                alt='Image'
                                className='w-[60%] h-[60%]'
                            />
                        </div>


                        <div className='flex flex-col gap-[6px] mt-10'>
                            <h4 className='w-full text-center text-xl font-bold'>{module?.title?.toUpperCase()}</h4>
                            {
                                module.sections.map((section:any) => (
                                    <div className='flex flex-row pb-[6px] border-b-[0.5px] border-[#ccc]'>
                                        <ArrowRight className='w-[20px] h-[20px] p-[2px] rounded-full text-white font-thin bg-[#2CABE3]'/>
                                        <p className='text-sm ml-2 text-[#292929]'>{section}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <Link
                            href={`/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`}
                            target='_blank'
                            className='w-full flex items-center justify-center'
                        >
                            <Button
                                className='flex flex-row items-center justify-center gap-2 h-8 text-white group bg-[#2CABE3] border-white border-[0.5px] mt-4 rounded-[4px] transition hover:bg-white hover:border-[#2CABE3] hover:text-[#2CABE3]'
                            >
                                <Home size={14}/>
                                Go to {module.title}
                            </Button>
                        </Link>
                    </div>
                ))
            }
        </section>
    );
};





// Export
export default Modules;