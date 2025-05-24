// src/components/products/CursorPaginationControls.tsx
"use client";

import React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { WPSCursor } from "@/lib/wps-client";

interface CursorPaginationControlsProps {
  cursor: WPSCursor | null;
  loading?: boolean;
  currentCount?: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onFirstPage: () => void;
  showFirstPageButton?: boolean;
}

export default function CursorPaginationControls({
  cursor,
  loading = false,
  currentCount = 0,
  onNextPage,
  onPrevPage,
  onFirstPage,
  showFirstPageButton = true,
}: CursorPaginationControlsProps) {
  // Don't render if no cursor data or no navigation options
  if (!cursor || (!cursor.next && !cursor.prev)) {
    return null;
  }

  const hasNextPage = cursor.next !== null;
  const hasPrevPage = cursor.prev !== null;
  const isFirstPage = cursor.prev === null;

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-2">
        {/* First Page Button */}
        {showFirstPageButton && !isFirstPage && (
          <button
            onClick={onFirstPage}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            title="Go to first page"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">First</span>
          </button>
        )}

        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={!hasPrevPage || loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Current Page Indicator */}
        <div className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium min-w-20 text-center">
          {loading ? "..." : "Page"}
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage || loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Status */}
      <div className="text-xs text-gray-500 text-center">
        {loading && <span>Loading...</span>}
        {!loading && (
          <div className="flex items-center gap-4">
            <span className={hasPrevPage ? "text-blue-600" : "text-gray-400"}>
              ← Previous {hasPrevPage ? "available" : "unavailable"}
            </span>
            <span className={hasNextPage ? "text-blue-600" : "text-gray-400"}>
              Next {hasNextPage ? "available" : "unavailable"} →
            </span>
          </div>
        )}
      </div>

      {/* Cursor Debug Info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <details className="text-xs text-gray-400 mt-4">
          <summary className="cursor-pointer hover:text-gray-600">
            Debug: Cursor Info
          </summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(cursor, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

// Alternative: Infinite scroll component that works with cursor pagination
export function InfiniteScrollTrigger({
  hasMore,
  loading,
  onLoadMore,
  threshold = 200,
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}) {
  const handleScroll = () => {
    if (
      hasMore &&
      !loading &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - threshold
    ) {
      onLoadMore();
    }
  };

  // Attach scroll listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, onLoadMore]);

  if (!hasMore) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-sm">End of results</div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      {loading ? (
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          Loading more products...
        </div>
      ) : (
        <button
          onClick={onLoadMore}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Load More Products
        </button>
      )}
    </div>
  );
}
