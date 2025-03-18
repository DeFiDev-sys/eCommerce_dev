import { AbsoluteCenter, Alert, Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as ReactLink } from "react-router-dom";
import { VerifyEmail } from "../reduxs/actions/apis/UserAction";

const EmailVerificationScreen = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(VerifyEmail(token));
  }, [token, dispatch]);

  return (
    <Center maxH={"90vh"}>
      <Box position={"relative"} minH={"3xl"}>
        <AbsoluteCenter axis={"both"} flexDirection={"column"} gap={"4"}>
          {loading ? (
            <Box textAlign={"center"}>
              <Text fontSize={"3xl"}>We are working on verifying your email</Text>
              <Spinner size={"xl"} />
            </Box>
          ) : error === null ? (
            <Alert.Root
              status='success'
              flexDirection={"column"}
              gap={"2"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}>
              <Alert.Indicator boxSize={"16"} />
              <Alert.Title>Email Successfully verified.</Alert.Title>
            </Alert.Root>
          ) : (
            <Alert.Root
              status='error'
              flexDirection={"column"}
              gap={"2"}
              justifyContent={"center"}
              alignItems={"center"}>
              <Alert.Indicator boxSize={"16"} />
              <Alert.Content>
                <Alert.Title>Not Logged in</Alert.Title>
                <Alert.Description>Please Login then verify your email.{console.log(error)}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          {!loading && (
            <Text minW={"350px"} textAlign={"center"}>
              You can close the wimdows now.
            </Text>
          )}
        </AbsoluteCenter>
      </Box>
    </Center>
  );
};

export default EmailVerificationScreen;
