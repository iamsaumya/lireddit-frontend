import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          ml={2}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }
};
