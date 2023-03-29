import { Button, Card, Image } from "semantic-ui-react";

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
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
  return (
    <Card fluid>
      <Image src={categories[activity.category]} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2" basic compact>
          <Button content="Edit" onClick={() => openForm(activity.id)} />
          <Button content="Cancel" onClick={() => cancelSelectActivity()} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
