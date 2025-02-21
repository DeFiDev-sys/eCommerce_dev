import { Box, Button, Center, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductsCards from "../Components/ProductsCards";
// import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../reduxs/actions/apis/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductsScreen = () => {
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProduct,
  //   retry: 2,
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });
  const dispatch = useDispatch();
  const { products, loading, pagination, favoritesToggle } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(1));
  }, [dispatch]);

  const pageinationClickButton = (page) => {
    dispatch(getProduct(page));
  };

  return (
    <>
      {products.length >= 1 && (
        <Box>
          <Wrap
            spacing={"30px"}
            justify={"center"}
            my={"5"}
            minHeight={"fit"}
            mx={{ base: "1", sm: "12", md: "48", lg: "64" }}>
            {products.map((product) => (
              <WrapItem key={product._id}>
                <Center w={"250px"} h={"450px"}>
                  <ProductsCards products={product} loading={loading} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
          {!favoritesToggle && (
            <Wrap spacing={"10px"} justify={"center"} p={"5"}>
              <Button
                bgColor={"blue.400"}
                onClick={() => {
                  pageinationClickButton(1);
                }}>
                <FaArrowLeft />
              </Button>

              {Array.from(Array(pagination.totalPage), (e, i) => {
                return (
                  <Button
                    key={i}
                    onClick={() => {
                      pageinationClickButton(i + 1);
                    }}
                    bgColor={pagination.currentPage === i + 1 ? "blue.400" : "gray.400"}>
                    {i + 1}
                  </Button>
                );
              })}

              <Button
                bgColor={"blue.400"}
                onClick={() => {
                  pageinationClickButton(pagination.totalPage);
                }}>
                <FaArrowRight />
              </Button>
            </Wrap>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
