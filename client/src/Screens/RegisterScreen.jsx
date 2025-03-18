import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Field as FormControl,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toaster } from "../Components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../reduxs/actions/apis/UserAction";
import TextField from "../Components/TextField";
import PasswordField from "../Components/PasswordField";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = "/products";
  const { loading, error, userInfo } = useSelector((state) => state.user);
  const headingBR = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBR = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toaster.create({
        description: userInfo.fistLogin ? "Account created welcome aboard" : `Welcome back ${userInfo.name}`,
        type: "success",
        duration: 5000,
      });
    }
  }, [navigate, dispatch, redirect, userInfo]);
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("A name is requried"),
        email: Yup.string().email("Invalid email").required("An email is required."),
        password: Yup.string()
          .min(1, "Password is short - must be more than one character.") //min of 1 for testing purposes
          .required("Password is required."),
        confirmPassowrd: Yup.string()
          .min(1, "Password is short - must be more than one character.") //min of 1 for testing purposes
          .required("Password is required.")
          .oneOf([Yup.ref("password"), null], "Password must match"),
      })}
      onSubmit={(values) => {
        dispatch(RegisterUser(values.name, values.email, values.password));
      }}>
      {(formik) => (
        <Container maxW='lg' py={{ base: "12", md: "18" }} px={{ base: "0", md: "8" }} minH='4xl'>
          <Stack gap={"8"}>
            <Stack gap={"6"}>
              <Stack gap={{ base: "2", md: "3" }} textAlign='center'>
                <Heading size={headingBR}>Create an account</Heading>
                <HStack gap={"1"} justify={"center"}>
                  <Text color='muted'>Already a user?</Text>
                  <Button as={ReactLink} to='/login' variant='link' color='cyan'>
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBR }}
              boxShadow={{ base: "none", md: "xl" }}>
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert.Root
                    status='error'
                    flexDirection={"column"}
                    gap={"2"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}>
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Title>We are sorry! An Error Occured</Alert.Title>
                      <Alert.Description>{error}</Alert.Description>
                    </Alert.Content>
                  </Alert.Root>
                )}
                <Stack gap={"5"}>
                  <FormControl.Root>
                    <TextField
                      name={"name"}
                      placeholder={"Your first and last name"}
                      label={"Full Name"}
                      type={"text"}
                    />
                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                    <PasswordField type='password' name='password' placeholder='Your password' label='Password' />
                    <PasswordField
                      type='password'
                      name='confirmPassowrd'
                      placeholder='Confirm password'
                      label='Confirm Passowrd'
                    />
                  </FormControl.Root>
                </Stack>
                <Stack gap={"6"}>
                  <Button colorPalette='cyan' size='lg' fontSize='md' loading={loading} type='submit'>
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterScreen;
