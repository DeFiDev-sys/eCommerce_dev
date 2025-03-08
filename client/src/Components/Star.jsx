import { Icon } from "@chakra-ui/react";
import React from "react";
import { BiStar } from "react-icons/bi";

const Star = ({ rating = 0, star = 0 }) => (
  <Icon color={rating >= star || rating === 0 ? "cyan.500" : "gray.50"}>
    <BiStar />
  </Icon>
);

export default Star;
