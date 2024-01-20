import React, {useCallback, useState} from 'react'
import { FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, SetFileUrl] = useState('');

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles);
        SetFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })
    
    return (
        <div className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer' {...getRootProps()}>
        <input className='cursor-pointer  ' {...getInputProps()} />
        {
            fileUrl ? (
                <>
                    <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                        <img src={fileUrl} alt="image" className='file_uploader-img' />
                    </div>
                    <p className='file_uploader-label object-center'>Click or drag photo to replace</p>
                </>
            ) : (
                <div className="file_uploader-box">
                    <img src="/assets/icons/file-upload.svg" alt="upload" width={96} height={77} />
                    <h3 className='base-medium text-light-2 mb-2 mt-6' >Drag photo here</h3>
                    <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
                    <Button className='shad-button_dark_4'>Select from computer</Button>
                </div>    
            )
        }
      </div>
    )
}

export default FileUploader