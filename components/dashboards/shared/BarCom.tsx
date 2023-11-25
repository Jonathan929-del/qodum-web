'use client';
// Imports
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const BarCom = ({barData}:any) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


    // Options
    const options = {
        responsive:true,
        plugins:{
            legend:{
                display:false
            }
        },
        elements:{
            line:{
                tension:0.4
            }
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };
  

    return (
        <div className='w-full h-full flex flex-row items-center justify-between bg-white rounded-[8px] p-2 lg:px-20'>
            <div className='w-full flex flex-col'>
                <div className='w-full flex flex-row items-center justify-between mb-2'>
                    <div className='flex flex-row items-center justify-center text-sm'>
                        <p className='font-bold'>{barData?.title?.name}</p>
                        <span className='ml-[2px] text-hash-color text-xs'>{barData?.title?.subName}</span>
                    </div>
                    <div className='flex flex-row ml-8'>
                        {
                            barData?.categories.map((category:any) => (
                                <div className='flex flex-row items-center text-xs ml-2'>
                                    <span className={`w-2 h-2 bg-[${category.color}]`}/>
                                    <p className='pl-[2px] text-hash-color'>{category.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Bar
                    data={barData?.data}
                    options={options}
                />
            </div>
        </div>
    );
};





// Export
export default BarCom;