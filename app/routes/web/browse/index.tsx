import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import { getSearch } from '~/lib/lib';
import SearchLayout from '~/routes/asset/SearchLayout copy';
import Item from './assets/Item';
import BrowseLayout from '~/routes/asset/BrowseLayout';
import Card from './assets/Card';
import LeftNavForBrowse from './assets/LeftNavForBrowse';
import SrchNavbar from '~/components/header/new/SrchNavbar';
import Featured from '../search/assets/Featured';
import VerticalHeight from '~/routes/asset/VerticalHeight';
import CallToActionSection from '~/components/content/CallToActionSection';
import FooterSection from '~/routes/landing/assets/FooterSection';
import FooterCard from './assets/FooterCard';
import SearchPagination from './assets/SearchPagination';

const dataCompanies = [
    {
        title: "Diageo Inc.",
        category: "Entertainment"
    },
    {
        title: "Swift Consortium",
        category: "Services"
    },
    {
        title: "Real One Business",
        category: "Legal"
    },
    {
        title: "Bronse Agnostics",
        category: "Accounting"
    },
    {
        title: "Microsoft Delaware",
        category: "Technology"
    },
    {
        title: "Apple Inc.",
        category: "Medical"
    },
    {
        title: "Somina Inc.",
        category: "Trucking"
    },
    {
        title: "Disbributed Computing",
        category: "Banking"
    },
]

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";
    let data = await getSearch(query)


    let res = {
        data: data,
        query: query
    }
    return res;
}

const index = () => {

    const res: any = useLoaderData()
    const [searchParams] = useSearchParams();

    const data = res.data
    const query = res.query
    const [queryParam, setQueryParam] = useState<string | null>(null)

    useEffect(() => {
        if (query) {
            //alert(query)
            setQueryParam(query)
        }
    }, [query])

    return (
        <div className='h-screen flex flex-col relative bg-gray-50'>
            <SrchNavbar />

            {/** layout */}
            <div className={`grid grid-cols-12 h-full overflow-hidden mt-[120px] md:mt-[60px] gap-5 `}>
                {/** left */}
                <aside className={`col-span-3 h-full overflow-y-auto scrollbar-hidden pt-2 hidden lg:block`}>
                    <div className={``}>
                        <div className={`mt-3 text-[17px] mb-4 font-bold ml-6`}>
                            Categories
                        </div>
                        <LeftNavForBrowse />
                    </div>
                </aside>

                {/** right */}
                <div className={`col-span-12 lg:col-span-9  overflow-y-auto w-full md:px-[15px]`}>

                    {/** grid */}
                    <div className={`grid grid-cols-12 gap-8`}>

                        {/** left */}
                        <div className={`col-span-12 md:col-span-7  pt-3`}>
                            <div className={`space-y-8`}>

                                {
                                    data?.length > 0 ?
                                        <SearchPagination
                                            data={data}
                                            itemsPerPage={20}
                                        /> :
                                        <div className={`flex place-items-center rounded
                            place-content-center p-5 border capitalize`}>
                                            <span>no record</span>
                                        </div>
                                }


                                <FooterCard />

                            </div>

                        </div>

                        {/** right */}
                        <div className={`hidden md:block md:col-span-5 pt-3  md:place-items-end  `}>

                            <div className={`w-full lg:w-[90%] sticky top-3`}>
                                <Featured />
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>

    )
}

export default index
