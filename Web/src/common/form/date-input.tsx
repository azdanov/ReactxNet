import { useField } from "formik";
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Form, Message } from "semantic-ui-react";

interface Props extends Omit<ReactDatePickerProps, "onChange" | "selected"> {
  name: string;
}

function DateInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={field.value && new Date(field.value)}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Message error content={meta.error} />
      ) : (
        <></>
      )}
    </Form.Field>
  );
}

export default DateInput;
