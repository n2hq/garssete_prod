import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import SrchNavbar from '~/components/header/new/SrchNavbar'
import { getCountries, getSearch } from '~/lib/lib';
import SearchPagination from './assets/SearchPagination';
import Categories from './assets/Categories';
import Countries from './assets/Countries';
import Featured from './assets/Featured';
import FooterSection from '~/routes/landing/assets/FooterSection';
import VerticalHeight from '~/routes/asset/VerticalHeight';
import CallToActionSection from '~/components/content/CallToActionSection';
import SearchPaginationCopy from './assets/SearchPaginationCopy';

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


const db = () => {

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
        <div>
            <SrchNavbar />

            <div className={`h-[140px] md:h-[80px]`}></div>

            <div className={`flex place-content-between md:gap-x-8`}>
                {/** left */}
                <div className={` w-[350px] min-w-[350px] h-screen overflow-auto scrollbar-hidden sticky top-[80px] md:pr-6 hidden lg:block`}>
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
                </div>

                {/** right */}
                <div className={` flex md:place-content-between w-full md:gap-x-24 md:mr-[15px]`}>

                    {/** center */}
                    <div>
                        {
                            data?.length > 0 ?
                                <SearchPaginationCopy
                                    data={data}
                                    itemsPerPage={20}
                                    resetPageKey={query} // 👈 ensures reset when query changes
                                /> :
                                <div className={`flex place-items-center rounded
                            place-content-center p-5 border capitalize`}>
                                    <span>no record</span>
                                </div>
                        }
                    </div>


                    {/** right */}
                    <div className={`w-[350px] min-w-[350px] h-screen  sticky top-[80px] hidden lg:block`}>
                        <Featured />
                    </div>
                </div>


            </div>

            <div>
                <VerticalHeight />
                <CallToActionSection />
                <FooterSection />
            </div>
        </div>
    )
}

export default db
