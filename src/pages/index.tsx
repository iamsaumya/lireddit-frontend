import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Feature = ({ title, textSnippet, id, creator }) => {
  return (
    <Box p={5} key={id} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">
        {title} {id}
      </Heading>
      <Text>posted by {creator.username}</Text>
      <Text mt={4}>{textSnippet}</Text>
    </Box>
  );
};

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string
  });
  const [{ data, fetching }] = usePostQuery({ variables });

  if (!fetching && !data) {
    return <Box>Query failed</Box>;
  } else if (!data) {
    return <Box>Loading</Box>;
  } else
    return (
      <Layout variant="regular">
        <Flex align="center">
          <Heading>LiReddit</Heading>
          <NextLink href="/create-post">
            <Link ml="auto">create post</Link>
          </NextLink>
        </Flex>
        <br />
        {data.posts &&
          data.posts.posts.map((d) => (
            <Stack spacing={8} key={d.id}>
              <Feature {...d} />
            </Stack>
          ))}
        {data.posts && data.posts.hasMore && (
          <Flex>
            <Button
              onClick={() =>
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt
                })
              }
              isLoading={fetching}
              m="auto"
              my={8}
            >
              load more
            </Button>
          </Flex>
        )}
      </Layout>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
