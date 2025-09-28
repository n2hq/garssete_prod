import React, { useEffect, useState } from 'react'
import { FiRotateCw } from 'react-icons/fi'
import { MdRotate90DegreesCw } from 'react-icons/md'
import { TbRotateClockwise2 } from 'react-icons/tb'


export interface LoadingProp {
    loading?: boolean
}
const LoadingMessage = ({ loading }: LoadingProp) => {
    const [spin, startSpin] = useState(true)

    useEffect(() => {
        if (loading) {
            startSpin(true)
        }
    }, [loading])

    useEffect(() => {
        const handleStopSpin = async (loading: boolean | undefined) => {


            setTimeout(() => {
                startSpin(false)
            }, 3000)

        }
        if (!loading) {
            handleStopSpin(loading)
        }
    }, [loading])

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg">

                    <div className=" space-y-2 mb-3 flex place-content-center flex-col place-items-center ">
                        <TbRotateClockwise2 className={`${spin && 'animate-spin'}`} size={30} />

                        <img className={`h-[19px]`} src={`/images/garssetlogonx.png`} alt="" />
                    </div>


                </div>
            </div>
        </>
    )
}

export default LoadingMessage
