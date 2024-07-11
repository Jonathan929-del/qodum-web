'use client';
// Imports
import {useEffect, useState} from 'react';
import FormCom from '@/components/modules/accounts/accounts/accountGroup/FormCom';
import ViewCom from '@/components/modules/accounts/accounts/accountGroup/ViewCom';
import {fetchAccountGroups} from '@/lib/actions/accounts/accounts/accountGroup.actions';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Account groups
    const [accountGroups, setAccountGroups] = useState([{}]);


    // Update Account Group
    const [updateAccountGroup, setUpdateAccountGroup] = useState({
        id:'',
        isDeleteClicked:false,
        group_name:'',
        category:'',
        group_type:'',
        group_no:null,
    });

    
    // Use effect
    useEffect(() => {
        const accountGroupsFetcher = async () => {
            const accountGroupRes = await fetchAccountGroups();
            setAccountGroups(accountGroupRes);
        };
        accountGroupsFetcher();
    }, [isViewOpened, updateAccountGroup]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        accountGroups={accountGroups}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateAccountGroup={setUpdateAccountGroup}
                    />
                ) : (
                    <FormCom
                        accountGroups={accountGroups}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateAccountGroup={updateAccountGroup}
                        setUpdateAccountGroup={setUpdateAccountGroup}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;