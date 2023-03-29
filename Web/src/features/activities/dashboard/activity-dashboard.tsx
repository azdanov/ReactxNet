import { createRef } from "react";
import { Grid, Sticky } from "semantic-ui-react";

import { Activity } from "../../../models/activity";
import ActivityDetails from "../details/activity-details";
import ActivityForm from "../form/activity-form";
import ActivityList from "./activity-list";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | null;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEditActivity,
  deleteActivity,
}: Props) {
  const contextRef = createRef<HTMLElement>();

  return (
    <Grid ref={contextRef}>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Sticky
          context={contextRef}
          offset={100}
          active={editMode || !!selectedActivity}
        >
          {editMode ? (
            <ActivityForm
              closeForm={closeForm}
              activity={selectedActivity}
              createOrEditActivity={createOrEditActivity}
            />
          ) : (
            selectedActivity && (
              <ActivityDetails
                activity={selectedActivity}
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
              />
            )
          )}
        </Sticky>
      </Grid.Column>
    </Grid>
  );
}

export default ActivityDashboard;
