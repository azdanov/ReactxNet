import { useField } from "formik";
import { Form, Message } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

function TextAreaInput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Message error content={meta.error} />
      ) : (
        <></>
      )}
    </Form.Field>
  );
}

export default TextAreaInput;
