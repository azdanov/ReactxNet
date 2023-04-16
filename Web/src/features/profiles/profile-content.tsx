﻿import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";

import { Profile } from "../../models/profile";
import ProfilePhotos from "./profile-photos";

interface Props {
  profile: Profile;
}

function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
    {
      menuItem: "Photos",
      render: () => <ProfilePhotos profile={profile} />,
    },
    {
      menuItem: "Activities",
      render: () => <Tab.Pane>Activities content</Tab.Pane>,
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following content</Tab.Pane>,
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
