﻿import { truncate } from "lodash-es";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

import user from "../../assets/user.png";
import { ActivityAttendee } from "../../models/activity";

interface Props {
  profile: ActivityAttendee;
}

function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || user} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>
          {truncate(profile.bio, { length: 40 })}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 followers
      </Card.Content>
    </Card>
  );
}

export default observer(ProfileCard);
