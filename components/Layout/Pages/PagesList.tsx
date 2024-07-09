// Imports
import {X} from 'lucide-react';
import {useContext, useState} from 'react';
// import {GlobalStateContext} from '@/context/GlobalStateContext';





// Main Function
const PagesList = () => {

    // Opened pages
    // const {openedPages, setOpenedPages, currentPage, setCurrentPage} = useContext(GlobalStateContext);
    const [openedPages, setOpenedPages] = useState([]);
    const [currentPage, setCurrentPage] = useState('');

    // Removing an item from the opened pages
    const removeFromList = (page:any) => {
        if(currentPage === page){
            setCurrentPage(openedPages[0]);
        };
        const filteredPages = openedPages.filter((item:any) => item !== page);
        setOpenedPages(filteredPages);
    };

    return (
        <div className='relative pt-14 bg-white border-b-[0.5px] border-[#ccc]'>
            <ul className='flex flex-row bottom-0 left-0 items-center absolute z-2 px-6 gap-2'>
                {openedPages?.map((page:any) => (
                    <li
                        className={`group flex flex-row items-center px-2 py-[2px] rounded-t-[4px] ${page === currentPage ? 'text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE]' : 'text-black cursor-pointer bg-[#E8E8E8]'}`}
                    >
                        <div
                            className='cursor-pointer'
                            onClick={() => setCurrentPage(page)}
                        >
                            <p className={`text-xs ${page === currentPage ? 'font-semibold' : 'group-hover:text-[#0B0080]'}`}>{page}</p>
                        </div>
                        <X
                            onClick={() => removeFromList(page)}
                            size={16}
                            className={`h-4 w-4 ml-2 rounded-[2px] cursor-pointer transition ${page === currentPage ? 'text-white hover:bg-[#3D67B0]' : 'hover:text-[#40a0e1]'}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};





// Export
export default PagesList;