import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Segment } from "semantic-ui-react";

import Loading from "../../../layout/loading";
import { Activity } from "../../../models/activity";
import { useStore } from "../../../state/store";
import ValidationErrors from "../../errors/validation-errors";

function ActivityForm() {
  const { activityStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<Activity>({} as Activity);

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then((activity) => {
        if (activity) setActivity(activity);
        else console.error(`Activity not found: ${id}`);
      });
    }
  }, [id, activityStore, setActivity]);

  if (activityStore.loadingInitial)
    return <Loading content="Loading activity..." />;

  function handleSubmit() {
    setLoading(true);

    let activityPromise: Promise<Activity>;
    if (activity.id) {
      activityPromise = activityStore.updateActivity(activity);
    } else {
      activity.id = crypto.randomUUID();
      activityPromise = activityStore.createActivity(activity);
    }

    activityPromise
      .then((activity) => {
        navigate(`/activities/${activity.id}`);
      })
      .catch((error) => {
        if (error?.json?.errors) {
          setErrors(error.json.errors);
        }
        toast.error("Validation error");
      })
      .finally(() => setLoading(false));
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <>
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
            as={Link}
            to={id ? `/activities/${id}` : "/activities"}
            basic
            floated="right"
            type="button"
            content="Cancel"
            disabled={loading}
          />
        </Form>
      </Segment>
      <ValidationErrors errors={errors} />
    </>
  );
}

export default observer(ActivityForm);
