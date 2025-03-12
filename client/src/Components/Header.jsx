import React, { useEffect } from "react";
import { Box, Flex, HStack, Icon, IconButton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useColorModeValue as Mode } from "./ui/color-mode";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../reduxs/actions/apis/ProductAction";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";
import { BiCart, BiUserCheck } from "react-icons/bi";
import NavLink from "./NavLink";
import ColourToggle from "./ColourToggle";
import FavToggle from "./FavToggle";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Link = [
  { name: "Products", route: "/products" },
  { name: "Hot Deals", route: "/hot-deals" },
  { name: "Contact", route: "/contacts" },
  { name: "Service", route: "/services" },
];

const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggle } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { open, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  useEffect(() => {}, [favoritesToggle, dispatch, location]);

  return (
    <Box bg={Mode("cyan.300", "gray.900")} px={"4"} position={"sticky"} top={"0"} zIndex={"50"}>
      <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
        <Flex display={{ base: "flex", md: "none" }} alignItems={"center"}>
          <IconButton variant={"plain"} bg={"parent"} size={"md"} onClick={open ? onClose : onOpen}>
            {open ? <IoClose /> : <FaBars />}
          </IconButton>
          <Icon ml={"12"} position={"absolute"} as={ReactLink} to={"/cart"}>
            <BiCart size={"20px"} />
          </Icon>
          {cartItems.length > 0 && (
            <Text fontWeight={"bold"} fontStyle={"italic"} position={"absolute"} ml={"68px"} mt={"-6"} fontSize={"sm"}>
              {cartItems.length}
            </Text>
          )}
        </Flex>
        <HStack gap={"8"} alignItems={"center"}>
          <Box alignItems={"center"} display={"flex"} as={ReactLink} to={"/"}>
            <Icon as={BsPhoneFlip} h={"6"} w={"6"} color={Mode("black", "yellow.300")} />
            <Text as={"b"}>Jay Techs</Text>
          </Box>
          {/* Link Nav */}
          <HStack as={"nav"} gap={"4"} display={{ base: "none", md: "flex" }}>
            {Link.map((link) => (
              <NavLink route={link.route} key={link.route}>
                <Text fontWeight={"medium"}>{link.name}</Text>
              </NavLink>
            ))}
            {/* Cart Icon */}
            <Box>
              <Icon as={ReactLink} to={"/cart"}>
                <BiCart size={"20px"} />
              </Icon>
              {cartItems.length > 0 && (
                <Text
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  position={"absolute"}
                  ml={"20px"}
                  mt={"-7"}
                  fontSize={"sm"}>
                  {cartItems.length}
                </Text>
              )}
            </Box>
            {/* Color mode */}
            <ColourToggle />
            {/* Fav Icons */}
            {location.pathname === "/products" ? (
              <FavToggle dispatch={dispatch} favoritesToggle={favoritesToggle} toggleFavorites={toggleFavorites} />
            ) : (
              ""
            )}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <BiUserCheck />
        </Flex>
      </Flex>
      <Box display={"flex"}>
        {open && (
          <Box pb={"4"} display={{ md: "none" }}>
            <Stack as={"nav"} gap={"4"}>
              {Link.map((link) => (
                <NavLink route={link.route} key={link.route}>
                  <Text fontWeight={"medium"}>{link.name}</Text>
                </NavLink>
              ))}
            </Stack>
            <FavToggle dispatch={dispatch} favoritesToggle={favoritesToggle} toggleFavorites={toggleFavorites} />
            <ColourToggle />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
