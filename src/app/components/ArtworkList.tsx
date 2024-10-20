// src/app/components/ArtworkList.tsx
"use client";
import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";

export interface Artwork {
  artistNationality: string;
  country: string;
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImageSmall: string | null;
  culture: string;
  period: string;
}

// pagination
interface ArtworkListProps {
  artworks: Artwork[];
  loading: boolean;
  itemsPerPage: number;
  currentPage: number;
}

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  loading,
  itemsPerPage,
  currentPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = artworks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {currentArtworks.map((artwork) => (
            <Grid item xs={12} sm={6} md={4} key={artwork.objectID}>
              <Card>
                <CardMedia
                  component="img"
                  alt={artwork.title}
                  image={artwork.primaryImageSmall || "/placeholder-image.jpg"}
                  title={artwork.title}
                  height="250"
                />
                {/* 作品タイトル */}
                <Typography variant="h6">{artwork.title}</Typography>
                {/* 作者 */}
                <Typography variant="body2">
                  {artwork.artistDisplayName}
                </Typography>
                {/* 製造日 */}
                <Typography variant="body2">{artwork.objectDate}</Typography>
                {/* 言語 */}
                <Typography variant="body2">
                  {artwork.artistNationality}
                </Typography>
                <Typography variant="body2">{artwork.culture}</Typography>
                <Typography variant="body2">{artwork.period}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ArtworkList;
