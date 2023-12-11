// Imports
import Link from 'next/link';
import {X} from 'lucide-react';
import {useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';





// Main Function
const PagesList = ({openedPages, selectedPage, setOpenedPages, setSelectedPage}:any) => {


    // Router
    const router = useRouter();
    const pathname = usePathname();


    // Removing an item from the opened pages
    const removeFromList = (page:any) => {
        if(selectedPage === page){
            setSelectedPage(openedPages[0]);
            const link = `/${pathname.split('/')[1]}/${openedPages[0].toLowerCase().replace(/\s+/g,'-')}`;
            router.replace(link);
        };
        const filteredPages = openedPages.filter((item:any) => item !== page);
        setOpenedPages(filteredPages);
    };
    
    
    // Redirection to main page
    const redirectToHome = () => {
        // const link = `/${pathname.split('/')[1]}`;
        // router.replace(link);
    };


    // Use effect
    useEffect(() => {
        window.onload = () => redirectToHome();
        openedPages.length < 1 && redirectToHome();
        return () => {
            window.onload = null;
        };
    }, [window.onload]);


    return (
        <div className='relative pt-10 bg-white border-b-[0.5px] border-[#ccc]'>
            <ul className='flex flex-row bottom-0 left-0 items-center absolute z-2 px-6 gap-2'>
                {openedPages?.map((page:any) => (
                    <li
                        className={`group flex flex-row items-center px-2 py-[2px] rounded-t-[4px] ${page === selectedPage ? 'text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE]' : 'text-black cursor-pointer bg-[#E8E8E8]'}`}
                    >
                        <Link
                            onClick={() => setSelectedPage(page)}
                            href={`${page.toLowerCase().replace(/\s+/g,'-')}`}
                        >
                            <p className={`text-xs ${page === selectedPage ? 'font-semibold' : 'group-hover:text-[#0B0080]'}`}>{page}</p>
                        </Link>
                        <X
                            onClick={() => removeFromList(page)}
                            size={16}
                            className={`h-4 w-4 ml-2 rounded-[2px] cursor-pointer transition ${page === selectedPage ? 'text-white hover:bg-[#3D67B0]' : 'hover:text-[#40a0e1]'}`}
                        />
                        {/* <X
                            onClick={() => removeFromList(page)}
                            size={16}
                            className={`h-4 w-4 ml-2 rounded-[2px] cursor-pointer transition ${page === selectedPage ? 'text-[#75BEF0] hover:bg-[#ccc]' : 'text-[#75B9E7] hover:text-[#40a0e1]'}`}
                        /> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};





// Export
export default PagesList;