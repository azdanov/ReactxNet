import { capitalize } from "lodash-es";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";

import { Activity } from "../../../models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");
  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    activityId: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(activityId);
  }

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
                    name={activity.id}
                    loading={target == activity.id && submitting}
                    content="Delete"
                    onClick={(event) =>
                      handleActivityDelete(event, activity.id)
                    }
                  />
                  <Button
                    disabled={target == activity.id && submitting}
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
