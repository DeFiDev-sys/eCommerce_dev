import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductsCards from "../Components/ProductsCards";
import axios from "axios";

const ProductsScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setData(response.data.products);
      })
      .catch((error) => {
        console.error("Error occured : ", error);
      });
  }, []);

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
                  <ProductsCards products={product} loading={false} />
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
