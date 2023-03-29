import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";

import client from "./api";
import ActivityDashboard from "./features/activities/dashboard/activity-dashboard";
import Navbar from "./layout/navbar";
import { Activity } from "./models/activity";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    client
      .signal(controller)
      .get("http://localhost:5000/api/activities")
      .then((activities) => {
        setActivities(activities as Activity[]);
      });

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
    if (activity.id) {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
    } else {
      activity.id = crypto.randomUUID();
      setActivities([...activities, activity]);
    }
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities(activities.filter((a) => a.id !== id));
    setSelectedActivity(null);
    setEditMode(false);
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
        />
      </Container>
    </>
  );
}

export default App;
