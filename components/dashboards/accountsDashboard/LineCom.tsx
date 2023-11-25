'use client';
// Imports
import {Line} from 'react-chartjs-2';
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const LineCom = () => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


    // Data
    const data = {
        labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label:'Income',
                data:[2, 6, 3, 4, 5, 1, 5, 4, 1, 3, 4, 2],
                borderWidth:2,
                borderColor:'#4BB543',
                backgroundColor:'#4BB543'
            },
            {
                label:'Expenditure',
                data:[4, 6, 4, 3, 1, 1, 5, 2, 4, 6, 5, 3],
                borderWidth:2,
                borderColor:'#FF9494',
                backgroundColor:'#FF9494',
            }
        ]
    };

      const options = {
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
        <div className='w-full flex flex-col justify-center bg-white rounded-[8px] p-2 lg:w-[calc(100%-400px)]'>
            <div className='w-full flex flex-row items-center justify-between mb-2'>
                <div className='flex flex-row items-center justify-center text-sm'>
                    <p className='font-bold'>Income and Expenditure</p>
                    <span className='ml-[2px] text-hash-color text-xs'>(YTD)</span>
                </div>
                <div className='flex flex-row ml-8'>
                    <div className='flex flex-row items-center text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#4BB543]'/>
                        <p className='pl-[2px]'>Income</p>
                    </div>
                    <div className='flex flex-row items-center ml-2 text-hash-color text-xs'>
                        <span className='w-2 h-2 bg-[#FF9494]'/>
                        <p className='pl-[2px]'>Expenditure</p>
                    </div>
                </div>
            </div>
            <Line
                data={data}
                options={options}
            />
        </div>
    );
};





// Export
export default LineCom;