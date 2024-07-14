'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Board from '@/lib/models/fees/globalMasters/defineSchool/Board.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create board Props
interface CreateBoardProps{
    board:String,
    is_default:Boolean,
};
// Create board
export const createBoard = async ({board, is_default}:CreateBoardProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the board already exists
        const existinBoard = await Board.findOne({board});
        if(existinBoard){
            throw new Error('Board already exists');
        };


        // Creating new board
        const newBoard = await Board.create({session:activeSession.year_name, board, is_default});


        // Checking if the board is default and setting all the other records to false if so
        if(is_default === true){
            newBoard.save();
            await Board.updateMany({'_id': {$ne:newBoard._id}}, {is_default:false});
        }else{
            newBoard.save();
        };


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error creating board: ${err.message}`);
    };
};





// Fetch boards
export const fetchBoards = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const boards = await Board.find({session:activeSession.year_name});
        return boards;

    } catch (err:any) {
        throw new Error(`Error fetching boards: ${err}`);
    };
};




// Modify board Props
interface ModifyBoardProps{
    id:String;
    board:String,
    is_default:Boolean,
}
// Modify board
export const modifyBoard = async ({id, board, is_default}:ModifyBoardProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the board already exists
        const boards = await Board.find();
        const existingBoard = await Board.findById(id);
        if(existingBoard.board !== board && boards.map(board => board.board).includes(board)){throw new Error('Board already exists')};


        if(is_default === true){
            // Update Board
            await Board.findByIdAndUpdate(id, {board, is_default},{new:true}).then(async () => {
                try {
                    await Board.updateMany({'_id': {$ne:id}}, {is_default:false});
                } catch (err:any) {
                    console.log(`Error updating other boards: ${err.message}`);
                }
            });;
            return 'Updated';
        }else{
            // Update board with setting other board is defailt to false
            await Board.findByIdAndUpdate(id, {board, is_default}, {new:true});
            return 'Updated';
        };

    } catch (err) {
        throw new Error(`Error updating board: ${err}`);
    };
};




// Delete board
export const deleteBoard = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting board
        await Board.findByIdAndDelete(id);
        return 'Board Deleted';

    } catch (err) {
        throw new Error(`Error deleting board: ${err}`);      
    };
};