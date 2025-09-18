import React, { useRef, useState } from 'react'
import { BiSolidUser, BiUser, BiUserCircle, BiUserX } from 'react-icons/bi'
import { MdEditSquare } from 'react-icons/md'
import { useNotification } from '~/context/NotificationContext'
import { useOperation } from '~/context/OperationContext'
import { config, headers } from '~/lib/lib'

const ImgComponentAlt = ({ user, userProfileImageData }: any) => {

    const notification = useNotification()

    let imgconst = ""

    if (userProfileImageData?.image_url) {
        imgconst = config.IMG_BASE_URL + userProfileImageData.image_url
    }


    const [imgSrc, setImgSrc] = useState<any>(imgconst)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [working, setWorking] = useState<boolean>(false)

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
        ///notification.notify('Working...')
        showOperation('processing')
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isImgSelected) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('guid', user.user_guid)



            const endpoint = "/user_profile_pic_upload"
            //const url = IMG_BASE_URL + endpoint
            const url = config.IMG_BASE_URL + endpoint


            try {
                const response = await fetch(url, {
                    method: "POST",

                    body: formData
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

            } catch (error) {
                showError('Error', 'Image upload failed.')
                completeOperation()
                //return undefined
            } finally {
                setWorking(false)
            }
        } else {
            //notification.alertCancel('', 'Please select an image to continue.')
            //alert('Please select an image to continue.')
            showError('Error', 'Please select an image to continue')
            completeOperation()
            setWorking(false)
        }
    }


    return (
        <div className={`w-[50%] mx-auto flex flex-col 
        place-content-center place-items-center`}>
            <div className={`relative bg-black w-[150px] 
                h-[150px] z-40 rounded-full overflow-hidden
                flex place-content-center place-items-center border-[3px] border-white`}>

                {
                    imgSrc !== "" ?
                        <img
                            src={imgSrc}
                            alt=""
                            className={` object-cover w-full h-full z-0 absolute ${imgSrc === "" ? 'bg-transparent' : 'bg-white'}`}
                        /> :
                        <BiSolidUser className={`object-cover w-[70%] h-[70%]`} />
                }

                <input type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    className=' hidden'
                    onChange={handleFileChange}
                />
                <div
                    className={`flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 
                                 top-0 object-cover
                                 text-white/80 `}
                    onMouseDown={handleImageClick}
                >
                    <div className={`w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out bg-white/50`}>
                        <MdEditSquare className=' text-[30px]' />
                    </div>
                </div>
            </div>
            <div className={` flex flex-col place-items-center 
                place-content-center mt-2 `}>
                <button
                    className={`
                        ${working ? 'bg-gray-200 cursor-default' : 'bg-blue-100'}  
                        w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out
                        px-5`}
                    onMouseDown={handleUpload}
                    disabled={working}
                >
                    {
                        working ? 'Uploading...' : 'Submit'
                    }
                </button>
            </div>
        </div>
    )
}

export default ImgComponentAlt
