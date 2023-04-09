import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

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
        <Label
          style={{ marginTop: 10 }}
          basic
          color="red"
          pointing
          content={meta.error}
        />
      ) : (
        <></>
      )}
    </Form.Field>
  );
}

export default TextAreaInput;
