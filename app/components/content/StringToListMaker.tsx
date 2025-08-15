import React, { useEffect, useState } from 'react'

const StringToListMaker = ({ phrasesString }: any) => {
    const [phrasesList, setPhrasesList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrasesString: string) => {
            const phraseList = phrasesString.split(",").map(item => item.trim());
            setPhrasesList(phraseList)
        }
        if (phrasesString !== null && phrasesString !== "") {
            convertToList(phrasesString)
        }
    }, [phrasesString])
    return (
        <div className={`flex gap-3 flex-wrap`}>
            {
                phrasesList.map((phrase: any, index: number) => {
                    return (
                        <span className={`bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-none cursor-move
                        rounded-full shadow-sm shadow-gray-500`}>
                            {phrase}
                        </span>
                    )
                })
            }
        </div>
    )
}

export default StringToListMaker
