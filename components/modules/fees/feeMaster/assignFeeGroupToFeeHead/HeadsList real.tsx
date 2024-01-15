// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchAccountGroups} from '@/lib/actions/accounts/accounts/accountGroup.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Input } from '@/components/ui/input';





// Main Function
const HeadsList = ({heads, form, selectedHeads, setSelectedHeads, selectedNames, setSelectedNames}:any) => {


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Account ledgers
    const [accountLedgers, setAccountLedgers]  = useState([{}]);


    // Bank ledgers
    const [bankLedgers, setBankLedgers]  = useState([{}]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const installmentsRes = await fetchInstallments();
            const accountLedgersRes = await fetchAccountGroups();
            const bankLedgersRes = await fetchBankLedgers();
            setInstallments(installmentsRes);
            setAccountLedgers(accountLedgersRes)
            setBankLedgers(bankLedgersRes);
        };
        fetcher();
    }, []);


    return (
        <Command
            className='w-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] '
        >
            
            {/* Header */}
            <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Group Head Relation</h2>
            </div>
            <div className='w-full h-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            {heads[0]?.name && (
                                <Checkbox
                                    onCheckedChange={() => {
                                        if(selectedHeads?.length === heads.length){
                                            setSelectedHeads([{}]);
                                            setSelectedNames([]);
                                        }else{
                                            setSelectedHeads(heads);
                                            setSelectedNames(heads.map((head:any) => head.name));
                                        };
                                    }}
                                    className='rounded-[2px] text-hash-color'
                                />
                            )}
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Type
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Head
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Schedule Type
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Installment
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Account
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2'>
                            Fee Post Account
                            <ChevronsUpDown size={12}/>
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            heads.length < 1 ? (
                                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                    No heads yet
                                </p>
                            ) : !heads[0]?.name ? (
                                    <LoadingIcon />
                                ) : heads.map((head:any) => (
                                    <CommandItem key={head._id} className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[10%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Checkbox
                                                className='rounded-[2px] text-hash-color'
                                                checked={selectedNames?.includes(head.name)}
                                                onCheckedChange={() => {
                                                    if(selectedHeads?.includes(head)){
                                                        setSelectedHeads(selectedHeads?.filter((h:any) => h.name !== head.name));
                                                        setSelectedNames(selectedNames?.filter((n:any) => n !== head.name));
                                                    }else{
                                                        setSelectedHeads([...selectedHeads, head]);
                                                        setSelectedNames([...selectedNames, head.name]);
                                                    }
                                                }}
                                            />
                                        </li>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.affiliated_fee_type}</li>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.name}</li>
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.pay_schedule}</li>

                                        {/* Installment */}
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {selectedHeads?.includes(head) ? (
                                                <FormField
                                                    control={form.control}
                                                    name={`affiliated_heads[${selectedHeads?.indexOf(head)}].installment`}
                                                    render={({field}) => (
                                                        <FormItem className='w-full'>
                                                            <FormControl>
                                                                <Select
                                                                    {...field}
                                                                    value={field.value}
                                                                    onValueChange={field.onChange}
                                                                >
                                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                                        <SelectValue placeholder='Select Install'/>
                                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {installments.length < 1 ? (
                                                                            <p>No installments</p>
                                                                            // @ts-ignore
                                                                        ) : installments[0]?.name === '' ? (
                                                                            <LoadingIcon />
                                                                        ) : installments.map((installment:any) => (
                                                                            <SelectItem value={installment.name} key={installment._id}>{installment.name}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage className='text-xs'/>
                                                    </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <Select>
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Install'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {installments.length < 1 ? (
                                                            <p>No installments</p>
                                                            // @ts-ignore
                                                        ) : installments[0]?.name === '' ? (
                                                            <LoadingIcon />
                                                        ) : installments.map((installment:any) => (
                                                            <SelectItem value={installment.name} key={installment._id}>{installment.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </li>

                                        {/* Fee account */}
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {selectedHeads?.includes(head) ? (
                                                <FormField
                                                    control={form.control}
                                                    name={`affiliated_heads[${selectedHeads?.indexOf(head)}].account`}
                                                    render={({field}) => (
                                                        <FormItem className='w-full'>
                                                            <FormControl>
                                                                <Select
                                                                    {...field}
                                                                    value={field.value}
                                                                    onValueChange={field.onChange}
                                                                >
                                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                                        <SelectValue placeholder='Select Account'/>
                                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {accountLedgers.length < 1 ? (
                                                                            <p>No account ledgers</p>
                                                                            // @ts-ignore
                                                                        ) : accountLedgers[0]?.group_name === '' ? (
                                                                            <LoadingIcon />
                                                                        ) : accountLedgers.map((ledger:any) => (
                                                                            <SelectItem value={ledger.group_name} key={ledger._id}>{ledger.group_name}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage className='text-xs mt-[-20px]'/>
                                                    </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <Select>
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Account'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {accountLedgers.length < 1 ? (
                                                            <p>No account ledgers</p>
                                                            // @ts-ignore
                                                        ) : accountLedgers[0]?.group_name === '' ? (
                                                            <LoadingIcon />
                                                        ) : accountLedgers.map((ledger:any) => (
                                                            <SelectItem value={ledger.group_name} key={ledger._id}>{ledger.group_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </li>

                                        {/* Fee post account */}
                                        <li className='basis-[15%] flex flex-row items-center px-2'>
                                            {selectedHeads?.includes(head) ? (
                                                <FormField
                                                    control={form.control}
                                                    name={`affiliated_heads[${selectedHeads?.indexOf(head)}].post_account`}
                                                    render={({field}) => (
                                                        <FormItem className='w-full'>
                                                            <FormControl>
                                                                <Select
                                                                    {...field}
                                                                    value={field.value}
                                                                    onValueChange={field.onChange}
                                                                >
                                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                                        <SelectValue placeholder='Select Post Acc.'/>
                                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {bankLedgers.length < 1 ? (
                                                                            <p>No bank ledgers</p>
                                                                            // @ts-ignore
                                                                        ) : bankLedgers[0]?.account_name === '' ? (
                                                                            <LoadingIcon />
                                                                        ) : bankLedgers.map((ledger:any) => (
                                                                            <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage className='text-xs mt-[-20px]'/>
                                                    </FormItem>
                                                    )}
                                                />
                                            ) : (
                                                <Select>
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Post Acc.'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {bankLedgers.length < 1 ? (
                                                            <p>No bank ledgers</p>
                                                            // @ts-ignore
                                                        ) : bankLedgers[0]?.account_name === '' ? (
                                                            <LoadingIcon />
                                                        ) : bankLedgers.map((ledger:any) => (
                                                            <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </li>
                                    </CommandItem>
                                ))
                        }
                    </CommandList>
                </div>
            </div>
        </Command>
    );
};





// Export
export default HeadsList;