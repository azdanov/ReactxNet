import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import Loading from "../../../layout/loading";
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

  if (activityStore.loadingInitial || !activityStore.selectedActivity) {
    return <Loading content="Loading activity..." />;
  }

  const activity = activityStore.selectedActivity;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
