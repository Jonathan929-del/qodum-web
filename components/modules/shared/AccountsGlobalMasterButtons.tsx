'use client';
// Imports
import {Button} from '../../ui/button';
import {useToast} from '@/components/ui/use-toast';
import {ExcelFile, ExcelSheet} from 'react-xlsx-wrapper';
import {deleteNarrationMaster} from '@/lib/actions/accounts/accounts.actions';
import {AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';





// Main Function
const AccountsGlobalMasterButtons = ({setIsViewOpened, narrations, updateNarration, setUpdateNarration, onSubmit, form}:any) => {


    // Toast
    const {toast} = useToast();


    // Excel downloader
    const narrationsDataArray = narrations.map((narration:any) => {

        // Voucher type abbreviation
        let abbreviation;
        switch (narration.voucher_type) {
            case 'Cash Payment Voucher':
                abbreviation = 'CASHP';
                break;
            case 'Cash Receipt Voucher':
                abbreviation = 'CASHR';
                break;
            case 'Bank Payment Voucher':
                abbreviation = 'BANKP';
                break;
            case 'Bank Receipt Voucher':
                abbreviation = 'BANKR';
                break;
            case 'Contra Voucher':
                abbreviation = 'CONTRA';
                break;
            case 'Journal Voucher':
                abbreviation = 'JVENT';
                break;
            default:
                '';
        }

        return([
            {value:narrations.indexOf(narration)},
            {value:narration.narration},
            {value:narration.voucher_type},
            {value:abbreviation}
        ]);
    });


    // Data
    const multiDataSet:any = [
        {
            columns:[
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'Narrations List', width:{wpx:500}, style:{font:{bold:true, sz:'20', color:{rgb:'ffffff'}}, fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}},
                {title:'', style:{fill:{patternType:'solid', fgColor:{rgb:'16365C'}}}}
            ],
            data:[]
        },
        {
            columns: [
                {title:'Id', width:{wpx:20}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Narrations', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Voucher Type', width:{wpx:150}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}},
                {title:'Entry Type', width:{wpx:100}, style:{font:{bold:true}, fill:{patternType:'solid', fgColor:{rgb:'C9CACC'}}}}
            ],
            data:narrationsDataArray,
        }
    ];


    // Delete Handler
    const deleteNarration = async () => {
        await deleteNarrationMaster({id:updateNarration.id}).then(() => {
            setIsViewOpened(true);
            setUpdateNarration({
                id:'',
                narration:'',
                voucher_type:''
            });
            toast({title:'Deleted Successfully!'});
        });
    };


    return (
        <div className={`flex flex-row items-center justify-between pb-4 pt-8 gap-2 ${updateNarration.id !== '' && 'ml-[-35px]'}`}>
            {
                updateNarration.id === '' ? (
                    <Button type='submit' className='px-4 h-8 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition border-[1px] border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'>
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
                                        onClick={() => {
                                            form.handleSubmit(onSubmit)().then(() => {
                                                setIsViewOpened(true);
                                                setUpdateNarration({
                                                    id:'',
                                                    narration:'',
                                                    voucher_type:''
                                                });
                                            });
                                        }}
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
                            >
                                Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>No</AlertDialogCancel>
                                    <Button
                                        className='border-[0.5px] border-black'
                                        onClick={deleteNarration}
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
                <ExcelFile
                    element={
                        <span
                            className='flex items-center px-4 h-8 text-black bg-gradient-to-r from-[#FFC73A] to-[#FFF3AB] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:border-[#FFC73A] hover:from-[#ffc73a1f] hover:to-[#ffc73a1f] hover:text-[#FFC73A]'
                        >
                            Print
                        </span>
                    }
                    filename='Narration List'
                >
                    <ExcelSheet
                        dataSet={multiDataSet}
                        name='Narrations'
                    />
                </ExcelFile>
            <span
                className='flex items-center px-4 h-8 text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                         hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color'
                onClick={() => setUpdateNarration({
                    id:'',
                    narration:'',
                    voucher_type:''
                })}
            >
                Cancel
            </span>
        </div>
    );
};





// Export
export default AccountsGlobalMasterButtons;