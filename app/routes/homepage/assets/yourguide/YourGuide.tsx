import { Link } from '@remix-run/react'
import React from 'react'

const YourGuide = () => {
    return (
        <div className={`px-[15px] mt-24`}>
            <div className={`max-w-[1000px] mx-auto w-full`}>

                {/** GRID */}
                <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-8 md:gap-y-0`}>
                    <div className={`flex flex-col place-content-center place-items-center`}>
                        <div className={`w-[90%] md:w-[80%]`}>
                            <div className={`font-poppins text-center font-[400] text-lg text-gray-600`}>
                                Garssete Business Directory
                            </div>
                            <div className={`mt-4 font-poppins text-4xl text-center font-[600]`}>
                                Your guide to businesses around the globe<span className={`italic`}>!</span>
                            </div>

                            <div className={`text-center mt-2`}>
                                We've researched various needs of businesses to achieve visibility and global status with minimal effort, well sourced information so you can take your business to the next leve.


                            </div>

                            <div className={`text-center mt-6 flex place-content-center`}>
                                <Link to={`/web/signup`}>
                                    <div className={`bg-black px-10 py-4 text-lg text-white font-poppins w-fit rounded-full`}>
                                        Sign up!
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className={`relative overflow-hidden rounded-xl`}>
                        <img
                            src={`/images/home/dubai-real-estate-1.jpg`}
                            alt=""
                            className={`object-cover w-full h-full`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourGuide
