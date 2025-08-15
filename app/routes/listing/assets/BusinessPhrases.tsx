import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const BusinessPhrases = ({ listing }: any) => {
    const [phrasesList, setPhrasesList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrases: string) => {
            const phraseList = phrases.split(",").map(item => item.trim());
            setPhrasesList(phraseList)
        }
        if (listing !== null) {
            convertToList(listing?.business_phrases)
        }
    }, [listing])
    return (
        <div className='mt-12'>
            <ComponentTitle title='Business Phrases' />


            <div className={`flex gap-3 flex-wrap`}>
                {
                    phrasesList.map((phrase: any, index: number) => {
                        return (
                            <span className={`bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-md cursor-move`}>
                                {phrase}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BusinessPhrases
