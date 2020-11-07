import { Box } from "@chakra-ui/core";
import React from "react";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular"
}) => {
  return (
    <Box
      maxW={variant == "regular" ? "800px" : "400px"}
      mt="8"
      marginX="auto"
      width="100%"
    >
      {children}
    </Box>
  );
};
