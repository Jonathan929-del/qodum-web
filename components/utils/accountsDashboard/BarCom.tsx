'use client';
// Imports
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const BarCom = () => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


    // Data
    const data = {
        labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data:[2, 6, 3, 4, 5, 1, 5, 4, 1, 3, 4, 2],
                borderWidth:2,
                backgroundColor:'#ccc'
            },
            {
                data:[4, 6, 4, 3, 1, 1, 5, 2, 4, 6, 5, 3],
                borderWidth:2,
                backgroundColor:'#FF9494',
            }
        ]
    };

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
                beginAtZero: true
            }
        }
    };
  


    return (
        <div className='w-full flex flex-col bg-white rounded-[8px] p-2 lg:py-10 lg:px-20'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>Fund Flow</p>
                    <span className='ml-[2px] text-hash-color text-xs'>(YTD)</span>
                </div>
                <div className='flex flex-row ml-8'>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#ccc]'/>
                        <p className='pl-[2px]'>Debit</p>
                    </div>
                    <div className='flex flex-row items-center ml-2 text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#FF9494]'/>
                        <p className='pl-[2px]'>Credit</p>
                    </div>
                </div>
            </div>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
};





// Export
export default BarCom;