import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) {
    return null;
  } else if (!data?.Me) {
    return (
      <Flex bg="tan" p={4}>
        <Box ml={"auto"}>
          <Link href="/login" mr={2}>
            Login
          </Link>
          <Link href="/register" mr={2}>
            Register
          </Link>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex bg="tan" p={4}>
        <Box ml={"auto"}>
          <Text>{data.Me.username}</Text>
        </Box>
        <Button ml={2} variant="link">
          Logout
        </Button>
      </Flex>
    );
  }
};
