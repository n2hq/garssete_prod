import React, { useState } from 'react'
import ComponentTitle from '../ComponentTitle'
import { ProductDisplayProps, ProductType } from '~/lib/types'
import { config } from '~/lib/lib'
import { NavLink } from '@remix-run/react'
import { FcGallery } from 'react-icons/fc'
import { MdBrowseGallery } from 'react-icons/md'
import ProductGallery from './ProductGallery'
import { ProductSliderProvider } from '~/context/ProductSliderContext'



const Products = (products: ProductDisplayProps) => {
    const [galleryDaialog, setGalleryDialog] = useState(false)

    const showGallery = () => {
        setGalleryDialog(true)
    }

    return (
        <ProductSliderProvider>
            <div className='mt-12'>
                <ComponentTitle title='Products' />
                {
                    galleryDaialog &&
                    <ProductGallery
                        products={products.products}
                        setGalleryDialog={setGalleryDialog}
                        listing={products.listing}
                    />
                }
                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}>
                    {
                        products.products?.map((product: ProductType, index: number) => {
                            return (
                                <div key={index}>
                                    <a href={product?.product_link} target='product'>
                                        <div className={`border rounded-md p-3 h-[230px] block hover:shadow-md`}>
                                            <div className={` w-full h-[150px] relative `}>
                                                <img
                                                    src={config.IMG_BASE_URL + product.product_image_url}
                                                    alt=""
                                                    className={` object-cover w-full h-full`}
                                                />
                                            </div>
                                            <div className={`mt-3 text-center line-clamp-2 border-t pt-2 leading-[1.4em]`}>
                                                {
                                                    product?.product_title
                                                }


                                            </div>
                                        </div>
                                    </a>


                                </div>
                            )
                        })

                    }

                    <div
                        key={products.products.length + 1}
                        onClick={() => showGallery()}
                    >
                        <div className={`border rounded-md p-3 hover:bg-gray-50 h-[230px] flex place-items-center place-content-center flex-col bg-gray-200 cursor-pointer min-w-full`}>

                            <MdBrowseGallery size={22} />
                            <div>Product Gallery</div>
                        </div>
                    </div>
                </div>
            </div>
        </ProductSliderProvider>
    )
}

export default Products
