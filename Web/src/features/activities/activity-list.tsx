import { capitalize } from "lodash-es";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Label, Popup, Segment } from "semantic-ui-react";

import { Activity } from "../../models/activity";
import { useStore } from "../../state/store";

function ActivityList() {
  const { activityStore } = useStore();

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activitiesByDate.length === 0
          ? "No activities"
          : activityStore.activitiesByDate.map((activity) => (
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
                    <Actions activity={activity} />
                    <Label
                      ribbon
                      basic
                      content={capitalize(activity.category)}
                    />
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
      </Item.Group>
    </Segment>
  );
}

const Actions = observer(function ActivityActions({
  activity,
}: {
  activity: Activity;
}) {
  const { activityStore } = useStore();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    activityId: string
  ) {
    setLoading(true);
    activityStore.deleteActivity(activityId).finally(() => setLoading(false));
  }

  return (
    <Button.Group floated="right" compact basic>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={
          <Button data-id={activity.id} loading={loading} content="Delete" />
        }
        content={
          <>
            <Header>Are you sure you want to delete this activity?</Header>
            <Button.Group fluid compact>
              <Button
                basic
                negative
                content="Yes"
                onClick={(event) => {
                  setOpen(false);
                  handleActivityDelete(event, activity.id);
                }}
              />
              <Button
                basic
                color="grey"
                content="No"
                onClick={() => setOpen(false)}
              />
            </Button.Group>
          </>
        }
        on="click"
        position="top right"
      />
      <Button
        as={Link}
        to={`/activities/${activity.id}`}
        disabled={loading}
        content="View"
      />
    </Button.Group>
  );
});

export default observer(ActivityList);
