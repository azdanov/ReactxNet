import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  options: { key: string; text: string; value: string }[];
  label?: string;
}

function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value}
        onChange={(event, dropdown) => helpers.setValue(dropdown.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
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

export default SelectInput;
