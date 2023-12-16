// Imports
import {useEffect, useState} from 'react';
import {Input} from '../../ui/input';
import {UserButton} from '@clerk/nextjs';
import DropdownMenuCom from '../../utils/DropdownMenuCom';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {Scan, Grid3X3, Search, Globe, CalendarDays, Flag, Bell, ArrowLeft, Check, Shrink} from 'lucide-react';
  




// Main function
const Topbar = ({isSidebarOpened, setIsSidebarOpened, settingActiveAcademicYear, academicYears, activeAcademicYearName}:any) => {


    // Full screen page handler
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fullScreenHandler = (state:any) => {
        if(state === 'open'){
            document.body.requestFullscreen();
            setIsFullscreen(true);
        }else{
            document.exitFullscreen()
            setIsFullscreen(false);
        }
    };


    // Use effect
    useEffect(() => {
        function onFullscreenChange() {
          setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);


    return (
        <nav className='flex flex-col items-center justify-between bg-white w-full border-b-[0.5px] border-[#ccc] px-4 py-2 lg:flex-row'>


            <div
                className='hidden flex-row justify-between items-center gap-3 border-[#ccc] lg:w-auto lg:border-b-0 lg:flex'
            >
                <div className='flex flex-row justify-between gap-3'>
                    <div
                        className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    >
                        <ArrowLeft
                            size={18}
                            className={`text-hash-color ${!isSidebarOpened && 'rotate-180 transition'}`}
                        />
                    </div>
                    <DropdownMenuCom />
                    <div
                        onClick={() => fullScreenHandler(isFullscreen ? 'close' : 'open')}
                        className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'
                    >
                        {isFullscreen ? (
                            <Shrink
                                size={18}
                                className='text-hash-color'
                            />
                        ) : (
                            <Scan
                                size={18}
                                className='text-hash-color'
                            />
                        )}
                    </div>
                    <div className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'>
                        <Grid3X3
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>
                <div
                    className='relative hidden lg:block'
                >
                    <Input
                        placeholder='Search'
                        className='rounded-[5px] border-[#ccc] text-xs text-hash-color w-[250px]'
                    />
                    <Search
                        size={20}
                        className='absolute right-2 top-[25%] text-white cursor-pointer'
                    />
                </div>
            </div>


            <div
                className='flex flex-row w-full justify-between items-center gap-4 mt-2 lg:gap-10 lg:w-auto lg:mt-0'
            >
                <div className='flex flex-row items-center gap-2'>
                    <div
                        className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:hidden'
                        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    >
                        <ArrowLeft
                            size={18}
                            className={`text-hash-color ${!isSidebarOpened && 'rotate-180 transition'}`}
                        />
                    </div>
                    <div className='block lg:hidden'>
                        <DropdownMenuCom />
                    </div>
                </div>
                <div className='flex flex-row justify-between gap-3'>
                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Globe
                            size={18}
                            className='text-hash-color'
                        />
                    </div>


                    {/* Selecting active academic session */}
                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Select
                            onValueChange={v => settingActiveAcademicYear(v)}
                        >
                            <SelectTrigger>
                                <CalendarDays
                                    size={18}
                                    className='text-hash-color'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {academicYears.map((year:any) => (
                                    <SelectItem
                                        value={year.year_name}
                                        key={year._id}
                                    >
                                        <div className='flex flex-row items-center'>
                                            {activeAcademicYearName === year.year_name && <Check size={12} className='mr-[2px]'/>}
                                            {year.year_name}
                                        </div>
                                    </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Flag
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Bell
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>
                <UserButton
                    appearance={{
                        elements:{
                            avatarBox:'rounded-[8px] w-[35px] h-[35px]'
                        }
                    }}
                />
            </div>


        </nav>
    );
};





// Export
export default Topbar;