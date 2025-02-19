import { Box, Badge, Image, Text, Flex, IconButton } from "@chakra-ui/react";
import { Skeleton } from "./ui/skeleton";
import { FaExpandArrowsAlt } from "react-icons/fa";
import React from "react";

const ProductsCards = ({ products, loading }) => {
  return (
    <Skeleton asChild loading={loading} overflow={"hidden"}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionBehavior: "smooth", transitionDuration: "0.5s" }}
        overflow={"hidden"}
        p='4'
        borderWidth={"1px"}
        shadow={"md"}
        mx={"2"}>
        <Image src={products.images[0]} alt={products.name} height={"200px"} />
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

        <Badge px={"2"} colorPalette={"cyan"}>
          {products.category}
        </Badge>

        <Text lineClamp={1} fontSize={"md"} fontWeight={"normal"} mt={"2"}>
          {products.subtitle}
        </Text>

        <Flex justify={"space-between"} gapX={"2"} alignItems={"center"} mt={"2"}>
          <IconButton color={"gray.900"} bgColor={"gray.100"} mt={"2"}>
            <FaExpandArrowsAlt size={"10"} />
          </IconButton>
          <Text color={"cyan.600"}>${products.price}</Text>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductsCards;
