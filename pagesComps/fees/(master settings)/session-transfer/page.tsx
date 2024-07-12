'use client';
// Imports
import Image from 'next/image';
import {useContext} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';
import FessImage from '@/public/assets/Modules Icons/Menu icons/Fees.png';
import PayrollImage from '@/public/assets/Modules Icons/Menu icons/Payroll.png';
import AccountsImage from '@/public/assets/Modules Icons/Menu icons/Accounts.png';
import AdmissionImage from '@/public/assets/Modules Icons/Menu icons/Admission.png';





// Main function
const page = () => {

    // Opened pages
    const {openedPages, setOpenedPages, setCurrentPage} = useContext(GlobalStateContext);


    // Boxes
    const boxes = [
        {name:'Account Manager', image:AccountsImage},
        {name:'Fee Manager', image:FessImage},
        {name:'Payroll Manager', image:PayrollImage},
        {name:'Admission Manager', image:AdmissionImage}
    ];

    return (
        <div className='h-full flex flex-row flex-wrap items-start justify-center pt-10 gap-6 bg-[#fff]'>
                
            {/* Boxes */}
            {boxes.map((b:any) => (
                <div
                    onClick={() => {
                        setCurrentPage(`${b.name.split(' ')[0]} Manager Session Transfer`);
                        setOpenedPages([...openedPages, `${b.name.split(' ')[0]} Manager Session Transfer`])
                    }}
                    className='w-[200px] h-[200px] flex flex-col items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#ccc] transition cursor-pointer hover:scale-105'
                >
                    <Image
                        alt={b.name}
                        src={b.image}
                        width={50}
                        height={50}
                    />
                    <p>{b.name}</p>
                </div>
            ))}

        </div>
    );
};





// Export
export default page;