import React, { useState } from 'react'
import ResultItem from './ResultItem'
import ResultMobile from './ResultMobile';

interface PaginationProps<T> {
    data: [];
    itemsPerPage?: number;
}

const SearchPagination = <T,>({
    data,
    itemsPerPage = 10
}: PaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <div className={` divide-y z-0 divide-gray-500/30`}>
                {
                    currentItems?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className={`md:hidden`}>
                                    <ResultMobile listing={item} index={index} />
                                </div>
                                <div className={`hidden md:block`}>
                                    {
                                        item && <ResultItem listing={item} />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className={`flex justify-center gap-[5px] 
                mt-[60px]`}>
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-[12px] py-[8px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-[12px] py-[8px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? 'bg-blue-500 text-white border-blue-500' : 'bg-white'}`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-[12px] py-[8px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default SearchPagination
