'use client';
// Imports
import {useState} from 'react';
import Sidebar from './Sidebar';
import PaymentsPdf from './PaymentsPdf';
import LoadingIcon from '@/components/utils/LoadingIcon';





// Main function
const index = () => {


    // Is side bar opened
    const [isOpened, setIsOpened] = useState(true);


    // Is show clicked
    const [isShowClicked, setIsShowClicked] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Pdf data
    const [pdfData, setPdfData] = useState<any>({});


    return (
        <div className='relative flex flex-row h-full overflow-hidden w-full'>

            {/* Sidebar */}
            <Sidebar
                isOpened={isOpened}
                setIsOpened={setIsOpened}
                setIsShowClicked={setIsShowClicked}
                setIsLoading={setIsLoading}
                setPdfData={setPdfData}
                pdfData={pdfData}
            />


            {/* PDF file */}
            <div className={`flex-1 flex justify-center items-center overflow-hidden ${isOpened ? 'ml-[250px]' : 'ml-0'}`}>
                {isLoading ? (
                    <LoadingIcon />
                ) : isShowClicked ? (
                    <div className='w-[90%] h-[95%] overflow-x-scroll'>
                        <PaymentsPdf pdfData={pdfData}/>
                    </div>
                ) : ''}
            </div>

        </div>
    );
};





// Export
export default index;