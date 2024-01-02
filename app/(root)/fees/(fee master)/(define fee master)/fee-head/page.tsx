'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeHead/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineFeeMaster/feeHead/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Boards
    const [heads, setHeads] = useState([{}]);


    // Update board
    const [updateHead, setUpdateHead] = useState({
        
    });

    
    // Use effect
    useEffect(() => {
        const boardsFetcher = async () => {
            const res = await fetchBoards();
            setBoards(res);
        };
        boardsFetcher();
    }, [isViewOpened, updateBoard]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        boards={boards}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateBoard={setUpdateBoard}
                    />
                ) : (
                    <FormCom
                        boards={boards}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateBoard={updateBoard}
                        setUpdateBoard={setUpdateBoard}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;