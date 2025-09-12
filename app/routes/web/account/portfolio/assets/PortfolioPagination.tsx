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

    // ✅ Function to render limited pagination buttons
    const renderPageNumbers = () => {
        if (totalPages <= 3) {
            // If few pages, just render all
            return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
            ));
        }

        const buttons: React.ReactNode[] = [];

        // Always show page 1
        if (currentPage > 2) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => updatePage(1)}
                    className={`px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === 1
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white"
                        }`}
                >
                    1
                </button>
            );
            if (currentPage > 3) {
                buttons.push(
                    <span key="start-ellipsis" className="px-2">
                        …
                    </span>
                );
            }
        }

        // Current page and its neighbors
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let number = start; number <= end; number++) {
            buttons.push(
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
            );
        }

        // Always show last page
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                buttons.push(
                    <span key="end-ellipsis" className="px-2">
                        …
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => updatePage(totalPages)}
                    className={`px-[12px] py-[6px] cursor-pointer border rounded-[4px] ${currentPage === totalPages
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white"
                        }`}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

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
                <div className="flex justify-center gap-[5px] mt-[20px] text-[13px] border-t pt-6">
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="px-[12px] py-[6px] bg-white cursor-pointer border rounded-[4px] disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {renderPageNumbers()}

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
