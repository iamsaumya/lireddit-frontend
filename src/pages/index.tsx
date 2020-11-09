import { Box, Heading, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Feature = ({ title, desc }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null
    }
  });

  return (
    <Layout variant="regular">
      {data &&
        data.posts.map((d) => (
          <Stack spacing={8} key={d.id}>
            <Feature title={d.title} desc={d.textSnippet} />
          </Stack>
        ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
