/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/page.tsx
"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { Container, Typography } from "@mui/material";
import ArtworkList from "./components/ArtworkList";
import PaginationCount from "./components/pagination";

// フェッチャー関数を定義
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 最初のAPIリクエストで絵画IDを取得
  const { data, error, isLoading } = useSWR(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11",
    fetcher
  );

  // 絵画IDの取得が完了した場合にのみ絵画の詳細を取得
  const artworkIds = data?.objectIDs.slice(0, 100) || [];

  // 絵画の詳細情報を個別に取得する関数
  const fetchArtworkDetailsList = async () => {
    const promises = artworkIds.map(async (id: number) => {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      if (!response.ok) throw new Error("Artwork fetch failed");
      return response.json();
    });
    const fetchedArtworks = await Promise.all(promises);
    return fetchedArtworks.filter(
      (artwork) => artwork.artistNationality === "Italian"
    );
  };

  // useSWRを使って絵画詳細情報の取得を行う
  const {
    data: artworks,
    error: artworksError,
    isLoading: artworksLoading,
  } = useSWR(
    artworkIds.length > 0 ? "fetchArtworkDetailsList" : null, // フェッチャーが null の場合はフェッチを行わない
    artworkIds.length > 0 ? fetchArtworkDetailsList : null
  );

  if (artworksError) {
    return (
      <Typography color="error">絵画の詳細取得に失敗しました。</Typography>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Metropolitan Museum of Art Gallery
      </Typography>
      <ArtworkList
        artworks={artworks || []}
        loading={artworksLoading || !artworks}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
      <PaginationCount
        totalItems={artworks?.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default HomePage;
