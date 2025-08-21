import { useLocation } from "@remix-run/react"
import { BiSearch } from "react-icons/bi"

export const PortfolioSearchBox = ({ query }: any) => {


    return (
        <form action="/web/account/portfolio" className="text-sm w-full max-w-md">
            <div className="flex items-center bg-gray-50 rounded-full pl-4 pr-1 py-1 gap-2
            border-[1px] border-gray-500">
                <input
                    name="q"
                    defaultValue={query}
                    type="text"
                    placeholder="Business name, address, country, state..."
                    className="flex-grow text-gray-700 text-[12px] outline-none bg-transparent"
                />
                <button className="bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full text-white text-lg">
                    <BiSearch />
                </button>
            </div>
        </form>
    )
}