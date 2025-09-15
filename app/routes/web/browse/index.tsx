import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigation, useSearchParams } from '@remix-run/react';
import React, { useEffect, useState } from 'react'
import { getCountries, getSearch, logError } from '~/lib/lib';
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
import { ListingType } from '~/lib/types';
import Pagination from './assets/Pagination';
import { OnlineStatusProvider } from '~/context/OnlineStatusContext';
import QueryBuilder from './assets/QueryBuilder';


export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const query = url?.searchParams.get("q") || "";
    const state = url?.searchParams.get("state") || "";
    const city = url?.searchParams.get("city") || "";
    const country = url?.searchParams.get("country") || "";
    const category = url?.searchParams.get("category") || "";

    let page: number = 1
    let data: any = ""
    let countries = null

    try {
        page = parseInt(url?.searchParams.get("page") || "1")
        data = await getSearch(query, city, state, country, category, page)
        countries = await getCountries()
    } catch (error: any) {
        logError(error)
    }

    let res = {
        data: data,
        query: query,
        countries: countries
    }
    return res;
}

const Index = () => {

    const res: any = useLoaderData()


    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigation()


    const data = res.data.items || []
    const pagination = res.data.pagination
    const query = res.query
    const countries = res.countries
    const [queryParam, setQueryParam] = useState<string | null>(null)

    const currentPage = parseInt(searchParams.get('page') || '1');

    const isLoading = navigation.state === 'loading'

    useEffect(() => {
        if (query) {
            //alert(query)
            setQueryParam(query)
        }
    }, [query])


    // Extract initial filters from URL
    const initialFilters = {
        q: searchParams.get('q') || '',
        category: searchParams.get('category') || '',
        country: searchParams.get('country') || '',
        state: searchParams.get('state') || '',
        city: searchParams.get('city') || ''
    }

    return (
        <div className=' '>
            <SrchNavbar />

            <div className={`h-screen flex flex-col relative `}>
                <div className={`mt-[120px] md:mt-[60px]`}>

                </div>
                {/** layout */}
                <div className={`grid grid-cols-12 h-full overflow-hidden  gap-5 `}>
                    {/** left */}
                    <aside className={`col-span-3 h-full overflow-y-auto scrollbar-hidden pt-2 hidden xl:block`}>



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
                    <div className={`col-span-12 xl:col-span-9  overflow-y-auto w-full md:px-[15px]`}>

                        {/** grid */}
                        <div className={`grid grid-cols-12 gap-5`}>

                            {/** left */}
                            <div className={`col-span-12 md:col-span-8  pt-3`}>



                                <div className={`space-y-8`}>
                                    <div className={``}>
                                        <QueryBuilder
                                            loading={isLoading}
                                            initialFilters={initialFilters}
                                        />
                                    </div>

                                    {
                                        data?.map((data: ListingType, index: number) => {
                                            return (
                                                <Card
                                                    key={index}
                                                    listing={data}
                                                />
                                            )
                                        })
                                    }

                                    <Pagination
                                        pagination={pagination}
                                    />

                                    {/* {
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
                                    } */}


                                    <FooterCard />

                                </div>

                            </div>

                            {/** right */}
                            <div className={`hidden md:block md:col-span-4 pt-3    `}>

                                <div className={`w-full xl:w-[90%] sticky top-3 ml-auto`}>
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
