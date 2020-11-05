import { Button, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = () => {
  const router = useRouter();
  const toast = useToast();
  const [, forgotPassword] = useForgotPasswordMutation(); // generated by graphql code generator
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          email: ""
        }}
        onSubmit={async (values) => {
          const response = await forgotPassword(values);
          if (response.data?.forgotPassword) {
            toast({
              title: "Email sent.",
              description: "We've sent an email with reset link",
              status: "success",
              duration: 4000,
              isClosable: true
            });
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          //custom input field
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              type="email"
            />
            <Button
              type="submit"
              mt={4}
              backgroundColor="blue.300"
              isLoading={isSubmitting}
              color="white"
            >
              forgot password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
// in nextjs we have to export the default component
export default withUrqlClient(createUrqlClient, { ssr: true })(ForgotPassword);
