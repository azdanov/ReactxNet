import { observer } from "mobx-react-lite";
import React, { MouseEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";

import { ActivityAttendee } from "../../models/activity";
import { Profile } from "../../models/profile";
import { useStore } from "../../stores/store";

interface Props {
  profile: Profile | ActivityAttendee;
}

function ProfileFollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();

  if (userStore.user?.username === profile.username) return <></>;

  function handleFollow(
    event: MouseEvent<HTMLButtonElement>,
    username: string
  ) {
    event.preventDefault();
    profileStore.updateFollowing(username, !profile.following).then();
  }

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="blue"
          content={profile.following ? "Following" : "Not Following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden>
        <Button
          loading={profileStore.loading}
          fluid
          basic
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={(event) => handleFollow(event, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(ProfileFollowButton);
