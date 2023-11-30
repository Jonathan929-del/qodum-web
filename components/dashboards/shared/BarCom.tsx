'use client';
// Imports
import TabsCom from './TabsCom';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';  
import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';





// Main function
const BarCom = ({barData}:any) => {


    // Registering
    ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


    // Options
    const options = {
        responsive:true,
        plugins:{
            legend:{
                display:false
            },
            datalabels: {
                display:true
            },
        },
        layout: {
            padding:{
                top:30,
                bottom:0,
            }
        },
    };
  

    return (


        <div className='w-full h-full flex flex-row items-center justify-between bg-white rounded-[8px] p-2 lg:px-20'>
            <div className='w-full flex flex-col'>
                <div className={`w-full flex justify-between gap-2 mb-2 ${barData?.tabs?.length > 0 ? 'flex-col lg:flex-row' : 'flex-row'}`}>


                    <div className='flex flex-col items-start'>
                        <div className='flex flex-row items-center justify-center text-sm'>
                            <p className='font-bold'>{barData?.title?.name}</p>
                            <span className='ml-[2px] text-hash-color text-xs'>{barData?.title?.subName}</span>
                        </div>
                        {barData.titleTwo && (
                            <div className='flex flex-row items-center justify-center text-sm'>
                                <p className='ml-[2px] text-hash-color text-xs'>{barData.titleTwo.name}</p>
                                <span className='font-bold'>{barData.titleTwo.subName}</span>
                            </div>
                        )}
                    </div>


                    {barData?.tabs?.length > 0 && (
                        <TabsCom tabs={barData.tabs}/>
                    )}


                    {barData?.select?.length > 0 && (
                        <div className=''>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={barData.select[0].name}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {barData.select.map((choice:any) => (
                                        <SelectItem value={choice.name}>
                                            <div className='flex flex-row items-center gap-4 pr-4'>
                                                <p className='text-sm'>{choice.name}</p>
                                                <p>{choice.amount}</p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                      
                    )}


                    {barData?.categories.length > 0 && (
                        <div className={`grid gap-2 ${barData.categories.length > 2 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {
                                barData.categories.map((category:any) => (
                                    <div className='flex flex-row items-center text-xs ml-2'>
                                        <span className='w-2 h-2' style={{backgroundColor:category.color}}/>
                                        <p className='pl-[2px] text-hash-color'>{category.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )}


                    {barData?.rightText && (
                        <div className='flex items-center'>
                            <div className='flex flex-row items-center justify-center text-sm'>
                                <span className='ml-[2px] text-hash-color text-xs'>{barData.rightText.main}</span>
                                <p className='font-bold'>{barData.rightText.secondary}</p>
                            </div>
                        </div>
                    )}


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