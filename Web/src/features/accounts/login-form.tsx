import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Header, Message } from "semantic-ui-react";
import * as yup from "yup";

import TextInput from "../../common/form/text-input";
import { useStore } from "../../stores/store";

const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const navigate = useNavigate();
  const { userStore, modalStore } = useStore();
  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ email: "", password: "", apiError: "" }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login({ email: values.email, password: values.password })
          .then(() => {
            navigate("/activities");
            modalStore.closeModal();
          })
          .catch(() => setErrors({ apiError: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to ReactxNet"
            color="blue"
            textAlign="center"
          />
          <TextInput placeholder="Email" name="email" type="email" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="apiError"
            render={() => <Message negative>{errors.apiError}</Message>}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
