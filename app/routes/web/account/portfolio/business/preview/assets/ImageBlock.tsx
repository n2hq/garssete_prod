import React, { useEffect, useState } from 'react'
import { useGallery } from '~/context/GalleryContext';
import { useSliderContext } from '~/context/SliderContext';
import { config } from '~/lib/lib'

type Image = {
    id: number;
    image_url: string;
    alt: string;
};

type MasonryProps = {
    images: Image[];
    listing: any
};

const ImageBlock = ({ images, listing }: any) => {
    const [items, setItems] = useState<Image[]>([]);
    const slider = useSliderContext()
    const gallery = useGallery()

    const [placeholder, setPlaceholder] = useState('images/abstract_placeholder.jpg')
    const [shortGallery, setShortGallery] = useState<Image[]>([])

    useEffect(() => {
        let shortGallery = [...items]

        if (images) {
            images.map((image: any, index: number) => {
                if (index + 1 < 12) {
                    shortGallery.push(image)
                }

            })

            setShortGallery(shortGallery)
        }
    }, [images])

    const showCarousel = (index: number) => {
        //alert(images.length)
        //slider.setSelectedSlide(1)
        //setOverlay(true)
        if (index < images.length) {
            slider.setDialog(true)
            slider.setSelectedSlide(index + 1)
            slider.setGallery(images)
            slider.setListing(listing)
        }
    }

    const showGallery = (index: number) => {
        gallery.setShow(true)
        gallery.setGallery(images)
        gallery.setListing(listing)
    }



    return (
        <div className='w-full h-auto mb-[32px] flex flex-col gap-2'>
            <div className={`h-[350px]
                grid grid-cols-12 gap-[7px]`}>
                <div className={`col-span-7 bg-black
                    row-span-2 rounded-xl overflow-hidden
                    relative cursor-pointer`}
                    onMouseDown={(e) => showCarousel(0)}
                >
                    <img
                        src={
                            images[0]?.image_url !== undefined && images[0]?.image_url !== null ?
                                config.IMG_BASE_URL + images[0]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`col-span-5 bg-black
                    rounded-xl overflow-hidden h-full
                    relative cursor-pointer`}
                    onMouseDown={(e) => showCarousel(1)}
                >
                    <img
                        src={
                            images[1]?.image_url !== undefined && images[1]?.image_url !== null ?
                                config.IMG_BASE_URL + images[1]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`col-span-5 bg-black
                    rounded-xl overflow-hidden h-full
                    relative cursor-pointer`}
                    onMouseDown={(e) => showCarousel(2)}
                >
                    <img
                        src={
                            images[2]?.image_url !== undefined && images[2]?.image_url !== null ?
                                config.IMG_BASE_URL + images[2]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
            </div>

            <div className={`grid grid-cols-5 gap-[7px] mt-[2px]`}>
                <div className={`rounded-xl overflow-hidden
                    relative cursor-pointer h-[100px] bg-black`}
                    onMouseDown={(e) => showCarousel(3)}
                >
                    <img
                        src={
                            images[3]?.image_url !== undefined && images[3]?.image_url !== null ?
                                config.IMG_BASE_URL + images[3]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`rounded-xl overflow-hidden
                    relative cursor-pointer h-[100px] bg-black`}
                    onMouseDown={(e) => showCarousel(4)}
                >
                    <img
                        src={
                            images[4]?.image_url !== undefined && images[4]?.image_url !== null ?
                                config.IMG_BASE_URL + images[4]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`rounded-xl overflow-hidden
                    relative bg-black cursor-pointer h-[100px]`}
                    onMouseDown={(e) => showCarousel(5)}
                >
                    <img
                        src={
                            images[5]?.image_url !== undefined && images[5]?.image_url !== null ?
                                config.IMG_BASE_URL + images[5]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`rounded-xl overflow-hidden
                    relative bg-black cursor-pointer h-[100px]`}
                    onMouseDown={(e) => showCarousel(6)}
                >
                    <img
                        src={
                            images[6]?.image_url !== undefined && images[6]?.image_url !== null ?
                                config.IMG_BASE_URL + images[6]?.image_url :
                                placeholder
                        }
                        alt=""
                        className={`object-cover h-full w-full`}
                    />
                </div>
                <div className={`rounded-xl overflow-hidden
                    relative bg-black text-white cursor-pointer
                    flex place-content-center place-items-center h-[100px]`}
                    onMouseDown={(e) => showGallery(0)}
                >
                    {images?.length > 7 ? `+${images.length - 7}` : 'View all'}
                </div>
            </div>
        </div>
    )
}

export default ImageBlock
