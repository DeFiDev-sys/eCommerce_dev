import { Field as FormControl, Input } from "@chakra-ui/react";
import { Field, useField } from "formik";

const TextField = ({ type, label, name, placeholder }) => {
  const [field, meta] = useField({ type, name, placeholder });
  return (
    <FormControl.Root invalid={meta.error && meta.touched} mb={"6"}>
      <FormControl.Label noOfLines={1}>{label}</FormControl.Label>
      <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
      <FormControl.ErrorText>{meta.error}</FormControl.ErrorText>
    </FormControl.Root>
  );
};

export default TextField;
