import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { config, headers } from "~/lib/lib";
import { useNotification } from "./NotificationContext";
import { useOperation } from "./OperationContext";


const AddProductDialogContext = createContext<any | null>(null)

export function useAddProductDialogContext() {
    const context = useContext(AddProductDialogContext)
    /* if (!context) {
        throw new Error("useEditPhotoDialogContext must be used within an EditPhotoDialogProvider")
    } */
    return context
}

export function AddProductDialogProvider({ children }: any) {

    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [productTitle, setProductTitle] = useState<any>(null)
    const [productLink, setProductLink] = useState<any>(null)
    const [productDescription, setProductDescription] = useState<any>(null)

    const [formData, setFormdata] = useState<any | null>(null)

    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const notification = useNotification()

    const { showOperation, showError, completeOperation, showSuccess } = useOperation()

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
        setWorking(false)
    }

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

    const handleUpdate = async () => {
        //notification.notify()
        showOperation('processing')
        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        let productTitle = document.getElementById("product_title") as HTMLInputElement
        let productDescription = document.getElementById("product_description") as HTMLInputElement
        let productLink = document.getElementById("product_link") as HTMLInputElement

        const formData = new FormData();

        if (isImgSelected) {

            formData.append('file', selectedFile);
        }

        formData.append('guid', userGuid)
        formData.append('bid', businessGuid)
        formData.append('product_title', productTitle.value || "")
        formData.append('product_description', productDescription.value || "")
        formData.append('product_link', productLink.value || "")



        //const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = "/business_gallery_product_upload"
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
                    //notification.alert('', data.message)
                    console.log(data.message)
                    showError('Error', `Failed to add product: ${data.message}`)
                    completeOperation()
                })

            } else {
                ///notification.alert('Product Saved', 'Product saved successfully!')
                try {
                    showSuccess('Success', `Product saved.`)
                    completeOperation()
                } finally {
                    window.location.reload()
                }
            }

        } catch (error) {
            return undefined
        } finally {
            setWorking(false)

        }

    }

    const deleteProduct = async (userGuid: string, businessGuid: string, imageGuid: string) => {
        const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
        const endpoint = `/delete_business_gallery_pic`
        const url = IMG_BASE_URL + endpoint

        const data = {
            guid: userGuid,
            bid: businessGuid,
            image_guid: imageGuid
        }

        setWorking(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                let error = response.json().then((data) => {
                    notification.alert(data.message)
                })

            } else {
                notification.alertReload('', 'Image deleted successfully!')
            }

        } catch (error: any) {
            return alert(error.message)
        } finally {
            setWorking(false)

        }
    }


    let vals = {
        dialog, setDialog,
        handleCloseDialog,
        imgSrc, setImgSrc,
        userGuid, setUserGuid,
        businessGuid, setBusinessGuid,
        isImgSelected, setIsImageSelected,
        selectedFile, setSelectedFile,
        productTitle, setProductTitle,
        productDescription, setProductDescription,
        productLink, setProductLink,
        deleteProduct
    }

    return (
        <AddProductDialogContext.Provider value={vals}>
            {
                dialog &&
                <div
                    onMouseDown={(e) => setDialog(false)}
                    className={`fixed w-screen h-screen z-[3100] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`}

                >
                    <div className={`relative max-w-[90%] w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] mx-auto `}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className={`w-full h-full overflow-y-auto`}>
                            <div className={`relative w-full h-[75%] bg-black`}>
                                <img
                                    src={imgSrc}
                                    alt=""
                                    className={`object-scale-down w-full h-full`}
                                />
                                <input type="file"
                                    accept='image/*'
                                    ref={fileInputRef}
                                    className='hidden'
                                    onChange={handleFileChange}
                                />

                                <div
                                    className={`flex place-content-center place-items-center
                                        bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                        text-white/80 `}
                                    onMouseDown={handleImageClick}
                                >
                                    <div className={`w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`}>
                                        <MdEditSquare className=' text-[30px]' />
                                    </div>
                                </div>
                            </div>

                            <div className={`h-[25%] space-y-1`}>
                                <div className={`flex mb-1 flex-col mx-3 `}>
                                    <div className={`text-[14px] font-semibold py-1`}>Enter product title</div>
                                    <input
                                        onChange={(e) => setProductTitle(e.target.value)}
                                        id='product_title'
                                        value={productTitle || ""}
                                        placeholder={`Enter product title.`}
                                        className={`w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`}
                                    />
                                </div>

                                <div className={`flex mb-1 flex-col mx-3 `}>
                                    <div className={`text-[14px] font-semibold py-1`}>Enter product description</div>
                                    <textarea
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        id='product_description'
                                        value={productDescription || ""}
                                        placeholder={`Enter product description.`}
                                        className={`w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`}
                                    />
                                </div>


                                <div className={`flex mb-1 flex-col mx-3 `}>
                                    <div className={`text-[14px] font-semibold py-1`}>Enter product link</div>
                                    <input
                                        onChange={(e) => setProductLink(e.target.value)}
                                        id='product_link'
                                        value={productLink || ""}
                                        placeholder={`Enter product link.`}
                                        className={`w-full border-[1px] border-gray-700 bg-gray-100 px-3 py-4 outline-none rounded-lg`}
                                    />
                                </div>




                                <div className={`flex place-content-end px-3 gap-2`}>
                                    <button
                                        onMouseDown={() => handleCloseDialog()}
                                        className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => handleUpdate()}
                                        className={`bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                                    >
                                        {
                                            working ? 'Working...' : 'Submit'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }
            {children}
        </AddProductDialogContext.Provider>
    )
}
