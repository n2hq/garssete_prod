import React, { useState } from 'react'
import { inputControlWrapper } from '~/lib/css'

const Button = ({
    working,
    value
}: any) => {

    return (
        <>
            <div className={inputControlWrapper}>

                <div>
                    <button

                        className={`border-[1px] border-none bg-blue-900 
                            w-full  text-xl
                            py-2.5 rounded text-white mt-1 shadow-lg shadow-blue-400
                            cursor-pointer ${working && 'bg-blue-500 cursor-default'}`}
                        disabled={working}
                    >
                        {working ? 'Submitting...' : `${value ? value : 'Submit'}`}
                    </button>
                </div>

                <div className={`mt-4 text-[.7em] leading-[1.2em] 
                    px-2 w-full`}>
                    By submitting, you agree to our Privacy Commitment and Terms of Service.
                </div>
            </div>
        </>
    )
}

export default Button
