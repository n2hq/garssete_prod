import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'
import StringToListMaker from '~/components/content/StringToListMaker'

const BusinessPhrases = ({ listing }: any) => {

    return (
        <div className='mt-12'>
            <ComponentTitle title='Business Offerings' />


            <div className={`flex gap-3 flex-wrap`}>
                {
                    listing?.business_phrases &&
                    <StringToListMaker useGrid phrasesString={listing?.business_phrases} />
                }
            </div>
        </div>
    )
}

export default BusinessPhrases
