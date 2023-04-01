import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from "../../../stores";

function ActivityForm() {
  const { activityStore } = useStore();

  const initialFormState = activityStore.selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(initialFormState);

  function handleSubmit() {
    setLoading(true);
    (activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity)
    ).finally(() => setLoading(false));
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
          basic
          positive
          type="submit"
          content="Submit"
          loading={loading}
        />
        <Button
          basic
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => activityStore.closeForm()}
          disabled={loading}
        />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
