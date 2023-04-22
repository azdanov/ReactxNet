import { observer } from "mobx-react-lite";
import {
  Divider,
  Grid,
  Header,
  Item,
  Segment,
  Statistic,
} from "semantic-ui-react";

import user from "../../assets/user.png";
import { useStore } from "../../stores/store";
import ProfileFollowButton from "./profile-follow-button";

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
            <Statistic
              label="Followers"
              value={profileStore.profile.followersCount}
            />
            <Statistic
              label="Following"
              value={profileStore.profile.followingCount}
            />
          </Statistic.Group>
          <Divider />
          <ProfileFollowButton profile={profileStore.profile} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default observer(ProfileHeader);
