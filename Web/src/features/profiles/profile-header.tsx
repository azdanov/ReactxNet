import { observer } from "mobx-react-lite";
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from "semantic-ui-react";

import user from "../../assets/user.png";
import { useStore } from "../../stores/store";

function ProfileHeader() {
  const { profileStore } = useStore();

  if (!profileStore.profile) return <h2>Problem loading header...</h2>;

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profileStore.profile.image || user}
              />
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profileStore.profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={1} />
            <Statistic label="Following" value={4} />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="blue" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button basic fluid color={"red"} content={"Unfollow"} />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default observer(ProfileHeader);
