import React, { useEffect, useState } from 'react'
import { MdError } from 'react-icons/md'
import { inputControlWrapper, inputHeadingClass, inputHeadingClassForTextarea, textAreaClass } from '~/lib/css';

const TextareaWithWordLimit = ({
    controlName,
    controlPlaceholder,
    controlTitle,
    register,
    changeHandler,
    controlInformationClass,
    controlInformation,
    error,
    setValue,
    getValues,
    watch,
    minWords = 100,
    maxWords = 500
}: any) => {
    const [text, setText] = useState('')
    const [wordLimitReached, setWordLimitReached] = useState(false);

    const countWords = (input: string) => {

        return input?.trim() === ''
            ? 0
            : input?.trim().split(/\s+/).length;
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        const words = input.trim().split(/\s+/);

        if (words.length <= maxWords) {
            setValue('text', input);
            setWordLimitReached(false);
        } else {
            setWordLimitReached(true);
            const trimmedWords = words.slice(0, maxWords).join(' ');
            setValue('text', trimmedWords); // Force trim to maximumWords words
        }
    };

    const textValue = watch('text') || '';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const words = textValue.trim().split(/\s+/);
        if (words.length >= maxWords && e.key !== 'Backspace' && e.key !== 'Delete' && !e.ctrlKey) {
            e.preventDefault(); // Block typing if maximumWords words reached
            setWordLimitReached(true);
        } else {
            setWordLimitReached(false);
        }

    }

    useEffect(() => {
        if (controlName) {
            let priorText = getValues(controlName)
            setText(priorText)
        }
    }, [controlName])

    return (
        <>
            <div className={inputControlWrapper}>
                <div className='flex place-content-between place-items-baseline top-1'>
                    <label className={inputHeadingClassForTextarea}>{controlTitle}</label>

                    <label className=" text-gray-600 text-sm">
                        Word Count: <strong>{countWords(text)}</strong>
                    </label>
                </div>
                {
                    controlInformation?.length > 1 && <div className={`${controlInformationClass} ml-1.5 mb-2`}>
                        {controlInformation}
                    </div>
                }
                <div>
                    <textarea
                        {...register(controlName, {
                            onChange: (e: any) => {
                                setText(e.target.value)
                                handleTextChange(e)
                                changeHandler(e)
                            }
                        })}
                        className={textAreaClass}
                        placeholder={controlPlaceholder}
                        onKeyDown={handleKeyDown}
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

export default TextareaWithWordLimit
