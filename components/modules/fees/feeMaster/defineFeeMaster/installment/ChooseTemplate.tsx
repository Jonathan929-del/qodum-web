// Imports
import {useToast} from '@/components/ui/use-toast';
import {createInstallments} from '@/lib/actions/fees/feeMaster/feeMaster/installment.actions';





// Main Function
const ChooseTemplate = ({setIsTemplatesOpened}:any) => {

    // Toast
    const {toast} = useToast();

    // Click handler
    const clickHandler = async (method:string) => {
        try {

            // Monthly structure
            if(method === 'Monthly'){
                const installments = [
                    {
                        name:'April',
                        print_name:'April',
                        preference_no:1,
                        due_on_date:{
                            day:'1',
                            month:'April',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'April',
                            year:''
                        },
                        months:['Apr']
                    },
                    {
                        name:'May',
                        print_name:'May',
                        preference_no:2,
                        due_on_date:{
                            day:'1',
                            month:'May',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'May',
                            year:''
                        },
                        months:['May']
                    },
                    {
                        name:'June',
                        print_name:'June',
                        preference_no:3,
                        due_on_date:{
                            day:'1',
                            month:'June',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'June',
                            year:''
                        },
                        months:['Jun']
                    },
                    {
                        name:'July',
                        print_name:'July',
                        preference_no:4,
                        due_on_date:{
                            day:'1',
                            month:'July',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'July',
                            year:''
                        },
                        months:['Jul']
                    },
                    {
                        name:'August',
                        print_name:'August',
                        preference_no:5,
                        due_on_date:{
                            day:'1',
                            month:'August',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'August',
                            year:''
                        },
                        months:['Aug']
                    },
                    {
                        name:'September',
                        print_name:'September',
                        preference_no:6,
                        due_on_date:{
                            day:'1',
                            month:'September',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'September',
                            year:''
                        },
                        months:['Sep']
                    },
                    {
                        name:'October',
                        print_name:'October',
                        preference_no:7,
                        due_on_date:{
                            day:'1',
                            month:'October',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'October',
                            year:''
                        },
                        months:['Oct']
                    },
                    {
                        name:'November',
                        print_name:'November',
                        preference_no:8,
                        due_on_date:{
                            day:'1',
                            month:'November',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'November',
                            year:''
                        },
                        months:['Nov']
                    },
                    {
                        name:'December',
                        print_name:'December',
                        preference_no:9,
                        due_on_date:{
                            day:'1',
                            month:'December',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'December',
                            year:''
                        },
                        months:['Dec']
                    },
                    {
                        name:'January',
                        print_name:'January',
                        preference_no:10,
                        due_on_date:{
                            day:'1',
                            month:'January',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'January',
                            year:''
                        },
                        months:['Jan']
                    },
                    {
                        name:'February',
                        print_name:'February',
                        preference_no:11,
                        due_on_date:{
                            day:'1',
                            month:'February',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'February',
                            year:''
                        },
                        months:['Feb']
                    },
                    {
                        name:'March',
                        print_name:'March',
                        preference_no:12,
                        due_on_date:{
                            day:'1',
                            month:'March',
                            year:''
                        },
                        due_date:{
                            day:'10',
                            month:'March',
                            year:''
                        },
                        months:['Mar']
                    }
                ];
                const res = await createInstallments({installments});
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            };

            // Quarterly structure
            if(method === 'Quarterly'){
                const installments = [
                    {
                        name:'Quarter-I',
                        print_name:'Quarter-I',
                        preference_no:1,
                        due_on_date:{
                            day:'1',
                            month:'April',
                            year:''
                        },
                        due_date:{
                            day:'30',
                            month:'April',
                            year:''
                        },
                        months:['Apr', 'May', 'Jun']
                    },
                    {
                        name:'Quarter-II',
                        print_name:'Quarter-II',
                        preference_no:2,
                        due_on_date:{
                            day:'1',
                            month:'July',
                            year:''
                        },
                        due_date:{
                            day:'30',
                            month:'July',
                            year:''
                        },
                        months:['July', 'August', 'September']
                    },
                    {
                        name:'Quarter-III',
                        print_name:'Quarter-III',
                        preference_no:3,
                        due_on_date:{
                            day:'1',
                            month:'October',
                            year:''
                        },
                        due_date:{
                            day:'30',
                            month:'October',
                            year:''
                        },
                        months:['Oct', 'Nov', 'Dec']
                    },
                    {
                        name:'Quarter-IV',
                        print_name:'Quarter-IV',
                        preference_no:4,
                        due_on_date:{
                            day:'1',
                            month:'January',
                            year:''
                        },
                        due_date:{
                            day:'30',
                            month:'January',
                            year:''
                        },
                        months:['Jan', 'Feb', 'Mar']
                    }
                ];
                const res = await createInstallments({installments});
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
                toast({title:'Added Successfully!'});
            };

            // Setting is templates opened to false
            setIsTemplatesOpened(false);

        }catch(err){
            console.log(err);  
        };
    };

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1200px] flex flex-col items-center py-10 gap-10 rounded-[8px] border-[0.5px] border-[#E8E8E8]'>
            <p>Choose installments structure:</p>
            <ul className='w-[60%] flex flex-col items-center justify-center gap-3'>
                <li
                    onClick={() => clickHandler('Monthly')}
                    className='flex items-center justify-center w-[150px] h-8 text-xs text-white bg-gradient-to-r bg-[#6BCDFD] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:opacity-70 sm:text-[16px] sm:px-6'
                >
                    Monthly
                </li>
                <li
                    onClick={() => clickHandler('Quarterly')}
                    className='flex items-center justify-center w-[150px] h-8 text-xs text-white bg-gradient-to-r bg-[#699CFC] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:opacity-70 sm:text-[16px] sm:px-6'
                >
                    Quarterly
                </li>
                <li
                    onClick={() => clickHandler('Custom')}
                    className='flex items-center justify-center w-[150px] h-8 text-xs text-white bg-gradient-to-r bg-[#6DFD9C] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:opacity-70 sm:text-[16px] sm:px-6'
                >
                    Custom
                </li>
            </ul>
        </div>
    );
};





// Export
export default ChooseTemplate;