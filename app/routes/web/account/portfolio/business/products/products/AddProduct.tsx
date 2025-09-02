import React, { useRef, useState } from 'react'
import AddPhotoDialog from './AddVideoDialog'
import { useAddPhotoDialogContext } from '~/context/AddPhotoDialogContext'
import { useAddVideoDialogContext } from '~/context/AddVideoDialogContext'
import { useAddProductDialogContext } from '~/context/AddProductDialogContext'

const AddProduct = ({ userGuid, businessGuid }: any) => {

    const addProduct = useAddProductDialogContext()

    const handleOpenDialog = () => {
        addProduct.setDialog(true)
        addProduct.setUserGuid(userGuid)
        addProduct.setBusinessGuid(businessGuid)
    }





    return (
        <div className={`mb-2`}>
            <button
                onMouseDown={handleOpenDialog}
                className={` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`}>
                Add Product
            </button>
        </div>
    )
}

export default AddProduct
