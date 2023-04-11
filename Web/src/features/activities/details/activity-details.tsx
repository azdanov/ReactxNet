import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Loader } from "semantic-ui-react";

import { useStore } from "../../../stores/store";
import ActivityDetailsChat from "./activity-details-chat";
import ActivityDetailsHeader from "./activity-details-header";
import ActivityDetailsInfo from "./activity-details-info";
import ActivityDetailsSidebar from "./activity-details-sidebar";

function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      activityStore.loadActivity(id, controller).catch(console.error);
    }
    return () => controller.abort();
  }, [activityStore, id]);

  return activityStore.loadingInitial || !activityStore.selectedActivity ? (
    <Loader active></Loader>
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activityStore.selectedActivity} />
        <ActivityDetailsInfo activity={activityStore.selectedActivity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar activity={activityStore.selectedActivity} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
