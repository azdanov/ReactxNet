import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import culture from "../../../assets/categories/culture.jpg";
import drinks from "../../../assets/categories/drinks.jpg";
import film from "../../../assets/categories/film.jpg";
import food from "../../../assets/categories/food.jpg";
import music from "../../../assets/categories/music.jpg";
import travel from "../../../assets/categories/travel.jpg";
import Loading from "../../../layout/loading";
import { useStore } from "../../../state/store";
import ActivityDetailsChat from "./activity-details-chat";
import ActivityDetailsHeader from "./activity-details-header";
import ActivityDetailsInfo from "./activity-details-info";
import ActivityDetailsSidebar from "./activity-details-sidebar";

const categories: {
  [key: string]: string;
} = {
  culture,
  drinks,
  film,
  food,
  music,
  travel,
};

function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).catch(console.error);
    }
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
