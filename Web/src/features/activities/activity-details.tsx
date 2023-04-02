import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

import culture from "../../assets/categories/culture.jpg";
import drinks from "../../assets/categories/drinks.jpg";
import film from "../../assets/categories/film.jpg";
import food from "../../assets/categories/food.jpg";
import music from "../../assets/categories/music.jpg";
import travel from "../../assets/categories/travel.jpg";
import Loading from "../../layout/loading";
import { useStore } from "../../state/store";

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

  const image = categories[activityStore.selectedActivity.category];

  return (
    <Card fluid>
      {image && <Image src={image} wrapped ui={false} />}
      <Card.Content>
        <Card.Header>{activityStore.selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{activityStore.selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activityStore.selectedActivity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2" basic compact>
          <Button
            as={Link}
            to={`/activities/edit/${activityStore.selectedActivity.id}`}
            content="Edit"
            primary
          />
          <Button as={Link} to="/activities" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
