import React, { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import ResultItem from "./ResultItem";

interface PaginationProps<T> {
    data: T[];
    itemsPerPage?: number;
    resetPageKey?: string; // optional: reset pagination when filter/search changes
}

const PortfolioPagination = <T,>({
    data,
    itemsPerPage = 3,
    resetPageKey
}: PaginationProps<T>) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get initial page from URL, default to 1
    const initialPage = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const updatePage = (page: number) => {
        setCurrentPage(page);

        // ✅ Update URL with both existing query + new page
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(page));
        setSearchParams(newParams);
    };

    const goToPrevious = () => {
        if (currentPage > 1) updatePage(currentPage - 1);
    };

    const goToNext = () => {
        if (currentPage < totalPages) updatePage(currentPage + 1);
    };

    // ✅ Reset page when resetPageKey changes (e.g. new search/filter)
    useEffect(() => {
        if (resetPageKey !== undefined) {
            updatePage(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetPageKey]);

    return (
        <div>
            <div className="divide-gray-500/20 divide-y-[1px]">
                {currentItems.map((item, index) => (
                    <div key={index}>
                        <ResultItem index={index + 1} listing={item} />
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-end gap-[5px] mt-[20px] text-[13px] border-t pt-6">
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-[12px] py-[6px] bg-white cursor-pointer border rounded-[4px] disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => updatePage(number)}
                            className={`px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === number
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white"
                                }`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="px-[12px] py-[6px] bg-white cursor-pointer border rounded-[4px] disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PortfolioPagination;
