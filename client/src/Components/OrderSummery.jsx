import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue as Mode } from "../Components/ui/color-mode";
import { FaArrowRight } from "react-icons/fa";

const OrderSummery = () => {
  const { subTotal, shipping } = useSelector((state) => state.cart);
  return (
    <Stack
      minWidth={"300px"}
      gap={"8"}
      borderWidth={"1px"}
      borderColor={Mode("cyan.500", "cyan.100")}
      rounded={"lg"}
      padding={"8"}
      w={"full"}>
      <Heading>Order Summery</Heading>
      <Stack gap={"6"}>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"medium"} color={Mode("gray.600", "gray.400")}>
            Subtotal
          </Text>
          <Text fontSize={"medium"}>${subTotal}</Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"medium"} color={Mode("gray.600", "gray.400")}>
            Shipping
          </Text>
          <Text fontSize={"medium"}>${shipping}</Text>
        </Flex>
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"xl"}>Total</Text>
          <Text fontSize={"medium"}>${Number(subTotal) + Number(shipping)}</Text>
        </Flex>
        <Button as={ReactLink} to={"/checkout"} colorPalette={"cyan"} size={"lg"}>
          Checkout
          <FaArrowRight />
        </Button>
      </Stack>
    </Stack>
  );
};

export default OrderSummery;
