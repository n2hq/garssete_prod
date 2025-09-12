import { Link, useSearchParams } from '@remix-run/react';
import { PaginationData } from '~/lib/types';

interface PaginationProps {
    pagination: PaginationData;
}

const maxVisiblePages = 3; // 👈 moved outside so it's a single constant

export default function Pagination({ pagination }: PaginationProps) {
    const [searchParams] = useSearchParams();
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    const getPageNumbers = () => {
        const pages = [];

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `?${params.toString()}`;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} items
            </div>

            <nav className="flex items-center space-x-1">
                {/* Previous Button */}
                <a
                    href={createPageUrl(currentPage - 1)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${!pagination.hasPrev
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    aria-disabled={!pagination.hasPrev}
                >
                    Previous
                </a>

                {/* Page Numbers */}
                {getPageNumbers()?.map((page, index) =>
                    typeof page === 'number' ? (
                        <a
                            key={page}
                            href={createPageUrl(page)}
                            className={`px-3 py-2 border rounded-md text-sm font-medium ${page === currentPage
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {page}
                        </a>
                    ) : (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-gray-500"
                        >
                            {page}
                        </span>
                    )
                )}

                {/* Next Button */}
                <a
                    href={createPageUrl(currentPage + 1)}
                    className={`px-3 py-2 border rounded-md text-sm font-medium ${!pagination.hasNext
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    aria-disabled={!pagination.hasNext}
                >
                    Next
                </a>
            </nav>
        </div>
    );
}
