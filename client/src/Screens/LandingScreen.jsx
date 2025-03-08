import React from "react";

import { Box, Flex, Heading, HStack, Icon, Image, Link, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue as Mode } from "../Components/ui/color-mode";
import { Link as ReactLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { BsPhoneFlip } from "react-icons/bs";

const LandingScreen = () => (
  <Box maxW={"8xl"} mx={"auto"} p={{ base: 0, lg: 12 }} minH={"6xl"}>
    <Stack direction={{ base: "column-reverse", lg: "row" }} gap={{ base: "0", lg: "20" }}>
      <Box
        width={{ lg: "sm" }}
        transform={{ base: "translateY(-50%)", lg: "none" }}
        bg={{ base: Mode("cyan.50", "gray.700"), lg: "transparent" }}
        mx={{ base: "6", md: "8", lg: "0" }}
        p={{ base: "6", md: "8", lg: "0" }}
        my={{ base: "6", md: "8", lg: "12" }}>
        <Stack gap={{ base: "8", lg: "10" }}>
          <Stack gap={{ base: "2", lg: "4" }}>
            {/* Data goes here */}
            <Flex alignItems={"center"}>
              <Icon as={BsPhoneFlip} h={12} w={12} color={Mode("cyan.500", "yellow.200")} />
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                Jay Techs
              </Text>
            </Flex>
            <Heading size={"xl"} fontWeight={"normal"}>
              Get The Latest From Us
            </Heading>
          </Stack>
          <HStack gap={"3"}>
            <Link as={ReactLink} to='/products' color={Mode("cyan.500", "yellow.200")}>
              Discover More From Us
            </Link>
            <Icon as={FaArrowRight} h={6} w={6} color={Mode("cyan.500", "yellow.200")} />
          </HStack>
        </Stack>
      </Box>
      <Flex flex={"1"} overflow={"hidden"}>
        <Image
          src={Mode("images/landing-light.jpg", "images/landing-dark.jpg")}
          fallback={<Skeleton />}
          maxH={"500px"}
          minW={"300px"}
          objectFit={"cover"}
          flex={"1"}
        />
      </Flex>
    </Stack>
  </Box>
);
export default LandingScreen;
