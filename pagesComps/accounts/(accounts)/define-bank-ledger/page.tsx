'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/accounts/bankLedger/FormCom';
import ViewCom from '@/components/modules/accounts/accounts/bankLedger/ViewCom';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchAccountGroups} from '@/lib/actions/accounts/accounts/accountGroup.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Bank Ledgers
    const [bankLedgers, setBankLedgers] = useState([{}]);


    // Account Groups
    const [accountGroups, setAccountGroups] = useState([{}]);


    // Update Bank Ledger
    const [updateBankLedger, setUpdateBankLedger] = useState({
        id:'',
        isDeleteClicked:false,
        account_name:'',
        account_no:0,
        group:'',
        account_type:'',
        account_address:'',
        account_city:'',
        pin_code:null,
        email:'',
        mobile:null,
        opening_balance:null,
        opening_balance_type:'Debit',
        assign_date:new Date()
    });

    
    // Use effect
    useEffect(() => {
        const bankLedgersFetcher = async () => {
            const bankLedgerRes = await fetchBankLedgers();
            const accountGroupRes = await fetchAccountGroups();
            setBankLedgers(bankLedgerRes);
            setAccountGroups(accountGroupRes.filter(group => group.category === 'Bank'));
        };
        bankLedgersFetcher();
    }, [isViewOpened, updateBankLedger]);


    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        bankLedgers={bankLedgers}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateBankLedger={setUpdateBankLedger}
                    />
                ) : (
                    <FormCom
                        bankLedgers={bankLedgers}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateBankLedger={updateBankLedger}
                        setUpdateBankLedger={setUpdateBankLedger}
                        accountGroups={accountGroups}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;