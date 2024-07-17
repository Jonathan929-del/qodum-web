'use client';
// Imports
import axios from 'axios';
import {ChevronDown} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main function
const page = () => {

    // Toast
    const {toast} = useToast();


    // Errors
    const [errors, setErrors] = useState({
        classes:'',
        title:'',
        message:''
    });


    // Classes
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);


    // Title
    const [title, setTitle] = useState('');


    // Message
    const [message, setMessage] = useState('');


    // Classes dropdown
    const classesDropdown = (
        <div style={{width:'100%', paddingTop:6, paddingBottom:6}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                <Checkbox
                    className='rounded-[2px] border-hash-color'
                    checked={classes.length === selectedClasses.length}
                    onClick={() => selectedClasses.length === classes.length ? setSelectedClasses([]) : setSelectedClasses(classes)}
                />
                <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Select All</p>
            </div>


            {/* Classes */}
            {classes?.length > 0 && (
                <>
                    {classes?.map((r) => (
                        <div
                            key={r.class_name}
                            style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:classes.indexOf(r) === classes.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                        >
                            <Checkbox
                                className='rounded-[2px] border-hash-color'
                                checked={selectedClasses.map((sr:any) => sr.class_name).includes(r.class_name)}
                                onClick={() => selectedClasses.map((sr:any) => sr.class_name).includes(r.class_name)
                                    ? setSelectedClasses(selectedClasses.filter((sr:any) => sr.class_name !== r.class_name))
                                    : setSelectedClasses([...selectedClasses, r])}
                            />
                            <p style={{fontWeight:'600', fontSize:12}}>{r.class_name}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );


    // Send handler
    const sendHandler = async () => {
        try {

            // Empty validation
            if(selectedClasses.length === 0 || !title || !message){
                setErrors({
                    classes:selectedClasses.length === 0 ? 'Please select at least one recipient' : '',
                    title:!title ? 'Please enter title' : '',
                    message:!message ? 'Please enter message' : ''
                });
                return;
            };

        
            // Sending class notice
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            selectedClasses.map(async c => {
                const params = {
                    title,
                    body:message,
                    topic:c.class_name.replace(/\s+/g, ''),
                    type:'class_notice',
                    created_by:'admin',
                    class_notice_id:randomNumber
                };
                const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/send-class-notice`;
                await axios.post(notificationLink, params);
            });


            // Reseting
            toast({title:'Sent Successfully!'});
            setSelectedClasses([]);
            setTitle('');
            setMessage('');

         
        }catch (err){
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

            // Classes
            const classesRes = await fetchClasses();
            setClasses(classesRes);

        };
        fetcher();
    }, []);
    useEffect(() => {
        if(classes.length > 0){
            setErrors({...errors, classes:''});
        };
    }, [selectedClasses]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
                <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Send Class Notice</h2>     
                <div className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4 gap-2'>

                    {/* Classes */}
                    <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-2'>
                        <Select>
                            <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Class</p>
                            <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                <SelectValue
                                    placeholder={selectedClasses.length === 0 ? 'Select Classes' :selectedClasses.length === 1 ? '1 Selected Class' : `${selectedClasses.length} Classes Selected`}
                                    className='text-xs'
                                />
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                {classesDropdown}
                            </SelectContent>
                        </Select>
                        {errors.classes && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.classes}</p>}
                    </div>


                    {/* Title */}
                    <div className='relative w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                        <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Title</p>
                        <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Input
                                value={title}
                                onChange={(v:any) => {setErrors({...errors, title:''});setTitle(v.target.value)}}
                                className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </div>
                        {errors.title && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.title}</p>}
                    </div>


                    {/* Message */}
                    <div className='relative w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                        <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Message</p>
                        <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Input
                                value={message}
                                onChange={(v:any) => {setErrors({...errors, message:''});setMessage(v.target.value)}}
                                className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </div>
                        {errors.message && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.message}</p>}
                    </div>


                    {/* Send button */}
                    <div className='flex flex-row items-center justify-center pb-4 mt-10 gap-2 ml-0'>
                        <div
                            onClick={sendHandler}
                            className='flex justify-center items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                        >
                            Send
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};





// Export
export default page;