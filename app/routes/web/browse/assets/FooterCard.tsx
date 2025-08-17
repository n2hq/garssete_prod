import React from 'react'
import { BiBuilding, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsBank, BsInstagram, BsTwitterX } from 'react-icons/bs'
import { CgFacebook, CgTwitter } from 'react-icons/cg'
import { FaFacebook } from 'react-icons/fa'

const FooterCard = () => {
    return (
        <div className={`bg-white w-full h-auto md:rounded-t-md shadow-md overflow-hidden border`}>
            {/** header */}
            <div className={`bg-gray-50/30 py-3 px-4 border-b`}>

                <div className={`flex place-content-between`}>
                    {/** left */}
                    <div className={`flex place-items-center gap-2`}>

                        <div className={`-space-y-1`}>
                            <div className={`text-black text-lg font-semibold`}>
                                Garsset.com
                            </div>
                            <div className={`text-[12px] text-gray-500 italic capitalize`}>
                                Business Directory Service
                            </div>
                        </div>
                    </div>

                    {/** right */}
                    <div className={`flex place-items-center`}>

                    </div>
                </div>
                <div className={`mt-[8px] text-[12px] text-gray-500 leading-[1.3em]`}>
                    The only real-time generative AI app for video chatting, live streaming, and video creation on the market.
                </div>
            </div>





        </div>
    )
}

export default FooterCard
