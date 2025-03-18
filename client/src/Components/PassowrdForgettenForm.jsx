import { Text, Box, Button, Input, Stack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { SendRestEmail } from "../reduxs/actions/apis/UserAction";
import { toaster } from "./ui/toaster";

const PassowrdForgettenForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Box my={"4"}>
        <Text as={"b"}>Enter your email address below</Text>
        <Text>We will send an email link to reset your password</Text>
      </Box>
      <Stack minW={"full"}>
        <Input
          mb={"4"}
          type='text'
          name='email'
          placeholder='Please enter your email'
          aria-label='email'
          value={email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Button
          my={"5"}
          colorPalette={"yellow"}
          size={"lg"}
          fontSize={"md"}
          onClick={() => {
            dispatch(SendRestEmail(email));
          }}>
          Send reset email
        </Button>
      </Stack>
    </>
  );
};

export default PassowrdForgettenForm;
