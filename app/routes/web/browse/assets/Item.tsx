import React from 'react'
import { BiBuilding, BiSolidStar, BiStar } from 'react-icons/bi'
import { BsBank } from 'react-icons/bs'

const Item = () => {
    return (
        <div className={`bg-white w-full h-auto rounded-md shadow-md overflow-hidden`}>
            {/** header */}
            <div className={`bg-gray-50 py-3 px-4 border-b`}>
                <div className={`flex place-content-between`}>
                    {/** left */}
                    <div className={`flex place-items-center gap-2`}>
                        <div className={`h-[40px] w-[40px] rounded-full bg-black`}>

                        </div>
                        <div className={`-space-y-1`}>
                            <div className={`text-black text-lg font-semibold`}>
                                Expression
                            </div>
                            <div className={`text-[12px] text-gray-500 italic`}>
                                Entertainment
                            </div>
                        </div>
                    </div>

                    {/** right */}
                    <div className={`flex place-items-center`}>
                        <div className={`font-bold rounded-sm bg-blue-100 px-3 py-[2px]`}>View</div>
                    </div>
                </div>
                <div className={`mt-[8px] text-[14px] text-gray-500 leading-[1.3em]`}>
                    The only real-time generative AI app for video chatting, live streaming, and video creation on the market.
                </div>
            </div>
            {/** body */}
            <div>
                <div className={`bg-white h-auto flex place-content-between px-4 py-4 `}>
                    {/** left */}
                    <div className={`flex place-items-start w-[60%] flex-col`}>
                        <div className={`flex place-items-center  w-full gap-1`}>
                            <div className={`text-[19px] flex`}>
                                <BiSolidStar className={`text-yellow-400`} />
                                <BiSolidStar className={`text-yellow-400`} />
                                <BiSolidStar className={`text-yellow-400`} />
                                <BiStar />
                                <BiStar />
                            </div>
                            <div className={`text-[13px] pt-[1px]`}>
                                3 (13 reviews)
                            </div>
                        </div>

                        <div className={`flex place-items-center gap-1 mt-1.5`}>
                            <BsBank />
                            <span className={`mt-[1px] text-gray-500`}>Founded 1982</span>
                        </div>
                    </div>

                    {/** right */}
                    <div className={`flex place-items-end flex-col w-[40%] text-end `}>
                        <div>(+1) 48 944 4030</div>
                        <div>13 Los Angeles Street, Bellefonte, Delaware, United States</div>
                    </div>
                </div>
            </div>
            {/** footer */}
        </div>
    )
}

export default Item
