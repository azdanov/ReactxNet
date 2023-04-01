import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";

import culture from "../../../assets/categories/culture.jpg";
import drinks from "../../../assets/categories/drinks.jpg";
import film from "../../../assets/categories/film.jpg";
import food from "../../../assets/categories/food.jpg";
import music from "../../../assets/categories/music.jpg";
import travel from "../../../assets/categories/travel.jpg";
import { useStore } from "../../../stores";

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

  const selectedActivity = activityStore.selectedActivity;

  if (!selectedActivity) return null;
  const image = categories[selectedActivity.category];

  return (
    <Card fluid>
      {image && <Image src={image} wrapped ui={false} />}
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2" basic compact>
          <Button
            content="Edit"
            primary
            onClick={() => activityStore.openForm(selectedActivity.id)}
          />
          <Button
            content="Cancel"
            onClick={() => activityStore.cancelSelectedActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
