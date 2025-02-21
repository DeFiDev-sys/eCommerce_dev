import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../reduxs/actions/apis/ProductAction";

const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggle } = useSelector((state) => state.products);
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

export default Header;
