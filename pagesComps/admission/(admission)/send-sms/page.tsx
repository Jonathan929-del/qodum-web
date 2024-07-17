'use client';
// Imports
import Image from 'next/image';
import {useContext} from 'react';
import NoticeImage from '@/public/assets/Notice.png';
import ClassNoticeImage from '@/public/assets/ClassNotice.png';
import {GlobalStateContext} from '@/context/GlobalStateContext';





// Main function
const page = () => {

    // Opened pages
    const {openedPages, setOpenedPages, setCurrentPage} = useContext(GlobalStateContext);


    // Boxes
    const boxes = [
        {name:'Notice', image:NoticeImage},
        {name:'Class Notice', image:ClassNoticeImage},
    ];

    return (
        <div className='h-full flex flex-row flex-wrap items-start justify-center pt-10 gap-6 bg-[#fff]'>
                
            {/* Boxes */}
            {boxes.map((b:any) => (
                <div
                    onClick={() => {
                        setCurrentPage(b.name);
                        if(openedPages.includes(b.name)){
                            return;
                        } else {
                            const uniquePagesNames = openedPages.filter((item:any, index:any) => openedPages.indexOf(item) === index);
                            setOpenedPages([...uniquePagesNames, b.name]);
                        };
                    }}
                    className='w-[200px] h-[200px] flex flex-col items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#ccc] transition cursor-pointer hover:scale-105'
                >
                    <Image
                        alt={b.name}
                        src={b.image}
                        width={100}
                        height={100}
                    />
                    <p>{b.name}</p>
                </div>
            ))}

        </div>
    );
};





// Export
export default page;