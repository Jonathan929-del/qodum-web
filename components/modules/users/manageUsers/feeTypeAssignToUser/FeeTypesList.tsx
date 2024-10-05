// Imports
import {Checkbox} from '@/components/ui/checkbox';





// Main Function
const FeeTypesList = ({currentUser, setCurrentUser, feeTypes}:any) => {
    return (
        <div className='w-[95%] h-full overflow-x-scroll custom-sidebar-scrollbar rounded-[4px]'>
            <div className='w-full h-full min-w-[750px] flex flex-col bg-[#F2F8FA] rounded-[4px]'>

                {/* Headers */}
                <ul className='flex flex-row items-center justify-between bg-[#435680] text-white border-[0.5px] border-[#ccc] rounded-t-[4px]'>
                    <li className='basis-[20%] text-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2'>
                        Sr. No.
                    </li>
                    <li className='basis-[20%] flex items-center justify-center border-r-[0.5px] border-[#ccc] text-[11px] font-semibold py-2 gap-2'>
                        Select
                        <Checkbox
                            className='rounded-[2px] text-white'
                            checked={currentUser?.fee_types?.length === feeTypes?.length}
                            onClick={() => {
                                if(currentUser?.fee_types?.length === feeTypes?.length){
                                    setCurrentUser({
                                        ...currentUser,
                                        fee_types:[]
                                    });
                                }else{
                                    setCurrentUser({
                                        ...currentUser,
                                        fee_types:feeTypes?.map((t:any) => t?.name)
                                    });
                                };
                            }}
                        />
                    </li>
                    <li className='basis-[60%] flex items-center justify-center text-center text-[11px] font-semibold py-2 gap-2'>
                        Type
                    </li>
                </ul>

                {/* Values */}
                {feeTypes.map((t:any) => (
                    <ul className={`flex flex-row items-center justify-between border-[0.5px] border-t-[0px] border-[#ccc] ${Math.floor((feeTypes.indexOf(t) + 1) / 2) * 2 !== feeTypes.indexOf(t) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}>
                            <li className='basis-[20%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                {feeTypes.indexOf(t) + 1}
                            </li>
                            <li className='basis-[20%] flex items-center justify-center text-hash-color border-r-[0.5px] border-[#ccc] text-[11px] h-[30px]'>
                                <Checkbox
                                    className='rounded-[2px] text-hash-color'
                                    checked={currentUser?.fee_types?.includes(t?.name)}
                                    onClick={() => {
                                        if(currentUser?.fee_types?.includes(t?.name)){
                                            setCurrentUser({
                                                ...currentUser,
                                                fee_types:currentUser?.fee_types?.filter((ft:any) => ft !== t?.name)
                                            })
                                        }else{
                                            setCurrentUser({
                                                ...currentUser,
                                                fee_types:[...currentUser?.fee_types, t?.name]
                                            })
                                        };
                                    }}
                                />
                            </li>
                            <li className='basis-[60%] flex items-center justify-center text-hash-color text-[11px] h-[30px]'>
                                {t.name}
                            </li>
                        </ul>
                    ))
                }
        
            </div>
        </div>
    );
};





// Export
export default FeeTypesList;