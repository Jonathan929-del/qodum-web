'use client';
// Imports
import Link from 'next/link';
import Image from 'next/image';
import FessImage from '@/public/assets/Modules Icons/Menu icons/Fees.png';
import PayrollImage from '@/public/assets/Modules Icons/Menu icons/Payroll.png';
import AccountsImage from '@/public/assets/Modules Icons/Menu icons/Accounts.png';
import AdmissionImage from '@/public/assets/Modules Icons/Menu icons/Admission.png';





// Main function
const page = () => {


    // Boxes
    const boxes = [
        {name:'Account Manager', image:AccountsImage},
        {name:'Fee Manager', image:FessImage},
        {name:'Payroll Manager', image:PayrollImage},
        {name:'Admission Manager', image:AdmissionImage}
    ];


    return (
        <div className='h-full flex flex-row flex-wrap items-start justify-center pt-10 gap-6 bg-white'>
                
            {/* Boxes */}
            {boxes.map((b:any) => (
                <Link
                    href={`/fees/session-transfer/${(b.name + ' Session transfer').toLowerCase().replace(/\s+/g, '-')}`}
                    className='w-[185px] h-[185px] flex flex-col items-center justify-center gap-2 rounded-[8px] border-[0.5px] border-[#ccc] transition hover:scale-105'
                >
                    <Image
                        alt={b.name}
                        src={b.image}
                        width={50}
                        height={50}
                    />
                    <p>{b.name}</p>
                </Link>
            ))}

        </div>
    );
};





// Export
export default page;