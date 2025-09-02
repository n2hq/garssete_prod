import React, { useState } from 'react'
import GalleryItem from './GalleryItem'
import Carousel from './carousel/Carousel'
import AddPhoto from './AddProduct'
import AddPhotoDialog from './AddVideoDialog'
import { useSliderContext } from '~/context/SliderContext'
import { useVideoSliderContext } from '~/context/VideoSliderContext'
import { AddVideoType, ListingType, ProductGalleryProps, ProductType, VideoGalleryProps } from '~/lib/types'
import { useProductSliderContext } from '~/context/ProductSliderContext'



const ProductGallery = ({ productGallery, userGuid, businessGuid, listing }: ProductGalleryProps) => {
    const [overlay, setOverlay] = useState(false)
    const [selectedSlide, setSelectedSlide] = useState<any>(0)
    const slider = useProductSliderContext()

    const handleClose = () => { setOverlay(false) }
    const handleOpen = () => { setOverlay(true) }

    const showCarousel = (index: number) => {
        //setSelectedSlide(index)
        //setOverlay(true)
        slider.setDialog(true)
        slider.setSelectedSlide(index + 1)
        slider.setGallery(productGallery)
        slider.setListing(listing)
    }




    return (
        <div className={``}>
            <div className={` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`}>
                {
                    productGallery?.map((product: ProductType, index: number) => {
                        return (
                            <div key={index} className='z-0'>
                                <GalleryItem
                                    showCarousel={showCarousel}
                                    product={product}
                                    itemIndex={index}
                                    userGuid={userGuid}
                                    businessGuid={businessGuid}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <Carousel
                overlay={overlay}
                setOverlay={setOverlay}
                selectedSlide={selectedSlide + 1}
                handleClose={handleClose}
                gallery={productGallery}
            />


        </div>
    )
}

export default ProductGallery
