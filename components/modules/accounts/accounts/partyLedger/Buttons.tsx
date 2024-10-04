'use client';
// Imports
import moment from 'moment';
import PrintButton from './PrintButton';
import {Button} from '../../../../ui/button';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction} from '@/components/ui/alert-dialog';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';





// Main Function
const Buttons = ({setIsViewOpened, partyLedgers, updatePartyLedger, setUpdatePartyLedger, onSubmit, form, setAssignDate}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Cancel click
    const cancelClick = () => {
        // Reseting update entity
        setUpdatePartyLedger({
            id:'',
            isDeleteClicked:false,
            account_name:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:null,
            email:'',
            mobile:null,
            pan:null,
            tin:null,
            opening_balance:null,
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        // Reseting form
        form.reset({
            account_name:'',
            group:'',
            account_type:'',
            account_address:'',
            account_city:'',
            pin_code:'',
            email:'',
            mobile:'',
            pan:'',
            tin:'',
            opening_balance:'',
            opening_balance_type:'Debit',
            assign_date:new Date()
        });
        setAssignDate(moment());
    };


    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Accounts')?.permissions?.find((pp:any) => pp.sub_menu === 'Define Party Ledger');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='flex flex-row items-center justify-between pb-4 pt-8 gap-2 ml-0'>
            {
                updatePartyLedger.id === '' ? permissions.add && (
                    <Button
                        type='submit'
                        className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>
                ) : (
                    <>


                        {/* Modify button */}
                        {permissions.modify && (
                            <AlertDialog>
                                <AlertDialogTrigger
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white
                                    hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0] sm:text-[16px] sm:px-4'
                                >
                                    Modify
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want  to modify this record?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No</AlertDialogCancel>
                                        <AlertDialogAction>
                                            <Button
                                                className='border-[0.5px] border-black'
                                                onClick={handleSubmit}
                                            >
                                                Yes
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}


                        {/* Delete button */}
                        {permissions.delete && (
                            <AlertDialog>
                                <AlertDialogTrigger
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white
                                    hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b] sm:text-[16px] sm:px-4'
                                    onClick={() => setUpdatePartyLedger({...updatePartyLedger, isDeleteClicked:true})}
                                >
                                    Delete
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            onClick={() => setUpdatePartyLedger({...updatePartyLedger, isDeleteClicked:false})}
                                        >
                                            No
                                        </AlertDialogCancel>
                                        <Button
                                            className='border-[0.5px] border-black'
                                            onClick={handleSubmit}
                                        >
                                            Yes
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </>
                )
            }


            {/* View button */}
            {permissions.read_only && (
                <span
                    onClick={() => setIsViewOpened(true)}
                    className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'
                >
                    View
                </span>
            )}


            {/* Print button */}
            {permissions.print && (
                <PrintButton partyLedgers={partyLedgers}/>
            )}


            {/* Cancel button */}
            <span
                className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
                onClick={cancelClick}
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default Buttons;