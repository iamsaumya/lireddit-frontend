import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

//6:23
const CreatePost: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer() //this line of code stops the me queery running from server as the session is not present on server.
  });
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (!data?.Me && !fetching) {
      router.replace("/login?next=" + router.pathname);
    }
  });

  if (fetching || isServer()) {
    //when the content is rendered on server it shows Loading... and when it is fetching on client it shows the same
    return <Box>Loading...</Box>;
  } else {
    return (
      <Layout variant="small">
        <Formik
          initialValues={{
            title: "",
            text: ""
          }}
          onSubmit={async (values) => {
            if (values.text !== "" && values.title !== "") {
              const { error } = await createPost(values);
              if (!error) {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            //custom input field
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <Box mt={4}>
                <InputField
                  textarea={true}
                  name="text"
                  placeholder="text"
                  label="Body"
                />
              </Box>
              <Button
                type="submit"
                mt={4}
                backgroundColor="blue.300"
                isLoading={isSubmitting}
                color="white"
              >
                Create Post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePost);
