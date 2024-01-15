'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import FormCom from '@/components/modules/fees/feeMaster/assignMultipleGroupToStudent/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/assignMultipleGroupToStudent/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Boards
    const [boards, setBoards] = useState([{}]);


    // Update board
    const [updateBoard, setUpdateBoard] = useState({
        id:'',
        isDeleteClicked:false,
        board:'',
        is_default:false
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
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white'>
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