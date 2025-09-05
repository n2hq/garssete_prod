import React, { useEffect, useRef, useState } from 'react'
import { MdEditSquare } from 'react-icons/md'
import { useNotification } from '~/context/NotificationContext'
import { config, headers } from '~/lib/lib'

const BgComponent = ({ listing, user, businessProfileBgData }: any) => {


    let imgconst = ""

    if (businessProfileBgData.image_url) {
        imgconst = config.IMG_BASE_URL + businessProfileBgData.image_url
    } else {
        imgconst = '/images/placeholder-icon.webp'
    }


    const [imgSrc, setImgSrc] = useState<any>(imgconst)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [working, setWorking] = useState<boolean>(false)
    const notification = useNotification()

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
        notification.notify('Working...')
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
                        notification.alertCancel('', data.message)
                    })

                } else {
                    notification.alertReload('', 'Image uploaded successfully!')
                }

            } catch (error) {
                return undefined
            } finally {
                setWorking(false)
            }
        } else {
            notification.alertCancel('', 'Please select an image to continue.')
            setWorking(false)
        }
    }


    return (
        <div className={`relative`}>
            <div className='relative bg-blue-100 w-full h-[150px] z-[40]  overflow-hidden'>
                <img
                    src={imgSrc}
                    alt="Click to upload"
                    className=' object-cover w-full h-full  absolute z-[40]'
                />
                <input type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    className=' hidden'
                    onChange={handleFileChange}
                />
                <div
                    className={`flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-[60] top-0 object-cover
                                 text-white/80 `}
                    onMouseDown={handleImageClick}
                >
                    <div className={`w-[70px] h-[70px] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    bg-blue-300/50
                                    rounded-full transition duration-300 ease-in-out`}>
                        <MdEditSquare className=' text-[30px]' />
                    </div>
                </div>
            </div>
            <div className={` flex flex-col place-items-center 
                place-content-center bottom-[5px] right-[5px] w-[100px] z-[120] absolute`}>
                <button
                    className={`${working ? 'bg-gray-200 cursor-default' : 'bg-blue-100'}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
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