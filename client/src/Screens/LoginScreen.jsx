import { Alert, Box, Button, Container, Heading, Stack, Text, Field as FormControl } from "@chakra-ui/react";
import { Link as ReactLink, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toaster, toaster } from "../Components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoginUser } from "../reduxs/actions/apis/UserAction";
import TextField from "../Components/TextField";
import PasswordField from "../Components/PasswordField";
import PassowrdForgettenForm from "../Components/PassowrdForgettenForm";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = "/products";
  const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toaster.create({
        description: "Login successful",
        type: "success",
        duration: 50000,
      });
    }

    if (serverMsg) {
      toaster.create({
        description: `${serverMsg}`,
        type: "success",
      });
    }
  }, [userInfo, location.state, redirect, error, navigate, serverMsg, showPasswordReset]);

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("An email is required."),
          password: Yup.string()
            .min(1, "Password is short - must be more than one character.") //min of 1 for testing purposes
            .required("Password is required."),
        })}
        onSubmit={(values) => {
          toaster.create({
            description: "Logging in...",
            type: "info",
          });
          dispatch(LoginUser(values.email, values.password));
        }}>
        {(formik) => (
          <Container maxW={"lg"} py={{ base: "12", md: "18" }} px={{ base: "0", md: "8" }} minH={"4xl"}>
            <Stack gap={"8"}>
              <Stack gap={"6"}>
                <Stack gap={{ base: "2", md: "3" }} textAlign={"center"}>
                  <Heading fontSize={{ base: "md", lg: "xl" }}>Log in to your account</Heading>
                  <Text>Don't have an account?</Text>

                  <Button as={ReactLink} variant={"link"} color={"cyan"} to={"/register"}>
                    Sign up
                  </Button>
                </Stack>
              </Stack>

              <Box
                py={{ base: "0", md: "8" }}
                px={{ base: "4", md: "10" }}
                bg={{ base: "transparent", md: "bg-surface" }}
                boxShadow={{ base: "none", md: "xl" }}>
                <Stack gap={"6"} as={"form"} onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert.Root
                      status='error'
                      height={"fit"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      textAlign={"center"}
                      alignItems={"center"}>
                      <Alert.Indicator boxSize={"8"} />
                      <Alert.Content>
                        <Alert.Title>We are sorry! An Error Occured</Alert.Title>
                        <Alert.Description>User Details not found.{console.log(error)}</Alert.Description>
                      </Alert.Content>
                    </Alert.Root>
                  )}

                  <Stack gap={"5"}>
                    <FormControl.Root>
                      <TextField label={"Email"} placeholder={"yoy@example.com"} name={"email"} type={"text"} />
                      <PasswordField
                        label={"Password"}
                        placeholder={"Enter Password"}
                        name={"password"}
                        type={"password"}
                      />

                      <Button
                        my={"3"}
                        w={"50%"}
                        onClick={() => {
                          setShowPasswordReset(!showPasswordReset);
                        }}
                        size={"sm"}
                        colorPalette={"cyan"}
                        variant={"outline"}>
                        Forget Password?
                      </Button>
                      {showPasswordReset && <PassowrdForgettenForm />}
                    </FormControl.Root>
                  </Stack>
                  <Stack gap={""}>
                    <Button colorPalette={"cyan"} type='submit' size={"lg"} loading={loading}>
                      Sign In
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

export default LoginScreen;
