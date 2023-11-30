// Imports
import {X} from 'lucide-react';





// Main Function
const PagesList = ({openedPages, selectedPage, setOpenedPages, setSelectedPage}:any) => {


    // Removing an item from the opened pages
    const removeFromList = (page:any) => {
        const filteredPages = openedPages.filter((item:any) => item !== page);
        setOpenedPages(filteredPages);
        setSelectedPage(openedPages[0]);
    };

    return (
        <div className='h-[33px] relative bg-white border-b-[0.5px] border-[#ccc]'>
            <ul className='flex flex-row items-center absolute z-2 px-6 gap-2'>


                {openedPages.map((page:any) => (
                    <li
                        onClick={() => setSelectedPage(page)}
                        className={`group flex flex-row items-center px-2 py-2 rounded-[4px] border-[0.5px] text-hash-color ${page === selectedPage ? 'bg-white border-[#ccc] border-b-white' : 'cursor-pointer bg-[#E8E8E8] border-[#E8E8E8] border-b-[#E8E8E8]'}`}
                    >
                        <p className={`text-xs ${page === selectedPage ? 'font-semibold' : 'group-hover:text-[#0B0080]'}`}>{page}</p>
                        <X
                            onClick={() => removeFromList(page)}
                            size={16}
                            className={`h-4 w-4 ml-2 rounded-[2px] cursor-pointer transition ${page === selectedPage ? 'text-[#75BEF0] hover:bg-[#ccc]' : 'text-[#75B9E7] hover:text-[#40a0e1]'}`}
                        />
                    </li>
                ))}


                {/* <li className='group flex flex-row items-center px-2 py-2 rounded-[4px] cursor-pointer text-hash-color bg-[#E8E8E8] border-[0.5px] border-[#E8E8E8] border-b-[#E8E8E8]'>
                    <p className='text-xs group-hover:text-[#0B0080]'>Define Academic Year</p>
                    <X size={16} className='h-4 w-4 ml-2 rounded-[2px] cursor-pointer transition text-[#75B9E7] hover:text-[#40a0e1]'/>
                </li> */}


            </ul>
        </div>
    );
};





// Export
export default PagesList;