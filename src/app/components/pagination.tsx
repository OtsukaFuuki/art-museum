// src/app/components/PaginationCount.tsx
"use client";
import React from "react";
import { Pagination, Box } from "@mui/material";

interface PaginationCountProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationCount: React.FC<PaginationCountProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={(event, page) => {
          if (onPageChange) {
            onPageChange(page); // 関数が存在する場合のみ呼び出し
          }
        }}
        color="primary"
      />
    </Box>
  );
};

export default PaginationCount;
