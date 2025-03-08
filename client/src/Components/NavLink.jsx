import { IconButton } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const NavLink = ({ children, route }) => (
  <IconButton as={ReactLink} p={"2"} rounded={"md"} variant={"ghost"} to={route}>
    {children}
  </IconButton>
);

export default NavLink;
