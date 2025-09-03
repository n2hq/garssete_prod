import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbCancel } from 'react-icons/tb'
import { config } from '~/lib/lib'
import { ProductDisplayGalleryProps, ProductDisplayProps, ProductType } from '~/lib/types'

import { useProductSliderContext } from '~/context/ProductSliderContext'

const ProductGallery = (productGallery: ProductDisplayGalleryProps) => {
    const [showProductGallerySlider, setShowProductGallerySlider] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const productSlider = useProductSliderContext()


    const showProductSlider = (currentSlide: number) => {
        productSlider.setDialog(true)
        productSlider.setSelectedSlide(currentSlide + 1)
        productSlider.setGallery(productGallery.products)
        productSlider.setListing(productGallery.listing)
    }
    return (
        <div>

            <div className={`fixed bg-black/20 w-screen h-screen top-0 left-0 z-[3000]`}>
                <div className={` w-full h-full flex place-content-center place-items-center`}
                    onMouseDown={(e) => productGallery.setGalleryDialog(false)}
                >
                    {/** gallery body */}
                    <div className={`max-w-[90%] w-full mx-auto bg-white h-[80%] rounded-lg`}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/** gallery header */}
                        <div className={` border-b px-5 py-2`}>
                            <div className={`flex place-content-between place-items-center`}>
                                <div className={`text-[17px] font-semibold`}>
                                    Products for {productGallery.listing.title}
                                </div>
                                <div className={`text-[25px] rounded-full border flex place-content-center place-items-center w-[35px] h-[35px] hover:bg-gray-100 hover:cursor-pointer`}
                                    onMouseDown={() => productGallery.setGalleryDialog(false)}
                                >
                                    <IoClose />
                                </div>
                            </div>
                        </div>

                        {/** gallery scrollable */}
                        <div className={` w-full h-[85%] overflow-auto`}>
                            <div className={`w-full h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5 px-5 py-5`}>
                                {
                                    productGallery.products.map((product: ProductType, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`border rounded-md p-3 block hover:shadow-md hover:cursor-pointer`}
                                                onClick={() => { showProductSlider(index) }}
                                            >
                                                <div className={` w-full h-[150px] relative `}>
                                                    <img
                                                        src={config.IMG_BASE_URL + product.product_image_url}
                                                        alt=""
                                                        className={` object-cover w-full h-full`}
                                                    />
                                                </div>
                                                <div className={`mt-3 text-center line-clamp-2 border-t pt-2 h-[50px] leading-[1.4em]`}>
                                                    {
                                                        product?.product_title
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductGallery
