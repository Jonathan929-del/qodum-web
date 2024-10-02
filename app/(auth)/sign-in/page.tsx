'use client';
// Imports
import Image from 'next/image';
import {redirect} from 'next/navigation';
import {Input} from '@/components/ui/input';
import QodumLogo from '@/public/assets/logo.png';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import WelcomeImage from '@/public/assets/auth img.svg';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {loginUser} from '@/lib/actions/users/manageUsers/user.actions';





// Sign in
const SignIn = () => {

    // Login user check
    const {user, login} = useContext(AuthContext);


    // Toast
    const {toast} = useToast();


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Errors
    const [errors, setErrors] = useState({
        username:'',
        password:''
    });


    // Username
    const [username, setUsername] = useState('');


    // Password
    const [password, setPassword] = useState('');


    // Submit handler
    const submitHandler = async () => {

        // Set loading to true
        setIsLoading(true);


        // Username and password validations
        if(username === '' || password === ''){
            setErrors({
                username:username === '' ? 'Please enter username' : '',
                password:password === '' ? 'Please enter password' : ''
            });
            setIsLoading(false);
            return;
        };


        // User login
        const res = await loginUser({user_name:username, password});
        if(!res.success){
            toast({title:res.message, variant:'error'});
            setIsLoading(false);
            return;
        };
        console.log(res);
        // login(res.user);
        toast({title:'Logged in'});


        // Set loading to true
        setIsLoading(false);

    };


    // Use effect
    useEffect(() => {
        if(user) redirect('/');
    }, [isLoading]);

    return (
        <div className='w-full h-screen flex flex-row bg-[#F1F7FB]'>

            {/* Image */}
            <div className='flex-1'>
                <Image
                    width={100}
                    height={100}
                    src={WelcomeImage}
                    alt='Welcome image'
                    className='w-full h-full size-fit'
                />
            </div>


            {/* Form */}
            <div className='flex-1 flex flex-col gap-6 pt-20 px-20'>

                {/* Qodum logo */}
                <div className='w-full flex justify-center'>
                    <Image
                        width={250}
                        height={250}
                        src={QodumLogo}
                        alt='Qodum logo'
                    />
                </div>


                {/* Sign in heading */}
                <h2 className='text-2xl font-semibold mt-6'>Sign in to your account</h2>


                {/* Welcom paragraph */}
                <p className='text-sm text-hash-color'>Welcom back! Please enter your username and password.</p>


                {/* Username */}
                <div className='flex flex-col'>
                    <p className='text-sm text-[#726E71]'>Username</p>
                    <Input
                        value={username}
                        onChange={(e:any) => {
                            setUsername(e.target.value);
                            setErrors({...errors, username:''});
                        }}
                        placeholder='Please enter username'
                        className='text-[11px] pl-3 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-full placeholder:text-hash-color'
                    />
                    {errors.username && <p className='text-xs text-red-600'>{errors.username}</p>}
                </div>


                {/* Password */}
                <div className='flex flex-col'>
                    <p className='text-sm text-[#726E71]'>Password</p>
                    <Input
                        type='password'
                        value={password}
                        onChange={(e:any) => {
                            setPassword(e.target.value);
                            setErrors({...errors, password:''});
                        }}
                        placeholder='Please enter password'
                        className='text-[11px] pl-3 bg-[#fff] border-[0.5px] border-[#E4E4E4] rounded-full placeholder:text-hash-color'
                    />
                    {errors.password && <p className='text-xs text-red-600'>{errors.password}</p>}
                </div>


                <span
                    onClick={submitHandler}
                    className='flex items-center justify-center px-4 h-10 mt-8 text-lg text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                >
                    {isLoading ? (
                        <LoadingIcon />
                    ) : (
                        'Login'
                    )}
                </span>

            </div>

        </div>
    );
};





// Export
export default SignIn;