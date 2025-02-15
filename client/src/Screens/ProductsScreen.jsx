import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProductsCards from "../Components/ProductsCards";
// import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../reduxs/actions/apis/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelector } from "../reduxs/slices/Projects";

const ProductsScreen = () => {
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProduct,
  //   retry: 2,
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });
  const dispatch = useDispatch();
  const data = useSelector(ProductSelector);
  const isLoading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {data.length > 1 && (
        <Box>
          <Wrap
            spacing={"30px"}
            justify={"center"}
            my={"5"}
            minHeight={"fit"}
            mx={{ base: "1", sm: "12", md: "48", lg: "64" }}>
            {data.map((product) => (
              <WrapItem key={product._id}>
                <Center w={"250px"} h={"450px"}>
                  <ProductsCards products={product} loading={isLoading} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </>
  );
};

export default ProductsScreen;
