import React, { useEffect, useRef, useState } from 'react'
import { MdEditSquare } from 'react-icons/md'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'
import { config } from '~/lib/lib'

const ProfileBg = ({ listing, user, userProfileBgData }: any) => {

    const [working, setWorking] = useState<boolean>(false)
    const [imgconst, setImgconst] = useState('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const notification = useNotification()
    const [selectedFile, setSelectedFile] = useState<any>(null)

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

    useEffect(() => {
        if (userProfileBgData?.image_url) {
            setImgconst(config.IMG_BASE_URL + userProfileBgData?.image_url)
        }
    }, [])



    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {

            const imageUrl = URL.createObjectURL(file)
            setImgconst(imageUrl)
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


            const endpoint = "/user_profile_bg_upload"
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
                        console.log(data.message)
                        showError('Error', data.message)
                        completeOperation()
                    })

                } else {
                    //notification.alertReload('', 'Image uploaded successfully!')
                    try {
                        showSuccess('Success', 'Image saved.')
                    } finally {
                        completeOperation()
                    }
                }

            } catch (error: any) {
                console.log(error)
                showError('Error', 'Image save failed')
                completeOperation()
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
            <div className={`bg-gray-700 w-full h-[200px] relative shadow-lg text-white flex place-items-center place-content-center flex-col`}>
                {imgconst === "" && 'Add Photo (1920x200)'}
                {
                    imgconst &&
                    <img
                        src={imgconst}
                        alt=""
                        className={`object-cover w-full h-full absolute`}
                    />
                }

                <input type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    className=' hidden'
                    onChange={handleFileChange}
                />
            </div>



            <div className={` flex place-items-center gap-1.5
                place-content-center top-[5px] right-[5px] w-fit z-[120] absolute`}>

                <button
                    className={`bg-white  w-full py-[4px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out px-[8px] `}
                    disabled={working}
                    onMouseDown={handleImageClick}
                >
                    Browse
                </button>

                <button
                    className={`bg-white  w-full py-[3px] rounded-[8px] border-[1px] border-gray-200 px-[8px]
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

export default ProfileBg
