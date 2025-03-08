import { IconButton } from "@chakra-ui/react";
import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const FavToggle = ({ favoritesToggle, dispatch, toggleFavorites }) => {
  return (
    <>
      {favoritesToggle ? (
        <IconButton variant={"ghost"} onClick={() => dispatch(toggleFavorites(false))}>
          <MdFavorite size={"20px"} />
        </IconButton>
      ) : (
        <IconButton variant={"ghost"} onClick={() => dispatch(toggleFavorites(true))}>
          <MdFavoriteBorder size={"20px"} />
        </IconButton>
      )}
    </>
  );
};

export default FavToggle;
