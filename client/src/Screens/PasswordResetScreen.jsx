import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toaster } from "../Components/ui/toaster";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  Field as FormControl,
} from "@chakra-ui/react";
import { ResetState, RestPassword } from "../reduxs/actions/apis/UserAction";
import { Link as ReactLink } from "react-router-dom";
import PasswordField from "../Components/PasswordField";

const PasswordResetScreen = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error, serverMsg, serverResStatus } = useSelector((state) => state.user);

  const handingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (serverMsg && serverResStatus) {
      toaster.create({
        description: `${serverMsg}`,
        type: "success",
        duration: 4000,
      });
    }
    dispatch(ResetState());
  }, [error, loading, serverMsg, serverResStatus, dispatch]);
  return serverResStatus ? (
    <Center minH={"90vh"}>
      <VStack direction={"column"} gap={"2"}>
        <Alert.Root
          status='success'
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          height={"fit"}>
          <Alert.Indicator />
        </Alert.Root>
        <Text my={"10"} fontSize={"xl"}>
          Password reset successfully
        </Text>
        <Button as={ReactLink} to={"/login"} variant={"outline"} colorPalette={"cyan"} w={"300px"}>
          Log In
        </Button>
        <Button as={ReactLink} to={"/products"} variant={"outline"} colorPalette={"cyan"} w={"300px"}>
          Proceed to the products
        </Button>
      </VStack>
    </Center>
  ) : (
    <>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(1, "Password is short - must be more than one character.") //min of 1 for testing purposes
            .required("Password is required."),
          confirmPassowrd: Yup.string()
            .min(1, "Password is short - must be more than one character.") //min of 1 for testing purposes
            .required("Password is required.")
            .oneOf([Yup.ref("password"), null], "Password must match"),
        })}
        onSubmit={(values) => {
          toaster.create({
            description: `Your password has been reset successfully`,
            type: "success",
            duration: 4000,
          });
          dispatch(RestPassword(values.password, token));
        }}>
        {(formik) => (
          <Container maxW={"lg"} py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }} minH={"4xl"}>
            <Stack gap={"8"}>
              <Stack gap={"6"}>
                <Stack gap={{ base: "2", md: "3" }} textAlign={"center"}>
                  <Heading size={handingBR}>Reset your password</Heading>
                </Stack>
              </Stack>
              <Box
                py={{ base: "0", md: "8" }}
                px={{ base: "4", md: "10" }}
                bg={boxBR}
                boxShadow={{ base: "none", md: "xl" }}>
                <Stack gap={"6"} as={"form"} onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert.Root
                      status='error'
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      textAlign={"center"}
                      height={"fit"}>
                      <Alert.Indicator />
                      <Alert.Content>
                        <Alert.Title>We are sorry! An Error Occured</Alert.Title>
                        <Alert.Description>{console.log(error)}Try again</Alert.Description>
                      </Alert.Content>
                    </Alert.Root>
                  )}
                  <Stack gap={"5"}>
                    <FormControl.Root>
                      <PasswordField
                        label={"Password"}
                        placeholder={"Enter new Password"}
                        name={"password"}
                        type={"password"}
                      />
                      <PasswordField
                        label={"Confirm Password"}
                        placeholder={"Confirm your password"}
                        name={"confirmPassowrd"}
                        type={"password"}
                      />
                    </FormControl.Root>
                  </Stack>
                  <Stack gap={"6"}>
                    <Button colorPalette={"cyan"} size={"lg"} fontSize={"md"} loading={loading} type='submit'>
                      Set new Password
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default PasswordResetScreen;
