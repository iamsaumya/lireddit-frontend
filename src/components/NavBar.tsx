import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer() //this line of code stops the me queery running from server as the session is not present on server.
  });

  console.log(fetching, data);
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  if (fetching || isServer()) {
    return <Box>Fetching</Box>;
  } else if (!data?.Me) {
    return (
      <Flex bg="tan" p={4}>
        <Box ml={"auto"}>
          <NextLink href="/login">
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link mr={2}>Register</Link>
          </NextLink>
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
