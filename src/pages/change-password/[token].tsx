import { Alert, AlertIcon, Box, Button, Link } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import NextLink from "next/link";

const ChangePassword = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const token = router.query.token as string;
  return (
    <Wrapper variant="small">
      {tokenError && (
        <Alert status="error">
          <AlertIcon />
          {tokenError}
          <NextLink href="/forgot-password">
            <Link> Forgot Pssword</Link>
          </NextLink>
        </Alert>
      )}
      <Formik
        initialValues={{
          newPassword: ""
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({ ...values, token });
          if (response.data?.changePassword.errors) {
            const errorMaps = toErrorMap(response.data.changePassword.errors); //usualy we call setErrors but here we can get token error in reponse
            // and we don't have token field in form, so we are handling it manually
            if ("token" in errorMaps) {
              setTokenError(errorMaps.token);
            }
            setErrors(errorMaps); // what if there is both the errors,
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          //custom input field
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="New password"
                label="New Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              backgroundColor="blue.300"
              isLoading={isSubmitting}
              color="white"
            >
              Reset
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
