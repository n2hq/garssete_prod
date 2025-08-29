import React, { useRef, useState } from 'react'
import AddPhotoDialog from './AddVideoDialog'
import { useAddPhotoDialogContext } from '~/context/AddPhotoDialogContext'
import { useAddVideoDialogContext } from '~/context/AddVideoDialogContext'

const AddVideo = ({ userGuid, businessGuid }: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState(false)
    const [overlay, setOverlay] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const addVideo = useAddVideoDialogContext()

    const handleOpenDialog = () => {
        addVideo.setDialog(true)
        addVideo.setUserGuid(userGuid)
        addVideo.setBusinessGuid(businessGuid)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0]

            if (file) {
                const imageUrl = URL.createObjectURL(file)
                setImgSrc(imageUrl)
                setSelectedFile(file)
                setIsImageSelected(true)

                addVideo.setDialog(true)
                addVideo.setImgSrc(imageUrl)
                addVideo.setSelectedFile(file)
                addVideo.setIsImageSelected(true)
                addVideo.setUserGuid(userGuid)
                addVideo.setBusinessGuid(businessGuid)
                //setDialog(true)


            }
        } finally {
            event.target.value = ""
        }


    }

    const handleImageClick = () => {
        fileInputRef.current?.click()

    }

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)

    }

    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleOpenDialog}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Video
            </button>
            <input type="file"
                accept='image/*'
                ref={fileInputRef}
                className=' hidden'
                onChange={handleFileChange}
            />

            {/* <AddPhotoDialog
                dialog={dialog}
                setDialog={setDialog}
                imgSrc={imgSrc}
                handleCloseDialog={handleCloseDialog}
                userGuid={userGuid}
                businessGuid={businessGuid}
                isImgSelected={isImgSelected}
                setIsImageSelected={setIsImageSelected}
                selectedFile={selectedFile}
            /> */}
        </div>
    )
}

export default AddVideo
