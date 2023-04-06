import { useField } from "formik";
import { Form, Message } from "semantic-ui-react";

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  type?: string;
}

function TextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Message error content={meta.error} />
      ) : (
        <></>
      )}
    </Form.Field>
  );
}

export default TextInput;
