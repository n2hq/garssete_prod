import React from 'react'
import { BiBuilding, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsBank, BsInstagram, BsLinkedin, BsPinterest, BsTwitterX, BsYoutube } from 'react-icons/bs'
import { CgFacebook, CgTwitter } from 'react-icons/cg'
import { FaFacebook, FaLinkedinIn, FaYoutubeSquare } from 'react-icons/fa'
import { GrYoutube } from 'react-icons/gr'
import RatingBox from './RatingBox'
import RatingText from './RatingText'


const Card = ({ listing }: any) => {
    return (
        <div className={`bg-white w-full h-auto md:rounded-md shadow-md overflow-hidden border  hover:bg-blue-50 hover:shadow-lg`}>
            {/** header */}
            <div className={`bg-gray-50/30 py-3 px-4 border-b`}>

                <a href="/">
                    <div className={`flex place-content-between`}>
                        {/** left */}
                        <div className={`flex place-items-center gap-2`}>
                            <div className={`h-[40px] w-[40px] rounded-full bg-black`}>

                            </div>
                            <div className={`-space-y-1`}>
                                <div className={`text-black text-lg font-semibold`}>
                                    {listing?.title}
                                </div>
                                <div className={`text-[12px] text-gray-500  capitalize`}>
                                    {listing?.category}
                                </div>
                            </div>
                        </div>

                        {/** right */}
                        <div className={`flex place-items-center`}>
                            <div className={`font-bold rounded-sm border px-3 py-[2px]`}>View</div>
                        </div>
                    </div>
                    <div className={`mt-[8px] text-[14px] text-gray-500 leading-[1.3em] line-clamp-3`}>
                        {
                            listing?.short_description
                        }
                    </div>
                </a>
            </div>


            {/** body */}
            <div>
                <a href="">
                    <div className={` h-auto flex place-content-between py-0 `}>
                        {/** left */}
                        <div className={`flex place-items-start w-[60%] flex-col py-[6px] pl-4`}>
                            <div className={`flex place-items-center  w-full gap-x-2`}>
                                <div className={`text-[19px] flex`}>
                                    <RatingBox rating={listing?.average_rating} />
                                </div>
                                <div className={`text-[13px] pt-[0px] `}>
                                    {
                                        listing &&
                                        <RatingText listing={listing} />
                                    }
                                </div>
                            </div>

                            <div className={`flex place-items-center gap-1 mt-1`}>
                                <BsBank />
                                <span className={`mt-[1px] text-gray-500`}>Founded 1982</span>
                            </div>
                        </div>

                        {/** right */}
                        <div className={`flex place-items-end flex-col w-[40%] text-end py-[4px] pr-4`}>
                            <div>(+1) 48 944 4030</div>
                            <div className={`text-[13px] leading-[1.2em] mt-1`}>13 Los Angeles Street, Bellefonte, Delaware, United States</div>
                        </div>
                    </div>
                </a>
            </div>

            {/** footer */}
            <div className={`border-t`}>
                <div className={`flex place-content-between mx-4 my-4`}>

                    {/** left */}
                    <div className={`flex place-items-center gap-4`}>
                        <a href="/">
                            <CgFacebook size={20} />
                        </a>
                        <a href="/">
                            <BsTwitterX size={15} />
                        </a>
                        <a href="/">
                            <BsInstagram size={15} />
                        </a>

                        <a href="/">
                            <FaLinkedinIn size={15} />
                        </a>

                        <a href="/pinterest">
                            <BsPinterest size={18} />
                        </a>
                        <a href="/">
                            <GrYoutube size={20} />
                        </a>
                    </div>

                    {/** right */}
                    <div className={``}>
                        <a href='/'>
                            Website
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
