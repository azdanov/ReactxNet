import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";

import Loading from "../../../layout/loading";
import { useStore } from "../../../stores/store";
import ActivityFilters from "./activity-filters";
import ActivityList from "./activity-list";

function ActivityDashboard() {
  const { activityStore } = useStore();

  useEffect(() => {
    const controller = new AbortController();
    activityStore.loadActivities(controller).catch(console.error);
    return () => controller.abort();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading activities..." />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
