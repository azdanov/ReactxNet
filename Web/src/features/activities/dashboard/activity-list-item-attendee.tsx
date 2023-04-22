import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";

import user from "../../../assets/user.png";
import { ActivityAttendee } from "../../../models/activity";
import ProfileCard from "../../profiles/profile-card";

interface Props {
  attendees: ActivityAttendee[];
}

function ActivityListItemAttendee({ attendees }: Props) {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item as={Link} to={`/profiles/${attendee.username}`}>
              <Image
                size="mini"
                style={
                  attendee.following ? { outline: "2px solid #f2711c" } : {}
                }
                src={attendee.image || user}
                alt="user"
                avatar
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);
