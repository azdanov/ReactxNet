import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";

import ActivityDashboard from "./features/activities/dashboard/activity-dashboard";
import Loading from "./layout/loading";
import Navbar from "./layout/navbar";
import { useStore } from "./stores";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading content="Loading activities..." />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
