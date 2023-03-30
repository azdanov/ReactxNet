import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { Activity } from "../../../models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | null;
  createOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

function ActivityForm({
  closeForm,
  activity: selectedActivity,
  createOrEditActivity,
  submitting,
}: Props) {
  const initialFormState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialFormState);

  function handleSubmit() {
    createOrEditActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          style={{ marginLeft: "1em" }}
          positive
          type="submit"
          content="Submit"
          loading={submitting}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
          disabled={submitting}
        />
      </Form>
    </Segment>
  );
}

export default ActivityForm;
