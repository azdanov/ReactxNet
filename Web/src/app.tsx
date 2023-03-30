import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";

import api from "./api";
import ActivityDashboard from "./features/activities/dashboard/activity-dashboard";
import Loading from "./layout/loading";
import Navbar from "./layout/navbar";
import { Activity } from "./models/activity";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    api
      .signal(controller)
      .get("/api/activities")
      .json()
      .then((activities) => {
        setActivities(activities as Activity[]);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id === id) ?? null);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(null);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);

    let response: Promise<Activity>;
    if (activity.id) {
      response = api.put(activity, `/api/activities/${activity.id}`).json();
    } else {
      activity.id = crypto.randomUUID();
      response = api.post(activity, "/api/activities").json();
    }

    response
      .then((response) => {
        setActivities((activities) => {
          const index = activities.findIndex((a) => a.id === activity.id);
          const activitiesCopy = [...activities];
          if (index >= 0) {
            activitiesCopy[index] = response;
          } else {
            activitiesCopy.push(response);
          }
          return activitiesCopy;
        });
      })
      .finally(() => {
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);

    api
      .delete(`/api/activities/${id}`)
      .res()
      .then(() => {
        setActivities(activities.filter((a) => a.id !== id));
      })
      .finally(() => {
        setSelectedActivity(null);
        setEditMode(false);
        setSubmitting(false);
      });
  }

  if (loading) {
    return <Loading content="Loading activities..." />;
  }

  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
