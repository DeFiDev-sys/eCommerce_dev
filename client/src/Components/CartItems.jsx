import { addCartItem, removeItem } from "../reduxs/actions/apis/CartActions";
import { Flex, VStack, Text, CloseButton, Spacer, Image, Box } from "@chakra-ui/react";
import { useColorModeValue as Mode } from "../Components/ui/color-mode";
import { useSelector, useDispatch } from "react-redux";

const CartItems = ({ cartItem }) => {
  const { id, name, image, price, stock, qty, brand } = cartItem;
  const dispatch = useDispatch();

  return (
    <Flex minWidth={"300px"} borderWidth={"1px"} rounded={"lg"} align={"center"}>
      <Image rounded={"lg"} w={"120px"} fit={"cover"} h={"120px"} src={image} />
      <VStack p={"2"} w={"100%"} gap={"4"} align={"stretch"}>
        <Flex alignItems={"center"} justify={"space-between"}>
          <Text fontSize={"medium"}>
            {brand} {name}
          </Text>
          <Spacer />
          <CloseButton
            onClick={() => {
              dispatch(removeItem(id));
            }}
          />
        </Flex>
        <Spacer />
        <Flex alignItems={"center"} justify={"space-between"}>
          <Box
            as='select'
            maxW='68px'
            px='2'
            py='1'
            borderRadius='md'
            borderWidth='2px'
            borderColor={Mode("cyan.500", "cyan.200")}
            bg={Mode("white", "gray.800")}
            color={Mode("black", "white")}
            outline='none'
            cursor='pointer'
            _focus={{ borderColor: "cyan.400", boxShadow: "0 0 5px cyan" }}
            value={qty}
            onChange={(e) => dispatch(addCartItem(id, Number(e.target.value)))}>
            {[...Array(stock).keys()].map((item) => (
              <option key={item + 1} value={item + 1}>
                {item + 1}
              </option>
            ))}
          </Box>

          <Text fontWeight={"bold"}>${price}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default CartItems;
