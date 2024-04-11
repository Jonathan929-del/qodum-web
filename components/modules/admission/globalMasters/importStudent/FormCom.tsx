'use client';
// Imports
import * as XLSX from 'xlsx';
import {useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {uploadStudent} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({}:any) => {


    // Toast
    const {toast} = useToast();


    // Upload method
    const [uploadMethod, setUploadMethod] = useState('Excel To Online');


    // Selected file
    const [file, setFile] = useState(null);


    const excelToJson = (file:any) => {
        return new Promise((resolve, reject) => {
            try{
                const reader = new FileReader();

                reader.onload = (e:any) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const jsonData = {};

                workbook.SheetNames.forEach((sheetName) => {
                    const worksheet = workbook.Sheets[sheetName];
                    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    jsonData[sheetName] = sheetData;
                });
        
                resolve(jsonData);
                };
        
                reader.readAsArrayBuffer(file);
            }catch (error){
                reject(error);
            };
        });
    };
  

    // Handle upload
    const handleUpload = async () => {
        try{

            if(!file){
                toast({title:'Please selected file', variant:'alert'});
                return;  
            };
            
            const data = await excelToJson(file);
            // await uploadStudent(formData);
            toast({title:'File uploaded successfully'});

        }catch (error) {
            toast({title:'Error uploading file', variant:'error'});
        };
    };


    return (
        <div className='w-[90%] max-w-[800px] flex flex-col items-center pb-6 rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Upload Data Option</h2>


            <div className='relative w-full flex flex-col pt-4 gap-3 items-center px-2 sm:px-4'>


                {/* Upload method */}
                <RadioGroup
                    className='w-full flex flex-row items-center justify-center gap-4 pb-2 border-b-[0.5px] border-[#ccc]'
                    defaultValue={uploadMethod}
                >
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='Excel To Online' id='Excel To Online' onClick={() => setUploadMethod('Excel To Online')} checked={uploadMethod === 'Excel To Online'}/>
                        <Label htmlFor='Excel To Online' className='text-xs'>Excel To Online</Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='Offline To Online' id='Offline To Online' onClick={() => setUploadMethod('Offline To Online')} checked={uploadMethod === 'Offline To Online'}/>
                        <Label htmlFor='Offline To Online' className='text-xs'>Offline To Online</Label>
                    </div>
                </RadioGroup>


                {/* Uploading */}
                {uploadMethod === 'Excel To Online' ? (
                    <div className='w-full flex flex-row items-center justify-center gap-4 pt-6'>
                        {/* Student Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Student Details:</p>
                            <input
                                type='file'
                                accept='.xlsx, .xls'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span
                                onClick={handleUpload}
                                className='flex items-center justify-center px-4 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Save
                            </span>
                        </div>

                        {/* Staff Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Staff Details:</p>
                            <p>Choose file</p>
                            <span
                                className='flex items-center justify-center px-4 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Save
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className='w-full flex flex-row items-center justify-center gap-4'>
                        {/* Staff Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Staff Details:</p>

                            <div className='flex flex-col items-start justify-center max-w-[200px]'>
                                <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>DB Name</p>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <Input
                                        className='flex flex-row h-8 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>
                            <span
                                className='flex items-center justify-center px-4 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Import Staff
                            </span>
                        </div>
                    </div>
                )}




            </div>
        </div>
    );
};





// Export
export default FormCom;