import React, { useEffect, useState } from 'react'
import SearchBox from '~/components/content/SearchBox'
import ResponsiveNav from '~/components/header/lite/ResponsiveNav'
import ResultLayout from './assets/ResultLayout'
import SearchPagination from './assets/SearchPagination'
import { LoaderFunction } from '@remix-run/node'
import { getSearch } from '~/lib/lib'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import LatestBusinesses from './assets/LatestBusinesses'
import Footer from '~/components/footer/Footer'
import { navlinks } from '~/lib/json'
import SearchHead from '~/components/content/SearchHead'
import GenericNav from '~/components/header/generic/GenericNav'
import HomeNav from '~/routes/assets/header/HomeNav'

import { TopAd } from '~/components/content/ads/TopAd'
import SearchNavbar from '~/components/header/new/SearchNavbar'
import SearchLayout from '~/routes/asset/SearchLayout'
import VerticalHeight from '~/routes/asset/VerticalHeight'
import CallToActionSection from '~/components/content/CallToActionSection'
import FooterSection from '~/routes/landing/assets/FooterSection'

export const loader: LoaderFunction = async ({ request, params }) => {

    //console.log(data)
    //let realestate = await getListingByCategory('automotive', 4)

    try {
        const url = new URL(request.url);
        const query = url.searchParams.get("q") || "";
        let data = await getSearch(query)

        let res = {
            data: data,
            query: query
        }
        return res;

    } catch (err) {
        throw new Response("You are offline. Please reconnect.", { status: 503 });
    }

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


    //const [searchParams] = useSearchParams();

    //const query = data.query
    //const [queryParam, setQueryParam] = useState<string | null>(null)


    return (
        <SearchLayout>
            <div className={`px-[15px] bg-gray-100 `}>
                <div className={`max-w-[1100px] mx-auto w-full`}>
                    <div className={` grid grid-cols-12 gap-x-2 gap-y-2 md:gap-y-0`}>
                        <div className={`flex place-items-center col-span-12 md:col-span-4 truncate
                             pt-3 pb-0 md:pb-3 `}>
                            <span className={`text-[17px] font-bold`}>
                                {
                                    res.query?.length > 0 ? `Search for '${res.query}'` : `Browse Updates`
                                }
                            </span>
                        </div>

                        <div className={`flex place-items-center place-content-start
                         text-gray-500 col-span-12 md:col-span-8 
                            md:place-content-end font-bold pb-[15px] md:pb-[0px]
                            gap-x-3 md:gap-x-12 flex-wrap md:flex-nowrap leading-[1.4em]
                              `}>
                            {
                                navlinks?.map((link, index) => {
                                    return (<Link to={`${link.url}`} key={index} className={``}>{link.label}</Link>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>



            <TopAd />

            <div className={`md:hidden px-[12px] mt-8`}>
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

                <LatestBusinesses
                    category={'entertainment'}
                    limit={5}
                    title={"Entertainment"}
                    subtitle={"Entertainment based businesses added in the last 7 days"}
                />
                <LatestBusinesses
                    category={'services'}
                    limit={5}
                    title={"Services"}
                    subtitle={"Services based businesses added in the last 7 days"}
                />
            </div>

            <div className={`hidden md:block`}>
                <ResultLayout>
                    {
                        data.length > 0 ?
                            <SearchPagination
                                data={data}
                                itemsPerPage={20}
                            /> :
                            <div className={`flex place-items-center rounded
                            place-content-center p-5 border capitalize`}>
                                <span>no record</span>
                            </div>
                    }

                    <LatestBusinesses
                        category={'entertainment'}
                        limit={5}
                        title={"Entertainment"}
                        subtitle={"Entertainment based businesses added in the last 7 days"}
                    />
                    <LatestBusinesses
                        category={'services'}
                        limit={5}
                        title={"Services"}
                        subtitle={"Services based businesses added in the last 7 days"}
                    />
                </ResultLayout>
            </div>

            <VerticalHeight />
            <CallToActionSection />
            <FooterSection />
        </SearchLayout>
    )
}

export default index
