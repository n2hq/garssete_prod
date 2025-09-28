import React from 'react'
import { FiRotateCw } from 'react-icons/fi'
import { MdRotate90DegreesCw } from 'react-icons/md'
import { TbRotateClockwise2 } from 'react-icons/tb'

const LoadingMessage = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">

                    <div className=" space-y-2 mb-3 flex place-content-center flex-col place-items-center ">
                        <TbRotateClockwise2 className={`animate-spin`} size={30} />

                        <img className={`h-[19px]`} src={`/images/garssetlogonx.png`} alt="" />
                    </div>


                </div>
            </div>
        </>
    )
}

export default LoadingMessage
