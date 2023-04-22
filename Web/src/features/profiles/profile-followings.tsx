import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";

import { FollowersPredicate } from "../../models/profile";
import { useStore } from "../../stores/store";
import ProfileCard from "./profile-card";

function ProfileFollowings({ followers }: { followers?: boolean }) {
  const { profileStore } = useStore();

  useEffect(() => {
    if (followers) {
      profileStore.loadFollowings(FollowersPredicate.Followers);
    } else {
      profileStore.loadFollowings(FollowersPredicate.Following);
    }
  }, [followers, profileStore]);

  return (
    <Tab.Pane loading={profileStore.loadingFollowings}>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={
              followers
                ? `People following ${profileStore.profile!.displayName}`
                : `People ${profileStore.profile?.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width="16">
          <Card.Group itemsPerRow="5">
            {profileStore.followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileFollowings);
