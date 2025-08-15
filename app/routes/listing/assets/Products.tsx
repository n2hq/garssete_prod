import React, { useEffect, useState } from 'react'
import { config, getBusinessProfileImageData } from '~/lib/lib'
import ComponentTitle from './ComponentTitle'

const Products = ({ listing }: any) => {
    const [productList, setProductList] = useState<any[]>([])

    useEffect(() => {
        const convertToList = (phrases: string) => {
            const productList = phrases.split(",").map(item => item.trim());
            setProductList(productList)
        }
        if (listing !== null) {
            convertToList(listing?.products)
        }
    }, [listing])
    return (
        <div className='mt-12'>
            <ComponentTitle title='Products' />


            <div className={`flex gap-3 flex-wrap`}>
                {
                    productList.map((product: any, index: number) => {
                        return (
                            <span className={`bg-blue-50 px-2 border py-1 border-gray-300 hover:shadow-md cursor-move`}>
                                {product}
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products
