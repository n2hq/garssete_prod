import React from 'react'
import { MdError } from 'react-icons/md'
import { inputControlWrapper, inputHeadingClass, textAreaClass } from '~/lib/css'

const Textarea = ({
    controlName,
    controlPlaceholder,
    controlTitle,
    register,
    changeHandler,
    error
}: any) => {
    return (
        <>
            <div className={inputControlWrapper}>
                <div className={inputHeadingClass}>
                    {controlTitle}
                </div>
                <div>
                    <textarea
                        {...register(controlName, {
                            onChange: changeHandler
                        })}
                        className={textAreaClass}
                        placeholder={controlPlaceholder}
                    />
                    {
                        error &&
                        (
                            <div className={`input__class__error -mt-[5px]`}>
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

export default Textarea
