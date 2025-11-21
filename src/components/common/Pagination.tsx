"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationComponentProps {
  totalPages: number;
}

export default function PaginationComponent({
  totalPages,
}: PaginationComponentProps) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <Pagination className="mx-0 py-4">
      <PaginationContent className="flex-wrap gap-2">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className="hidden sm:flex"
            />
            <PaginationLink
              onClick={() => goToPage(currentPage - 1)}
              className="h-8 w-8 p-0 sm:hidden"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        <div className="flex items-center gap-3">
          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis className="hidden sm:flex" />
              ) : (
                <PaginationLink
                  onClick={() => goToPage(page)}
                  isActive={page === currentPage}
                  className={`h-8 w-8 rounded-full p-0 text-sm transition-all duration-300 sm:h-10 sm:w-10 ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  } `}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className="hidden sm:flex"
            />
            <PaginationLink
              onClick={() => goToPage(currentPage + 1)}
              className="h-8 w-8 p-0 sm:hidden"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>

      <div className="text-muted-foreground mt-2 ml-4 text-center text-sm sm:hidden">
        Page {currentPage} of {totalPages}
      </div>
    </Pagination>
  );
}
