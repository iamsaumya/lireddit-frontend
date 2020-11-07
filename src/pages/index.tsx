import { Box } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { NavBar } from "../components/NavBar";
import { usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostQuery();
  console.log(data);

  return (
    <React.Fragment>
      <NavBar />
      <Box>Hello World</Box>
      {data &&
        data.posts.map((d) => (
          <Box key={d.id}>
            {d.title} {d.text}
          </Box>
        ))}
    </React.Fragment>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
