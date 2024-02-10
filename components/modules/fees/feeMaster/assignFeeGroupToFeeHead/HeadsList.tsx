// Imports
import {useEffect, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Command, CommandItem, CommandList} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {fetchBankLedgers} from '@/lib/actions/accounts/accounts/bankLedger.actions';
import {fetchGeneralLedgers} from '@/lib/actions/accounts/accounts/generalLedger.actions';
import {fetchInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const HeadsList = ({heads, form, setHeads}:any) => {


    // Installments
    const [installments, setInstallments] = useState([{}]);


    // Account ledgers
    const [accountLedgers, setAccountLedgers]  = useState([{}]);


    // Bank ledgers
    const [bankLedgers, setBankLedgers]  = useState([{}]);


    // Check change
    const checkChange = (head:any) => {
        if(form.getValues().affiliated_heads.map((item:any) => item.head_name).includes(head.name)){
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.type_name`, '');
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.head_name`, '');
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.schedule_type`, '');
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.installment`, '');
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.account`, '');
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.post_account`, '');
        }else{
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.type_name`, head.affiliated_fee_type);
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.head_name`, head.name);
            form.setValue(`affiliated_heads.${heads.indexOf(head)}.schedule_type`, head.pay_schedule);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const installmentsRes = await fetchInstallments();
            const accountLedgersRes = await fetchGeneralLedgers();
            const bankLedgersRes = await fetchBankLedgers();
            setInstallments(installmentsRes);
            setAccountLedgers(accountLedgersRes)
            setBankLedgers(bankLedgersRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
    }, [form.watch('affiliated_heads')]);



    return (
        <Command
            className='w-[90%] max-h-[70%] flex flex-col items-center pb-2 gap-2 rounded-[2px] border-[0.5px] border-[#E8E8E8] '
        >
    
            <div className='w-full h-full flex flex-col items-center bg-[#F1F1F1]'>

                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[1000px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[10%] flex flex-row items-center justify-between p-3 border-r-[0.5px] border-[#ccc]'>
                            Sr. No.
                            <ChevronsUpDown size={12}/>
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
                            Select
                            {heads[0]?.name && (
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    onCheckedChange={() => {
                                        if(form.getValues().affiliated_heads.filter((head:any) => head.head_name === '').length === heads.length || form.getValues().affiliated_heads.filter((head:any) => head.head_name === '').length !== 0){
                                            heads.map((head:any) => {
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.type_name`, head.affiliated_fee_type);
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.head_name`, head.name);
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.schedule_type`, head.pay_schedule);
                                            });
                                        }else{
                                            heads.map((head:any) => {
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.type_name`, '');
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.head_name`, '');
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.schedule_type`, '');
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.installment`, '');
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.account`, '');
                                                form.setValue(`affiliated_heads.${heads.indexOf(head)}.post_account`, '');
                                            });
                                        };
                                    }}
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
                        <li className='basis-[15%] flex flex-col p-2 border-r-[0.5px] border-[#ccc]'>
                            Fee Account
                            <Select
                                onValueChange={v => {
                                    setHeads(heads.map((h:any) => {
                                        return{
                                            ...h,
                                            account:v
                                        };
                                    }));
                                    heads.map((h:any) => {
                                        form.setValue(`affiliated_heads.${heads.indexOf(h)}.account`, v);
                                    });
                                }}
                            >
                                <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                    <SelectValue placeholder='Select Account'/>
                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                </SelectTrigger>
                                <SelectContent>
                                    {accountLedgers.length < 1 ? (
                                        <p>No account ledgers</p>
                                        // @ts-ignore
                                    ) : !accountLedgers[0]?.account_name ? (
                                        <LoadingIcon />
                                    ) : accountLedgers.map((ledger:any) => (
                                        <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </li>
                        <li className='basis-[15%] flex flex-col p-2'>
                            Fee Post Account
                            <Select
                                onValueChange={v => {
                                    setHeads(heads.map((h:any) => {
                                        return{
                                            ...h,
                                            post_account:v
                                        };
                                    }));
                                    heads.map((h:any) => {
                                        form.setValue(`affiliated_heads.${heads.indexOf(h)}.post_account`, v);
                                    });
                                }}
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
                        </li>
                    </ul>

                    {/* Values */}
                    <CommandList>
                        {
                            heads.length < 1 ? (
                                // <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b[0.5px] border-[#ccc]'>
                                <p className='w-full flex flex-row p-2 text-sm bg-[#F3F8FB] border-b[0.5px] border-[#ccc]'>
                                    No heads yet
                                </p>
                            ) : !heads[0]?.name ? (
                                    <LoadingIcon />
                                ) : heads.map((head:any) => (
                                    // <CommandItem key={head._id} className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                    <CommandItem key={head._id} className='w-full min-w-[1000px] flex flex-row text-[10px] bg-[#F3F8FB] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{heads.indexOf(head) + 1}</li>
                                        <li className='basis-[10%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            <Checkbox
                                                checked={form.getValues().affiliated_heads.map((item:any) => item.head_name).includes(head.name)}
                                                onCheckedChange={() => checkChange(head)}
                                                className='rounded-[2px] text-hash-color'
                                            />
                                        </li>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.affiliated_fee_type}</li>
                                        <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.name}</li>
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{head.pay_schedule}</li>

                                        {/* Installment */}
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {form.getValues().affiliated_heads.map((item:any) => item.head_name).includes(head.name) ? (
                                                <FormField
                                                    disabled={heads[heads.indexOf(head)].pay_schedule === 'installment'}
                                                    control={form.control}
                                                    name={`affiliated_heads.${heads.indexOf(head)}.installment`}
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
                                                <Select
                                                    disabled={heads[heads.indexOf(head)].pay_schedule === 'installment'}
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
                                            )}
                                        </li>

                                        {/* Fee account */}
                                        <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>
                                            {form.getValues().affiliated_heads.map((item:any) => item.head_name).includes(head.name) ? (
                                                <FormField
                                                    control={form.control}
                                                    name={`affiliated_heads.${heads.indexOf(head)}.account`}
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
                                                                        ) : accountLedgers[0]?.account_name === '' ? (
                                                                            <LoadingIcon />
                                                                        ) : accountLedgers.map((ledger:any) => (
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
                                                <Select
                                                    value={heads[heads.indexOf(head)].account}
                                                    onValueChange={v => {
                                                        heads[heads.indexOf(head)].account = v;
                                                        setHeads([...heads]);
                                                    }}
                                                >
                                                    <SelectTrigger className='h-6 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                        <SelectValue placeholder='Select Account'/>
                                                        <ChevronDown className='h-4 w-4 opacity-50'/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {accountLedgers.length < 1 ? (
                                                            <p>No account ledgers</p>
                                                            // @ts-ignore
                                                        ) : accountLedgers[0]?.account_name === '' ? (
                                                            <LoadingIcon />
                                                        ) : accountLedgers.map((ledger:any) => (
                                                            <SelectItem value={ledger.account_name} key={ledger._id}>{ledger.account_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </li>

                                        {/* Fee post account */}
                                        <li className='basis-[15%] flex flex-row items-center px-2'>
                                            {form.getValues().affiliated_heads.map((item:any) => item.head_name).includes(head.name) ? (
                                                <FormField
                                                    control={form.control}
                                                    name={`affiliated_heads.${heads.indexOf(head)}.post_account`}
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
                                                <Select
                                                    value={heads[heads.indexOf(head)].post_account}
                                                    onValueChange={v => {
                                                        heads[heads.indexOf(head)].post_account = v;
                                                        setHeads([...heads]);
                                                    }}
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