import React, { useState } from 'react'
import ResultItem from './ResultItem'

interface PaginationProps<T> {
    data: [];
    itemsPerPage?: number;
}

const PortfolioPagination = <T,>({
    data,
    itemsPerPage = 3
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
            <div className={``}>
                {
                    currentItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <ResultItem index={index + 1} listing={item} />
                            </div>
                        )
                    })
                }
            </div>


            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className={`flex justify-end gap-[5px] 
                mt-[0px] text-[13px] border-t pt-6`}>
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-[12px] py-[0px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-[12px] py-[0px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-[12px] py-[6px] bg-white cursor-pointer border
                                rounded-[4px]"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default PortfolioPagination
