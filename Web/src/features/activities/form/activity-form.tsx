import { clsx } from "clsx";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Header, Segment } from "semantic-ui-react";
import * as yup from "yup";

import DateInput from "../../../common/form/date-input";
import SelectInput from "../../../common/form/select-input";
import TextAreaInput from "../../../common/form/text-area-input";
import TextInput from "../../../common/form/text-input";
import Loading from "../../../layout/loading";
import { Activity } from "../../../models/activity";
import { useStore } from "../../../state/store";
import ValidationErrors from "../../errors/validation-errors";

const activitySchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Date is required"),
  city: yup.string().required("City is required"),
  venue: yup.string().required("Venue is required"),
});

function ActivityForm() {
  const { activityStore } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [initialActivity, setInitialActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "" as unknown as Date, // Used only when creating for an empty date
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then((activity) => {
        if (activity) setInitialActivity(activity);
        else console.error(`Activity not found: ${id}`);
      });
    }
  }, [id, activityStore, setInitialActivity]);

  if (activityStore.loadingInitial)
    return <Loading content="Loading activity..." />;

  function handleSubmit(activity: Activity) {
    let submitPromise: Promise<Activity>;
    if (activity.id.length > 0) {
      submitPromise = activityStore.updateActivity(activity);
    } else {
      activity.id = crypto.randomUUID();
      submitPromise = activityStore.createActivity(activity);
    }

    submitPromise
      .then((activity) => {
        navigate(`/activities/${activity.id}`);
      })
      .catch((error) => {
        if (error?.json?.errors) {
          setErrors(error.json.errors);
        }
        toast.error("Failed to save activity");
      });
  }

  return (
    <>
      <Header
        content={
          initialActivity.id.length > 0
            ? "Updating activity"
            : "Creating activity"
        }
        color="blue"
      />
      <Segment clearing>
        <Header content="Activity" sub color="blue" />
        <Formik
          validationSchema={activitySchema}
          enableReinitialize
          initialValues={initialActivity}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched, isValid, isSubmitting, dirty }) => (
            <Form
              className={clsx("ui form", { error: touched && errors })}
              autoComplete="off"
            >
              <TextInput name="title" placeholder="Title" />
              <TextAreaInput
                rows={2}
                placeholder="Description"
                name="description"
              />
              <SelectInput
                options={activityStore.categoryOptions}
                placeholder="Category"
                name="category"
              />
              <DateInput
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                timeFormat="HH:mm"
                dateFormat="EEEE, d MMMM yyyy HH:mm"
              />
              <Header content="Location" sub color="blue" />
              <TextInput label="City" placeholder="City" name="city" />
              <TextInput placeholder="Venue" name="venue" />
              <Button
                floated="right"
                style={{ marginLeft: "1em" }}
                basic
                positive
                type="submit"
                content="Submit"
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting}
              />
              <Button
                as={Link}
                to={id ? `/activities/${id}` : "/activities"}
                basic
                floated="right"
                type="button"
                content="Cancel"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Segment>
      <ValidationErrors errors={errors} />
    </>
  );
}

export default observer(ActivityForm);
