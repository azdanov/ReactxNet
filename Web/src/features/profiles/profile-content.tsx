import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";

import ProfileAbout from "./profile-about";
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
