import { Flex, IconButton, Box, Heading, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface PostProps {
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { id, points, title, creator, textSnippet, voteStatus } = post;
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex p={5} key={id} shadow="md" borderWidth="1px">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <IconButton
          variantColor={voteStatus === 1 ? "green" : undefined}
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState("updoot-loading");
            await vote({ postId: id, value: 1 });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "updoot-loading"}
          aria-label="updoot"
          icon="chevron-up"
        />
        {points}
        <IconButton
          variantColor={voteStatus === -1 ? "red" : undefined}
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState("downdoot-loading");
            await vote({ postId: id, value: -1 });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "downdoot-loading"}
          aria-label="downdoot"
          icon="chevron-down"
        />
      </Flex>
      <Box>
        <Heading fontSize="xl">
          {title} {id}
        </Heading>
        <Text>posted by {creator.username}</Text>
        <Text mt={4}>{textSnippet}</Text>
      </Box>
    </Flex>
  );
};
