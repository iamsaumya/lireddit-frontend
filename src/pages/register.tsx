import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUT = `
mutation Register ($username:String!,$password: String!){
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
      username
      id
      createdAt
      updatedAt
    }
  }
}
`;

const register: React.FC<registerProps> = () => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={async (values) => {
          const response = await register(values);
        }}
      >
        {({ isSubmitting }) => (
          //custom input field
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
// in nextjs we have to export the default component
export default register;
