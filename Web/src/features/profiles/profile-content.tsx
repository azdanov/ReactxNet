import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";

import ProfileAbout from "./profile-about";
import ProfileActivities from "./profile-activities";
import ProfileFollowings from "./profile-followings";
import ProfilePhotos from "./profile-photos";

function ProfileContent() {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    {
      menuItem: "Photos",
      render: () => <ProfilePhotos />,
    },
    {
      menuItem: "Activities",
      render: () => <ProfileActivities />,
    },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings followers />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}

export default observer(ProfileContent);
