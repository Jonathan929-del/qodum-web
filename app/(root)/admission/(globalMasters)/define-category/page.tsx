'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchCategories} from '@/lib/actions/admission/globalMasters/category.actions';
import FormCom from '@/components/modules/admission/globalMasters/defineCategory/FormCom';
import ViewCom from '@/components/modules/admission/globalMasters/defineCategory/ViewCom';





// Main function
const page = () => {


    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Category
    const [categories, setCategories] = useState([{}]);


    // Update Health Master
    const [updateCategory, setUpdateCategory] = useState({
        id:'',
        isDeleteClicked:false,
        category_name:'',
        is_default:false
    });

    
    // Use effect
    useEffect(() => {
        const categoriesFetcher = async () => {

            const res = await fetchCategories();

            setCategories(res);
        };
        categoriesFetcher();
    }, [isViewOpened, updateCategory]);


    return (
        <div className='h-screen flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            {
                isViewOpened ? (
                    <ViewCom
                        categories={categories}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateCategory={setUpdateCategory}
                    />
                ) : (
                    <FormCom
                        categories={categories}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateCategory={updateCategory}
                        setUpdateCategory={setUpdateCategory}
                    />
                )
            }
        </div>
    );
};





// Export
export default page;