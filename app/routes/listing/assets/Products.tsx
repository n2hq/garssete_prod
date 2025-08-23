import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'
import StringToListMaker from '~/components/content/StringToListMaker'

const Products = ({ listing }: any) => {
    const [productList, setProductList] = useState<any[]>([])


    return (
        <div className='mt-12'>
            <ComponentTitle title='Products' />


            {
                listing?.products &&
                <StringToListMaker
                    useGrid={true}
                    phrasesString={listing?.products} />
            }
        </div>
    )
}

export default Products
