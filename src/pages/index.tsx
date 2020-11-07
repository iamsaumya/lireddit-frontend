import { Box } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null
    }
  });

  return (
    <Layout variant="small">
      <Box>Hello World</Box>
      {data &&
        data.posts.map((d) => (
          <Box key={d.id}>
            {d.title} {d.text}
          </Box>
        ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
