import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Image, Tab, TabProps } from "semantic-ui-react";

import culture from "../../assets/categories/culture.jpg";
import drinks from "../../assets/categories/drinks.jpg";
import film from "../../assets/categories/film.jpg";
import food from "../../assets/categories/food.jpg";
import music from "../../assets/categories/music.jpg";
import travel from "../../assets/categories/travel.jpg";
import { UserActivity } from "../../models/profile";
import { useStore } from "../../stores/store";

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

const panes = [
  { menuItem: "Future Activities", pane: { key: "future" } },
  { menuItem: "Past Activities", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];

function ProfileActivities() {
  const { profileStore } = useStore();

  useEffect(() => {
    profileStore
      .loadUserActivities(profileStore.profile!.username, panes[0].pane.key)
      .then();
  }, [profileStore]);

  const handleTabChange = (
    event: MouseEvent<HTMLDivElement>,
    data: TabProps
  ) => {
    profileStore
      .loadUserActivities(
        profileStore.profile!.username,
        panes[data.activeIndex as number].pane.key
      )
      .then();
  };

  return (
    <Tab.Pane loading={profileStore.loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(event, data) => handleTabChange(event, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {profileStore.userActivities.map((activity: UserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={categories[activity.category]}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date), "do LLL")}</div>
                    <div>{format(new Date(activity.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileActivities);
