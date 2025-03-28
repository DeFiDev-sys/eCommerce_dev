import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  Menu,
  Portal,
  Button,
  Alert,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue as Mode } from "./ui/color-mode";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../reduxs/actions/apis/ProductAction";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";
import { BiCart, BiChevronDown, BiLogInCircle, BiUserCheck } from "react-icons/bi";
import NavLink from "./NavLink";
import ColourToggle from "./ColourToggle";
import FavToggle from "./FavToggle";
import { FaBars, FaGoogle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { LogoutUser } from "../reduxs/actions/apis/UserAction";
import { toaster } from "../Components/ui/toaster";
import { googleLogout } from "@react-oauth/google";

const Link = [
  { name: "Products", route: "/products" },
  { name: "Hot Deals", route: "/hot-deals" },
  { name: "Contact", route: "/contacts" },
  { name: "Service", route: "/services" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoritesToggle } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { open, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const redirect = "/";
  const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false);

  const LogoutHandler = () => {
    googleLogout();
    dispatch(LogoutUser());
    navigate(redirect);
  };

  useEffect(() => {
    if (userInfo && userInfo.active) {
      setShowBanner(true);
    }
  }, [favoritesToggle, dispatch, location, userInfo]);

  return (
    <>
      <Box bg={Mode("cyan.300", "gray.900")} px={"4"} position={"sticky"} top={"0"} zIndex={"50"}>
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          {/* Mobile view */}
          <Flex display={{ base: "flex", md: "none" }} alignItems={"center"}>
            <IconButton variant={"plain"} bg={"parent"} size={"md"} onClick={open ? onClose : onOpen}>
              {open ? <IoClose /> : <FaBars />}
            </IconButton>
            <Icon ml={"12"} position={"absolute"} as={ReactLink} to={"/cart"}>
              <BiCart size={"20px"} />
            </Icon>
            {cartItems.length > 0 && (
              <Text
                fontWeight={"bold"}
                fontStyle={"italic"}
                position={"absolute"}
                ml={"68px"}
                mt={"-6"}
                fontSize={"sm"}>
                {cartItems.length}
              </Text>
            )}
          </Flex>
          {/* Laptop view */}
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
              <>
                {userInfo && userInfo.isAdmin === false && (
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
                )}
              </>
              {/* Color mode */}
              <ColourToggle />
              {/* Fav Icons */}
              {location.pathname === "/products" && (
                <FavToggle dispatch={dispatch} favoritesToggle={favoritesToggle} toggleFavorites={toggleFavorites} />
              )}
            </HStack>
          </HStack>

          {/* Login menu */}
          <Flex alignItems={"center"}>
            {userInfo ? (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant='link' size='sm' rounded={"full"} cursor={"pointer"} minW={"0"}>
                    <HStack>
                      {userInfo.googleImage ? (
                        <Image
                          borderRadius={"full"}
                          boxSize={"40px"}
                          src={userInfo.googleImage}
                          referrerPolicy='no-referrer'
                        />
                      ) : (
                        <BiUserCheck size={"30px"} />
                      )}
                      <BiChevronDown />
                    </HStack>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.ItemGroup>
                        <HStack>
                          <Text px={"2"} as={"i"} fontStyle={"italic"}>
                            {userInfo.email}
                          </Text>
                          {userInfo.googleId && <FaGoogle />}
                        </HStack>
                        <Menu.Separator py={"1"} />
                        <Menu.Item as={ReactLink} to={"/order-history"} cursor={"pointer"}>
                          Order History
                        </Menu.Item>
                        <Menu.Item as={ReactLink} to={"/profile"} cursor={"pointer"}>
                          Profile
                        </Menu.Item>
                        {userInfo.isAdmin && (
                          <>
                            <Menu.Separator />
                            <Menu.Item as={ReactLink} to={"/admin-console"} cursor={"pointer"}>
                              Admin Console
                            </Menu.Item>
                          </>
                        )}
                        <Menu.Separator />
                        <Menu.Item onClick={LogoutHandler} cursor={"pointer"}>
                          Log Out
                        </Menu.Item>
                      </Menu.ItemGroup>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            ) : (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button as={IconButton} variant={"ghost"} cursor={"pointer"}>
                    <BiLogInCircle size={"25px"} />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        as={ReactLink}
                        to={"/login"}
                        variant={"link"}
                        p={"2"}
                        fontWeight={"400"}
                        cursor={"pointer"}>
                        Sign In
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item
                        as={ReactLink}
                        to={"/register"}
                        variant={"link"}
                        p={"2"}
                        fontWeight={"400"}
                        cursor={"pointer"}>
                        Sign Up
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
          </Flex>
        </Flex>

        {/* Mobile view */}
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
      <Box>
        {userInfo && !userInfo.active && showBanner && (
          <Alert.Root status='warning' justifyItems={"center"} alignItems={"center"}>
            <Alert.Indicator />
            <Alert.Content flexDirection={{ base: "column", md: "row" }} gap={"2"}>
              <Alert.Title>Email not Verified.</Alert.Title>
              <Alert.Description>An email has been sent to your mail.</Alert.Description>
            </Alert.Content>
            <Spacer />
            <IoClose
              size={"30px"}
              cursor={"pointer"}
              onClick={() => {
                setShowBanner(false);
              }}
            />
          </Alert.Root>
        )}
      </Box>
    </>
  );
};

export default Header;
