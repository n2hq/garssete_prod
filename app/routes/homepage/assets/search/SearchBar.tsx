import { BiSearch } from "react-icons/bi"

export const SearchBar = () => {
    return (

        <form action="/web/browse" className={` w-full`}>
            <div className={`border-2 border-black rounded-full flex place-items-center place-content-between gap-3 pl-[15px] pr-[4px] py-1 bg-gray-100 shadow-md shadow-gray-300 font-poppins font-light`}>
                <div>
                    <BiSearch size={25} />
                </div>
                <div className={`grow w-full`}>
                    <input
                        name="q"
                        placeholder={`Search businesses, hotels, entertainment`}
                        type="text"
                        className={`w-full py-3 outline-none text-[17px] h-full bg-transparent`}
                    />
                </div>
                <div>
                    <button
                        className={`bg-purple-600 py-3 rounded-full px-6 border-[1px] border-black text-[15px] font-poppins text-white font-[500]`}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>

    )
}