import React, { useEffect, useRef, useState } from 'react'
import { MdEditSquare } from 'react-icons/md'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'
import { config, headers } from '~/lib/lib'

const BgComponent = ({ listing, user, businessProfileBgData }: any) => {


    let imgconst = ""

    if (businessProfileBgData.image_url) {
        imgconst = config.IMG_BASE_URL + businessProfileBgData.image_url
    }


    const [imgSrc, setImgSrc] = useState<any>(imgconst)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

    const { showOperation, showSuccess, showError, showWarning, showInfo, completeOperation } = useOperation();

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {

            const imageUrl = URL.createObjectURL(file)
            setImgSrc(imageUrl)
            setSelectedFile(file)
            setIsImageSelected(true)
        }
    }

    const handleUpload = async () => {
        setWorking(true)
        //notification.notify('Working...')
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const formData = new FormData();

        if (isImgSelected) {

            formData.append('file', selectedFile);
            formData.append('guid', user.user_guid)
            formData.append('bid', listing.gid)


            const endpoint = "/business_profile_bg_upload"
            const url = config.IMG_BASE_URL + endpoint

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"
                    },
                    body: (formData)
                })

                if (!response.ok) {
                    let error = response.json().then((data) => {
                        //notification.alertCancel('', data.message)
                        showError('Error', data.message)
                        completeOperation()
                    })

                } else {
                    //notification.alertReload('', 'Image uploaded successfully!')
                    showSuccess('Success', 'Image uploaded.')
                    completeOperation()
                }

            } catch (error: any) {
                console.log(error.message)
                showError('Error', 'Image upload failed.')
                completeOperation()
                //return undefined
            } finally {
                setWorking(false)
            }
        } else {
            //notification.alertCancel('', 'Please select an image to continue.')
            showError('Error', 'Please select an image to continue.')
            completeOperation()
            setWorking(false)
        }
    }


    return (
        <div className={`relative`}>
            <div className='relative bg-gray-600 w-full h-[200px] z-[40] shadow-lg'>
                {
                    imgSrc &&
                    <img
                        src={imgSrc}
                        alt="Click to upload"
                        className=' object-cover w-full h-full  absolute z-[40]'
                    />
                }
                <input type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    className=' hidden'
                    onChange={handleFileChange}
                />

            </div>
            <div className={` flex place-items-center gap-3
                place-content-center bottom-[5px] right-[5px] w-fit z-[120] absolute`}>

                <button
                    className={`bg-white  w-full py-[4px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out px-[8px] `}
                    disabled={working}
                    onMouseDown={handleImageClick}
                >
                    Browse
                </button>


                <button
                    className={` bg-white  w-full py-[3px] rounded-[8px] border-[1px] border-gray-200 px-[8px]
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`}
                    onMouseDown={handleUpload}
                    disabled={working}
                >
                    {
                        working ? 'Uploading...' : 'Upload'
                    }
                </button>
            </div>
        </div>
    )
}

export default BgComponent