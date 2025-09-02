import React, { useEffect, useState } from 'react'
import { BiEdit, BiEditAlt } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import Carousel from './carousel/Carousel'
import GalleryItemMenu from './GalleryItemMenu'
import { config, getYoutubeId } from '~/lib/lib'
import { GalleryItemProps, ProductItemProps } from '~/lib/types'

const GalleryItem = ({
    showCarousel,
    product,
    itemIndex,
    userGuid,
    businessGuid
}: ProductItemProps) => {
    const [menu, setMenu] = useState<boolean>(false)
    const [videoId, setVideoId] = useState<string | null>(null)

    const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL

    let imgconst = ""

    if (product.product_image_url) {
        imgconst = IMG_BASE_URL + product.product_image_url
        //alert(imgconst)
    } else {
        imgconst = 'https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg'
    }

    const [imgSrc, setImgSrc] = useState<any>(imgconst)

    const showMenu = () => {
        setMenu(true)
    }

    const hideMenu = async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setMenu(false)
    }

    useEffect(() => {
        if (product) {
            const videoId = getYoutubeId(product?.product_link)
            setVideoId(videoId)
        }
    }, [product])

    return (
        <div className='z-0'>
            <div
                className={`border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`}
            >

                {/** edit button */}
                <button
                    onMouseDown={showMenu}
                    onBlur={hideMenu}
                    className={`w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`}>
                    <BiEditAlt className={`text-[20px]`} />
                </button>


                <div
                    onMouseDown={(e) => showCarousel(itemIndex)}
                    className={`relative h-[100px] md:h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `}>
                    <img
                        src={config.IMG_BASE_URL + product?.product_image_url}
                        alt=""
                        className={`object-cover w-full h-full -z-40
                        `}
                    />
                </div>
                {
                    (product?.product_title).length > 0 &&
                    <div className={`text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px] line-clamp-2`}>
                        {product?.product_title}
                    </div>
                }

                <GalleryItemMenu
                    product={product}
                    menu={menu}
                    userGuid={userGuid}
                    businessGuid={businessGuid}
                />


            </div>

        </div>
    )
}

export default GalleryItem
