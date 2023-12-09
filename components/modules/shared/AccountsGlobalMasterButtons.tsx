'use client';
// Imports
import {Button} from '../../ui/button';
import PrintButton from './PrintButton';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main Function
const AccountsGlobalMasterButtons = ({setIsViewOpened, narrations, updateNarration, setUpdateNarration, onSubmit, form}:any) => {
    return (
        <div className={`flex flex-row items-center justify-between pb-4 pt-8 gap-2 ${updateNarration.id !== '' && 'ml-[-35px]'}`}>
            {
                updateNarration.id === '' ? (
                    <Button
                        type='submit'
                        className='px-4 h-8 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition border-[1px] border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Save
                    </Button>
                ) : (
                    <>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-4 h-8 text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white
                                hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0]'
                            >
                                Modify
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to modify this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={() => form.handleSubmit(onSubmit)()}
                                    >
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className='px-4 h-8 text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white
                                hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b]'
                                onClick={() => setUpdateNarration({...updateNarration, isDeleteClicked:true})}
                            >
                                Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        onClick={() => setUpdateNarration({...updateNarration, isDeleteClicked:false})}
                                    >
                                        No
                                    </AlertDialogCancel>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={() => form.handleSubmit(onSubmit)()}
                                    >
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )
            }
            <span
                onClick={() => setIsViewOpened(true)}
                className='flex items-center px-4 h-8 text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                         hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272]'
            >
                View
            </span>
            <PrintButton narrations={narrations}/>
            <span
                className='flex items-center px-4 h-8 text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color'
                onClick={() => updateNarration.id !== '' && form.handleSubmit(onSubmit)()}
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default AccountsGlobalMasterButtons;