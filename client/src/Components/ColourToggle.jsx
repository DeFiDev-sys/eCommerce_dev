import React from "react";
import { useColorMode } from "./ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

const ColourToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton variant={"plain"} onClick={toggleColorMode}>
      {colorMode === "dark" ? <BsSun /> : <BsMoon />}
    </IconButton>
  );
};

export default ColourToggle;
