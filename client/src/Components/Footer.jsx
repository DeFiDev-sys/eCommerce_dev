import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Icon,
  IconButton,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue as Mode } from "./ui/color-mode";
import { BsPhoneFlip } from "react-icons/bs";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <Box w={"100%"} bg={Mode("cyan.300", "gray.900")}>
    <Container as={"footer"} maxW={"7xl"}>
      <Stack
        gap={"8"}
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
        py={{ base: "12", md: "16" }}>
        <Stack gap={{ base: "6", md: "8" }} align={"start"}>
          <Flex alignItems={"center"}>
            <Icon h={"10"} w={"10"} color={Mode("black", "yellow.200")}>
              <BsPhoneFlip />
            </Icon>
            <Text fontSize={"2xl"} fontWeight={"extrabold"}>
              Jay Techs
            </Text>
          </Flex>
          <Text color={"muted"}>We love phones.</Text>
        </Stack>
        <Stack direction={{ base: "column-reverse", md: "column", lg: "row" }} gap={{ base: "12", md: "8" }}>
          <Stack direction={"row"} gap={"8"}>
            <Stack gap={"4"} minW={"36"} flex={"1"}>
              <Text fontSize={"md"} fontWeight={"semibold"} color={"subtle"}>
                Product
              </Text>
              <Stack gap={"3"} shouldWrapChildren>
                <Text as={"a"} href='#' cursor={"pointer"} fontSize={"sm"}>
                  How it works
                </Text>
                <Text as={"a"} href='#' cursor={"pointer"} fontSize={"sm"}>
                  Pricing
                </Text>
              </Stack>
            </Stack>
            <Stack gap={"4"} minW={"36"} flex={"1"}>
              <Text fontSize={"md"} fontWeight={"semibold"} color={"subtle"}>
                Legal
              </Text>
              <Stack gap={"3"} shouldWrapChildren>
                <Text as={"a"} href='#' fontSize={"sm"} cursor={"pointer"}>
                  Privacy
                </Text>
                <Text as={"a"} href='#' fontSize={"sm"} cursor={"pointer"}>
                  Terms
                </Text>
                <Text as={"a"} href='#' fontSize={"sm"} cursor={"pointer"}>
                  License
                </Text>
              </Stack>
            </Stack>
          </Stack>

          <Stack gap={"4"}>
            <Text fontSize={"sm"} fontWeight={"semibold"} color={"subtle"}>
              Stay up to date
            </Text>
            <Stack gap={"4"} direction={{ base: "column", sm: "row" }} maxW={{ lg: "360px" }}>
              <Input placeholder='Enter your email' type='email' required />
              <Button variant={"ghost"} type='submit' flexShrink={"0"} rounded={"lg"}>
                Subcribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Separator />
      <Stack
        pt={"8"}
        pb={"12"}
        justify={"space-between"}
        direction={{ base: "column-reverse", md: "row" }}
        align={"center"}>
        <Text fontSize={"sm"} color={"subtle"}>
          &copy; {new Date().getFullYear()} Jay Techs, Inc. All rights reserved.
        </Text>
        <ButtonGroup>
          <IconButton as={"a"} href='#'>
            <FaLinkedin fontSize={"1.25rem"} />
          </IconButton>
          <IconButton as={"a"} href='#'>
            <FaGithub fontSize={"1.25rem"} />
          </IconButton>
          <IconButton as={"a"} href='#'>
            <FaFacebook fontSize={"1.25rem"} />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
