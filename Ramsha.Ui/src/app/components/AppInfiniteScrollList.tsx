import { Box, Grid, RegularBreakpoints, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollProps<T> = {
  items?: T[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  renderItemCard: (item: T) => React.ReactNode;
  itemSkeleton?: React.ReactNode;
  renderLoader?: () => React.ReactNode;
  error?: React.ReactNode;
  style?: React.CSSProperties;
  itemsPerPage?: number,
  breakPoints?: RegularBreakpoints
};

const AppInfiniteScrollList = <T,>({
  items,
  hasMore,
  onLoadMore,
  isLoading = false,
  isLoadingMore = false,
  renderItemCard,
  itemSkeleton,
  error,
  style,
  breakPoints,
  itemsPerPage = 8,

}: InfiniteScrollProps<T>) => {
  const { ref, inView } = useInView({
    root: document.querySelector("#scroll-container"),
    threshold: 0.8,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (inView && hasMore) {
      onLoadMore();
    }
  }, [inView, hasMore, onLoadMore]);



  const renderLoader = (
    Array.from({ length: itemsPerPage }).map((_, index) => (
      <Grid item {...breakPoints}>
        {itemSkeleton}
      </Grid>
    ))
  )

  return (
    <Grid
      component="div"
      sx={{
        height: "100vh",
        overflowY: "scroll",
        display: "flex",
        ...style,
      }}
      id="scroll-container"
      container
      spacing={1}
    >
      {
        isLoading ?
          renderLoader :
          items && items.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 20,
              }}
            >
              <Typography>No items found!</Typography>
            </Box>
          ) : (
            items?.map((item, index) => (
              <Grid
                item
                {...breakPoints}
                key={index}
                ref={index === items.length - 1 ? ref : undefined}
              >
                {renderItemCard(item)}
              </Grid>
            ))
          )}

      {isLoadingMore && renderLoader}

      {error && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 20,
          }}
        >
          <Typography>{error}</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default AppInfiniteScrollList;
