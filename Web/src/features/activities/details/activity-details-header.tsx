import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";

import culture from "../../../assets/categories/culture.jpg";
import drinks from "../../../assets/categories/drinks.jpg";
import film from "../../../assets/categories/film.jpg";
import food from "../../../assets/categories/food.jpg";
import music from "../../../assets/categories/music.jpg";
import travel from "../../../assets/categories/travel.jpg";
import { Activity } from "../../../models/activity";
import { useStore } from "../../../stores/store";

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

interface Props {
  activity: Activity;
}

function ActivityDetailsHeader({ activity }: Props) {
  const { activityStore } = useStore();
  const [loading, setLoading] = useState(false);

  const image = categories[activity.category];

  function updateAttendance() {
    setLoading(true);
    activityStore
      .updateAttendance(activity.id)
      .then(() => activityStore.loadActivity(activity.id))
      .finally(() => setLoading(false));
  }

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1, left: -14, top: 20 }}
            color="red"
            ribbon
            content="Cancelled"
          />
        )}
        <Image src={image} fluid />
        <Segment
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            position: "absolute",
            bottom: "5%",
            left: "5%",
            height: "auto",
            color: "white",
            borderRadius: "4px",
          }}
          basic
        >
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date, "dd MMM yyyy")}</p>
                <p>
                  Hosted by{" "}
                  <Link to={`/profiles/${activity.hostUsername}`}>
                    <strong>{activity.host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                activity.isCancelled
                  ? "Re-activate activity"
                  : "Cancel Activity"
              }
              onClick={updateAttendance}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/activities/edit/${activity.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button onClick={updateAttendance} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            onClick={updateAttendance}
            color="blue"
            loading={loading}
            disabled={activity.isCancelled}
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default observer(ActivityDetailsHeader);
