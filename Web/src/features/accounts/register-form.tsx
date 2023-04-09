import { clsx } from "clsx";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";
import { WretchError } from "wretch";
import * as Yup from "yup";

import TextInput from "../../common/form/text-input";
import { useStore } from "../../stores/store";
import ValidationErrors from "../errors/validation-errors";

const registerSchema = Yup.object({
  displayName: Yup.string().required("Display name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const { userStore, modalStore } = useStore();

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        apiErrors: {},
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .then(() => {
            navigate("/activities");
            modalStore.closeModal();
          })
          .catch((error: WretchError) => {
            if (error.json.errors) {
              setErrors({ apiErrors: error.json.errors });
            }
          })
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          className={clsx("ui form error")}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to ReactxNet"
            color="blue"
            textAlign="center"
          />
          <TextInput placeholder="Display Name" name="displayName" />
          <TextInput placeholder="Username" name="username" />
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="apiErrors"
            render={() => <ValidationErrors errors={errors.apiErrors ?? {}} />}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
