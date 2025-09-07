import React, { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import Card from "./Card";
import SearchAd from "~/components/content/ads/SearchAd";

interface PaginationProps<T> {
    data: T[];
    itemsPerPage?: number;
    resetPageKey?: string;
}

const SearchPagination = <T,>({
    data,
    itemsPerPage = 10,
    resetPageKey
}: PaginationProps<T>) => {
    const [searchParams] = useSearchParams();

    // ✅ always compute page from URL param
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    useEffect(() => {
        setCurrentPage(pageFromUrl);
    }, [pageFromUrl]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // ✅ reset page when key changes (like new search)
    useEffect(() => {
        if (resetPageKey !== undefined) {
            setCurrentPage(1);
        }
    }, [resetPageKey]);

    return (
        <div>
            <div className="space-y-6">
                {currentItems?.map((item: T, index) => (
                    <div key={index}>
                        {(index + 1) % 2 ? (
                            <Card listing={item} index={index} />
                        ) : (
                            <>
                                <Card listing={item} index={index} />
                                <SearchAd />
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-[5px] mt-[60px]">
                    {/* Previous */}
                    {currentPage > 1 ? (
                        <a
                            href={
                                currentPage - 1 === 1
                                    ? `/web/browse`
                                    : `/web/browse?page=${currentPage - 1}`
                            }
                            className="px-[12px] py-[8px] bg-white border rounded-[4px]"
                        >
                            Previous
                        </a>
                    ) : (
                        <span className="px-[12px] py-[8px] bg-gray-200 border rounded-[4px] text-gray-400 cursor-not-allowed">
                            Previous
                        </span>
                    )}

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <a
                            key={number}
                            href={number === 1 ? `/web/browse` : `/web/browse?page=${number}`}
                            className={`px-[12px] py-[8px] border rounded-[4px] ${currentPage === number
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white"
                                }`}
                        >
                            {number}
                        </a>
                    ))}

                    {/* Next */}
                    {currentPage < totalPages ? (
                        <a
                            href={`/web/browse?page=${currentPage + 1}`}
                            className="px-[12px] py-[8px] bg-white border rounded-[4px]"
                        >
                            Next
                        </a>
                    ) : (
                        <span className="px-[12px] py-[8px] bg-gray-200 border rounded-[4px] text-gray-400 cursor-not-allowed">
                            Next
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPagination;
