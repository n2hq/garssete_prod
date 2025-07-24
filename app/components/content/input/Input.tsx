import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'
import { controlInformationClass, inputClass, inputClassError, inputControlWrapper, inputHeadingClass } from '~/lib/css'

const Input = ({
    controlName,
    controlType,
    controlPlaceholder,
    controlTitle,
    controlInformation,
    register,
    changeHandler,
    error,
    width,
    disabled = false
}: any) => {

    const [wrapperWidth, setWrapperWidth] = useState('')
    const [inputWidth, setInputWidth] = useState(width)

    useEffect(() => {
        if (inputWidth > 0) {
            if (inputWidth === 100) {
                setWrapperWidth(`xl:w-full`)
            } else {
                setWrapperWidth(`xl:w-[${inputWidth}%]`)
            }
        }
    }, [inputWidth])
    return (
        <>
            <div className={inputControlWrapper}>
                <div className={inputHeadingClass}>
                    <div className={`mb-0 text-xl`}>
                        {controlTitle}
                    </div>
                    {
                        controlInformation?.length > 1 && <div className={controlInformationClass}>
                            {controlInformation}
                        </div>
                    }
                </div>

                <div className={`w-[100%]`}>
                    <input
                        {...register(controlName, {
                            onChange: changeHandler
                        })}
                        type={controlType ? controlType : 'text'}
                        className={`${inputClass} ${disabled && 'bg-gray-200/80'}`}
                        placeholder={controlPlaceholder}
                        disabled={disabled}
                    />

                    {
                        error &&
                        (
                            <div className={`${inputClassError}`}>
                                <MdError className='text-lg' />
                                {error.message}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Input
