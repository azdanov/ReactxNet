import { capitalize } from "lodash-es";
import { Button, Item, Label, Segment } from "semantic-ui-react";

import { Activity } from "../../../models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}

function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button.Group floated="right" compact basic>
                  <Button
                    content="Delete"
                    onClick={() => deleteActivity(activity.id)}
                  />
                  <Button
                    content="View"
                    onClick={() => selectActivity(activity.id)}
                  />
                </Button.Group>
                <Label ribbon basic content={capitalize(activity.category)} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default ActivityList;
