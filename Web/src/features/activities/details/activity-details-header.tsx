import { observer } from "mobx-react-lite";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";

import culture from "../../../assets/categories/culture.jpg";
import drinks from "../../../assets/categories/drinks.jpg";
import film from "../../../assets/categories/film.jpg";
import food from "../../../assets/categories/food.jpg";
import music from "../../../assets/categories/music.jpg";
import travel from "../../../assets/categories/travel.jpg";
import { Activity } from "../../../models/activity";

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
  const image = categories[activity.category];

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
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
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Anton</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="blue">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default observer(ActivityDetailsHeader);
