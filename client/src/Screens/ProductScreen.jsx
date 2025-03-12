import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../reduxs/actions/apis/ProductAction";
import {
  Alert,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Star from "../Components/Star";
import { BiCheckShield, BiMinus, BiPackage, BiPlus, BiSupport } from "react-icons/bi";
import { addCartItem } from "../reduxs/actions/apis/CartActions";
import { Toaster, toaster } from "../Components/ui/toaster";

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const changeAmonut = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, amount));
    } else {
      dispatch(addCartItem(id, amount));
    }
    toaster.create({
      description: "Item has been added",
      type: "success",
      duration: 5000,
    });
  };

  return (
    <Wrap>
      {loading ? (
        <Stack direction={"row"} gap={"4"} minH={"100vh"}>
          <Spinner
            mt={"20"}
            textDecorationThickness={"2px"}
            speed={"0.65s"}
            emptyColor='gray.200'
            color={"cyan.500"}
            size={"xl"}
          />
        </Stack>
      ) : error ? (
        <Alert.Root status='error' height={"fit"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>We are sorry! An Error Occured</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx={"auto"}
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}>
            <Stack direction={{ base: "coloumn", lg: "row" }} align={"flex-start"}>
              <Stack pr={{ base: "0", md: "row" }} flex={"1.5"} mb={{ base: "12", md: "none" }}>
                {product.productIsNew && (
                  <Badge p={"2"} rounded={"md"} w={"50px"} fontSize={"0.8em"} colorPalette={"green"}>
                    New
                  </Badge>
                )}

                {product.stock === 0 && (
                  <Badge rounded={"full"} w={"70px"} colorPalette={"red"}>
                    Sold out
                  </Badge>
                )}
                <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
                  {product.brand} {product.name}
                </Heading>

                <Stack gap={"5"}>
                  <Box>
                    <Text fontSize={"xl"}>$ {product.price}</Text>
                    <Flex>
                      <HStack gap={"2px"}>
                        <Star color='cyan' />
                        <Star rating={product.rating} star={2} />
                        <Star rating={product.rating} star={3} />
                        <Star rating={product.rating} star={4} />
                        <Star rating={product.rating} star={5} />
                      </HStack>
                      <Text fontSize={"md"} fontWeight={"bold"} ml={"4px"}>
                        {product.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.subtitle}</Text>
                  <Text>{product.description}</Text>
                  <Text fontWeight={"bold"}>Quantity</Text>
                  <Flex w={"170px"} p={"5px"} border={"2px"} borderColor={"gray.300"} alignItems={"center"}>
                    <Button
                      disabled={amount <= 1}
                      onClick={() => {
                        changeAmonut("minus");
                      }}>
                      <BiMinus />
                    </Button>
                    <Text mx={"30px"}>{amount}</Text>
                    <Button
                      disabled={amount >= product.stock}
                      onClick={() => {
                        changeAmonut("plus");
                      }}>
                      <BiPlus />
                    </Button>
                  </Flex>
                  <Badge fontSize={"lg"} w={"170px"} textAlign={"center"} colorPalette={"green"}>
                    In Stock: {product.stock}
                  </Badge>
                  <Button variant={"outline"} disabled={product.stock === 0} colorPalette={"cyan"} onClick={addItem}>
                    Add to Cart
                  </Button>

                  <Stack width={"270px"}>
                    <Flex alignItems={"center"}>
                      <BiPackage size={"20px"} />
                      <Text fontSize={"sm"} fontWeight={"medium"} ml={"2"}>
                        Shipped in 2 Days
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <BiCheckShield size={"20px"} />
                      <Text fontWeight={"medium"} fontSize={"sm"} ml={"2"}>
                        2 years warranty
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <BiSupport size={"20px"} />
                      <Text fontWeight={"medium"} fontSize={"sm"} ml={"2"}>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction={"column"} alignItems={"center"} gapY={"2px"} flex={"1"} _dark={{ bg: "gray.900" }}>
                <Image src={product.images[0]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
                <Image src={product.images[1]} alt={product.name} fallbackSrc='https://via.placeholder.com/250' />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Reviews
              </Text>
              <SimpleGrid minChildWidth={"300px"} gapX={"40px"} gapY={"20px"}>
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex gap={"2px"} alignItems={"center"}>
                      <Star color='cyan' />
                      <Star rating={product.rating} star={2} />
                      <Star rating={product.rating} star={3} />
                      <Star rating={product.rating} star={4} />
                      <Star rating={product.rating} star={5} />
                      <Text fontWeight={"semibold"} ml={"4px"}>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py={"12px"}>{review.comment}</Box>
                    <Text fontSize={"sm"} color={"gray.400"}>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
      <Toaster />
    </Wrap>
  );
};

export default ProductScreen;
