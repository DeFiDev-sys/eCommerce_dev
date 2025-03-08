import { Box, Badge, Image, Text, Flex, IconButton } from "@chakra-ui/react";
import { Skeleton } from "./ui/skeleton";
import { FaExpandArrowsAlt } from "react-icons/fa";
import React, { useState } from "react";
import { addToFavorites, removeFromFavorites } from "../reduxs/actions/apis/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";

const ProductsCards = ({ products, loading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.products);
  const [isShown, setIsShown] = useState(false);

  return (
    <Skeleton loading={loading}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionBehavior: "smooth", transitionDuration: "0.5s" }}
        overflow={"hidden"}
        p='4'
        borderWidth={"1px"}
        shadow={"md"}
        mx={"2"}>
        <Image
          onMouseEnter={() => {
            setIsShown(true);
          }}
          onMouseLeave={() => {
            setIsShown(false);
          }}
          src={products.images[isShown && products.images.length === 2 ? 1 : 0]}
          alt={products.name}
          height={"200px"}
        />
        {products.stock < 5 ? (
          <Badge px={"2"} colorPalette={"yellow"}>
            only {products.stock} left
          </Badge>
        ) : products.stock < 1 ? (
          <Badge px={"2"} colorPalette={"red"}>
            out of stock : {products.stock}
          </Badge>
        ) : (
          <Badge px={"2"} colorPalette='green'>
            In stock : {products.stock}
          </Badge>
        )}

        {products.productIsNew && (
          <Badge px={"2"} ml={"2"} colorPalette={"blue"}>
            New
          </Badge>
        )}

        <Text lineClamp={1} fontSize={"xl"} fontWeight={"semibold"} mt={"2"}>
          {products.brand} {` `} {products.name}
        </Text>

        <Text lineClamp={2} fontSize={"md"} fontWeight={"normal"} mt={"2"}>
          {products.subtitle}
        </Text>

        <Flex justify={"space-between"} gapX={"2"} alignItems={"center"} mt={"2"}>
          <Badge px={"2"} colorPalette={"cyan"}>
            {products.category}
          </Badge>
          <Text color={"cyan.600"}>${products.price}</Text>
        </Flex>

        <Flex justify={"space-between"} alignItems={"center"} mt={"2"}>
          {favorites.includes(products._id) ? (
            <IconButton
              variant={"ghost"}
              size={"sm"}
              bgColor={"blue.400"}
              onClick={() => dispatch(removeFromFavorites(products._id))}>
              <MdFavorite size={"20px"} color='black' />
            </IconButton>
          ) : (
            <IconButton
              variant={"ghost"}
              sm={"sm"}
              bgColor={"blue.400"}
              onClick={() => dispatch(addToFavorites(products._id))}>
              <MdFavoriteBorder size={"20px"} color='black' />
            </IconButton>
          )}
          <IconButton color={"gray.900"} bgColor={"blue.400"} as={ReactLink} to={`/product/${products._id}`}>
            <FaExpandArrowsAlt size={"2px"} />
          </IconButton>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductsCards;
