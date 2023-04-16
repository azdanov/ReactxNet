import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import Loading from "../../layout/loading";
import { useStore } from "../../stores/store";
import ProfileContent from "./profile-content";
import ProfileHeader from "./profile-header";

function ProfilePage() {
  const { username } = useParams();
  const { profileStore } = useStore();

  useEffect(() => {
    if (username) profileStore.loadProfile(username).then();
  }, [profileStore, username]);

  if (profileStore.loadingProfile) return <Loading />;

  if (!profileStore.profile) return <h2>Problem loading profile...</h2>;

  return (
    <Grid>
      <Grid.Column width="16">
        <ProfileHeader />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ProfilePage);
