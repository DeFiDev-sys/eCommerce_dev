import { Alert, Box, Flex, Heading, HStack, Link, Spinner, Stack, Wrap } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useColorModeValue as Mode } from "../Components/ui/color-mode";
import CartItems from "../Components/CartItems";
import OrderSummery from "../Components/OrderSummery";

const CartScreen = () => {
  const { loading, error, cartItems } = useSelector((state) => state.cart);

  const getHeadingContent = () => (cartItems.length === 1 ? "(1item)" : `${cartItems.length} items`);
  return (
    <Wrap gap={"30px"} justify={"center"} minHeight={"100vh"}>
      {loading ? (
        <Stack direction={"row"} gap={"4"}>
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
      ) : cartItems.length <= 0 ? (
        <Alert.Root status='warning' height={"fit"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>We are sorry! An Error Occured</Alert.Title>
            <Alert.Description>
              <Link as={ReactLink} to={"/products"}>
                Click Here to see our Products!
              </Link>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : (
        <Box px={"4"} py={"8"} w={{ base: "95%", md: "70%", lg: "50%" }}>
          <Stack direction={{ base: "column", md: "row" }} align={{ lg: "flex-start" }} gap={{ base: "8", md: "16" }}>
            <Stack gap={{ base: "8", md: "10" }} flex={"2"}>
              <Heading fontSize={"2xl"} fontWeight={"bold"}>
                Shopping Cart
              </Heading>

              <Stack gap={"6"}>
                {cartItems.map((cartItem) => (
                  <CartItems key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction={"column"} align={"center"} flex={"1"}>
              <OrderSummery />

              <HStack mt={"6"} fontWeight={"semibold"}>
                <p>or</p>
                <Link as={ReactLink} to={"./products"} color={Mode("cyan.500", "cyan.200")}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;
