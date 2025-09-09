import React, { useEffect, useState } from 'react'
import { BiListOl, BiListPlus } from 'react-icons/bi'
import { BsBag, BsBagCheckFill, BsListCheck, BsListStars } from 'react-icons/bs'
import { IoListCircleOutline } from 'react-icons/io5'
import { MdNotListedLocation } from 'react-icons/md'

const StringToListMaker = ({ phrasesString, useGrid }: any) => {
    const [phrasesList, setPhrasesList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrasesString: string) => {
            const phraseList = phrasesString?.split(",").map(item => item.trim());
            setPhrasesList(phraseList)
        }
        if (phrasesString !== null && phrasesString !== "") {
            convertToList(phrasesString)
        }
    }, [phrasesString])
    return (
        <>
            {
                useGrid === true ?
                    <div className={`grid grid-cols-2 gap-y-5 w-full`}>
                        {
                            phrasesList?.map((phrase: any, index: number) => {
                                return (
                                    <div className={`flex place-items-center gap-3`} key={index}>
                                        <span>
                                            <BsBagCheckFill />
                                        </span>
                                        <span>
                                            {phrase}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    <div className={`flex gap-3 flex-wrap`}>
                        {
                            phrasesList?.map((phrase: any, index: number) => {
                                return (
                                    <span key={index} className={`bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-lg cursor-move
                        rounded-md shadow-none shadow-gray-500`}>
                                        {phrase}
                                    </span>
                                )
                            })
                        }
                    </div>

            }
        </>
    )
}

export default StringToListMaker
