import { observer } from "mobx-react-lite";
import { createRef, useEffect } from "react";
import { Grid, Header, Sticky } from "semantic-ui-react";

import Loading from "../../layout/loading";
import { useStore } from "../../state/store";
import ActivityList from "./activity-list";

function ActivityDashboard() {
  const { activityStore } = useStore();

  const contextRef = createRef<HTMLElement>();

  useEffect(() => {
    activityStore.loadActivities().catch(console.error);
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading activities..." />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6} ref={contextRef}>
        <Sticky context={contextRef} offset={100} active>
          <Header>Activity Filters</Header>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
