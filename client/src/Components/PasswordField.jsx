import { Button, Field as FormControl, Input, Stack } from "@chakra-ui/react";
import { Field, useField } from "formik";
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const PasswordField = ({ type, label, name, placeholder }) => {
  const [field, meta] = useField({ type, name, placeholder });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl.Root invalid={meta.error && meta.touched} mb={"6"}>
      <FormControl.Label noOfLines={1}>{label}</FormControl.Label>
      <Stack direction='row' alignItems='center' width='full'>
        <Field as={Input} {...field} type={showPassword ? "text" : type} name={name} placeholder={placeholder} />
        <Button
          position={"absolute"}
          right={"0"}
          variant={"plain"}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}>
          {showPassword ? <LuEye /> : <LuEyeClosed />}
        </Button>
      </Stack>
      <FormControl.ErrorText>{meta.error}</FormControl.ErrorText>
    </FormControl.Root>
  );
};

export default PasswordField;
