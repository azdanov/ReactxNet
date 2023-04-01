import { observer } from "mobx-react-lite";
import { createRef } from "react";
import { Grid, Sticky } from "semantic-ui-react";

import { useStore } from "../../../stores";
import ActivityDetails from "../details/activity-details";
import ActivityForm from "../form/activity-form";
import ActivityList from "./activity-list";

function ActivityDashboard() {
  const { activityStore } = useStore();

  const contextRef = createRef<HTMLElement>();
  const { editMode, selectedActivity } = activityStore;

  return (
    <Grid ref={contextRef}>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <Sticky
          context={contextRef}
          offset={100}
          active={editMode || !!selectedActivity}
        >
          {editMode ? (
            <ActivityForm />
          ) : selectedActivity ? (
            <ActivityDetails />
          ) : null}
        </Sticky>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
