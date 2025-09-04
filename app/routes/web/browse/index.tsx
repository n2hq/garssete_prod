import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import { getCountries, getSearch } from '~/lib/lib';
import SearchLayout from '~/routes/asset/SearchLayoutMain';
import Item from './assets/Item';
import BrowseLayout from '~/routes/asset/BrowseLayout';
import Card from './assets/Card';
import LeftNavForBrowse from './assets/Categories';
import SrchNavbar from '~/components/header/new/SrchNavbar';

import VerticalHeight from '~/routes/asset/VerticalHeight';
import CallToActionSection from '~/components/content/CallToActionSection';
import FooterSection from '~/routes/landing/assets/FooterSection';
import FooterCard from './assets/FooterCard';
import SearchPagination from './assets/SearchPagination';
import Featured from './assets/Featured';
import Countries from './assets/Countries';
import Categories from './assets/Categories';


export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url?.searchParams.get("q") || "";
    let data = await getSearch(query)
    let countries = await getCountries()


    let res = {
        data: data,
        query: query,
        countries: countries
    }
    return res;
}

const Index = () => {

    const res: any = useLoaderData()
    const [searchParams] = useSearchParams();

    const data = res.data
    const query = res.query
    const countries = res.countries
    const [queryParam, setQueryParam] = useState<string | null>(null)

    useEffect(() => {
        if (query) {
            //alert(query)
            setQueryParam(query)
        }
    }, [query])

    return (
        <div className=' '>
            <SrchNavbar />

            <div className={`h-screen flex flex-col relative bg-gray-100`}>
                <div className={`mt-[120px] md:mt-[60px]`}>

                </div>
                {/** layout */}
                <div className={`grid grid-cols-12 h-full overflow-hidden  gap-5 `}>
                    {/** left */}
                    <aside className={`col-span-3 h-full overflow-y-auto scrollbar-hidden pt-2 hidden lg:block`}>
                        <div className={``}>
                            <div className={`mt-3 text-[17px] mb-4 font-bold ml-6`}>
                                Categories
                            </div>
                            <Categories />
                        </div>

                        <div className={`mt-5`}>
                            <div className={`mt-3 text-[17px] mb-4 font-bold ml-6`}>
                                Countries
                            </div>
                            {
                                countries &&
                                <Countries countries={countries} />
                            }
                        </div>
                        <div className={` py-4 px-4 border-t`}>
                            Garssete - Business Directory Listing
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
                                                resetPageKey={query} // 👈 ensures reset when query changes
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
                            <div className={`hidden md:block md:col-span-5 pt-3   `}>

                                <div className={`w-full lg:w-[90%] sticky top-3 ml-auto`}>
                                    <Featured />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>

    )
}

export default Index
