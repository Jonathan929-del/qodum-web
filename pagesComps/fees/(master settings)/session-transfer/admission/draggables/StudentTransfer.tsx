// Imports
import Draggable from 'react-draggable';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import {AlertDialogAction} from '@radix-ui/react-alert-dialog';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchAdmittedStudents, studentsSesssionTransfer} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';





// Main function
const StudentTransfer = ({currentSession, nextSession, showDraggables, setShowDraggables, state, setState}:any) => {

    // Toast
    const {toast} = useToast();


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Selected classes
    const [selectedClasses, setSelectedClasses] = useState([{}]);


    // Transer handler
    const transerHandler = async () => {
        try {
            await studentsSesssionTransfer({next_session:nextSession, classes:selectedClasses});
            setState({...state, isTransfered:true});
            setShowDraggables(showDraggables.filter((d:any) => d !== 'Student Transfer'));
            toast({title:'Process completed successfully'});
        }catch (err){
            console.log(err);   
        }
    };


    // Skip handler
    const skipHandler = () => {
        setShowDraggables(showDraggables.filter((d:any) => d !== 'Student Transfer'));
        toast({title:'Process completed successfully'});
    };


    // Get next class in order
    const getNextClass = (currentClass:any, classes:any) => {
        // Find the current class in the array
        const currentClassIndex = classes.findIndex((cls:any) => cls.class_name === currentClass.class_name);
        
        // If the current class is found and it's not the last one
        if(currentClassIndex !== -1 && currentClassIndex < classes.length - 1){
            return classes[currentClassIndex + 1];
        }else{
            return null;
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const classesArray = classesRes.map((c:any) => {
                return{
                    ...c,
                    next_class:getNextClass(c, classesRes)?.class_name,
                    next_section:c?.sections[0],
                    section:c?.sections[0]
                };
            })
            setClasses(classesArray);
            setSelectedClasses(classesArray);
        };
        fetcher();
    }, []);

    return (
        <Draggable>
            <div
                className='absolute w-[90%] h-[90%] flex flex-col items-center justify-between gap-6 pb-10 border-[0.5px] border-[#ccc] rounded-[4px] bg-[#fff]'
            >

                <div className='w-full flex flex-col items-center gap-4'>
                    {/* Header */}
                    <div className='flex flex-row items-center justify-center w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[4px]'>
                        <h2>Student Transfer {currentSession}</h2>
                    </div>


                    {/* Values */}
                    <div className='w-[90%] flex flex-col overflow-y-scroll custom-sidebar-scrollbar border-[0.5px] border-[#ccc]' style={{maxHeight:600}}>
                        {/* Headers */}
                        <ul className='w-full min-w-[600px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                Sr. No.
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                Class
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                Section
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                New Class
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
                                New Section
                                <ChevronsUpDown size={12}/>
                            </li>
                            <li className='basis-[10%] flex flex-row items-center justify-center px-2'>
                                <Checkbox
                                    checked={selectedClasses.length === classes.length}
                                    onClick={() => {
                                        selectedClasses.length === classes.length
                                            ? setSelectedClasses([])
                                            : setSelectedClasses(classes)
                                    }}
                                    className='rounded-[2px] border-hash-color'
                                />
                            </li>
                        </ul>
                        {/* Values */}
                        <div>
                            {
                                classes?.map((i:any) => (
                                    <ul
                                        className='w-full min-w-[600px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                                    >
                                        <li className='basis-[10%] flex flex-row items-center justify-center px-2 py-3 border-r-[0.5px] border-[#ccc]'>
                                            {classes.indexOf(i) + 1}
                                        </li>
                                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {i?.class_name}
                                        </li>
                                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {i?.section}
                                        </li>
                                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Select
                                                value={i.next_class}
                                                onValueChange={(v:any) => {
                                                    i.next_class = v;
                                                    setSelectedClasses([...selectedClasses]);
                                                }}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Class'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes?.filter((c:any) => c !== i).length < 1 ? (
                                                        <p>No classes</p>
                                                    ) : classes?.filter((c:any) => c !== i)?.map((c:any) => (
                                                        <SelectItem value={c.class_name} key={c._id}>{c.class_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </li>
                                        <li className='basis-[20%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Select
                                                value={i.next_section}
                                                onValueChange={(v:any) => {
                                                    i.next_section = v;
                                                    setSelectedClasses([...selectedClasses]);
                                                }}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Select Section'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {i?.sections?.length < 1 ? (
                                                        <p>No sections</p>
                                                    ) : i?.sections?.map((section:any) => (
                                                        <SelectItem value={section} key={section}>{section}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </li>
                                        <li className='basis-[10%] flex flex-row items-center justify-center px-2'>
                                            <Checkbox
                                                checked={selectedClasses.includes(i)}
                                                onClick={() => {
                                                    selectedClasses.includes(i)
                                                        ? setSelectedClasses(selectedClasses.filter((value:any) => value !== i))
                                                        : setSelectedClasses([...selectedClasses, i])
                                                }}
                                                className='rounded-[2px] border-hash-color'
                                            />
                                        </li>
                                    </ul>
                                ))
                            }
                        </div>
                    </div>
                </div>


                {/* Buttons */}
                <div className='flex flex-row items-center justify-center gap-4'>
                    <AlertDialog>
                        <AlertDialogTrigger
                            className='flex items-center justify-center px-8 h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                        >
                            Transfer
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to transfer students from session {currentSession} to {nextSession}</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>No</AlertDialogCancel>
                                <AlertDialogAction>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={transerHandler}
                                    >
                                        Yes
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <span
                        onClick={skipHandler}
                        className='flex items-center justify-center px-8 h-8 text-md text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Skip
                    </span>
                </div>

            </div>
        </Draggable>
    );
};





// Export
export default StudentTransfer;