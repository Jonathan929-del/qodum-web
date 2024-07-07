'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Stream from '@/lib/models/admission/globalMasters/Stream.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create stream props
interface CreateStreamProps{
    stream_name:String;
};
// Create stream
export const createStream = async ({stream_name}:CreateStreamProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the stream already exists
        const existinStream = await Stream.findOne({stream_name});
        if(existinStream){
            throw new Error('Stream already exists');
        };


        // Creating new stream
        const newStream = await Stream.create({session:activeSession.year_name, stream_name});
        newStream.save();


        // Return
        return newStream;

        
    } catch (err:any) {
        console.log(`Error creating stream: ${err.message}`);
    };
};





// Fetch streams
export const fetchStreams = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching
        const streams = await Stream.find();
        return streams;

    } catch (err:any) {
        throw new Error(`Error fetching streams: ${err}`);
    };
};




// Modify stream props
interface ModifyStreamProps{
    id:String;
    stream_name:String;
}
// Modify stream
export const modifyStream = async ({id, stream_name}:ModifyStreamProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the stream already exists
        const streams = await Stream.find();
        const existingStream = await Stream.findById(id);
        if(existingStream.stream_name !== stream_name && streams.map(s => s.stream_name).includes(stream_name)){throw new Error('Stream already exists')};


        // Updating stream
        const updatedStream = await Stream.findByIdAndUpdate(id, {stream_name}, {new:true});


        // Return
        return updatedStream;

    } catch (err) {
        throw new Error(`Error updating stream: ${err}`);
    };
};




// Delete stream
export const deleteStream = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting stream
        await Stream.findByIdAndDelete(id);
        return 'Stream deleted';

    } catch (err) {
        throw new Error(`Error deleting stream: ${err}`);      
    };
};