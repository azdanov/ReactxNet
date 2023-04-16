import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

import PhotoUpload from "../../common/photo/photo-upload";
import { Photo } from "../../models/photo";
import { useStore } from "../../stores/store";

function ProfilePhotos() {
  const { profileStore } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  function handlePhotoUpload(file: Blob) {
    profileStore.uploadPhoto(file).finally(() => setAddPhotoMode(false));
  }

  if (!profileStore.profile) return <h2>Problem loading photos...</h2>;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          <Header floated="right">
            <Button
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode((previous) => !previous)}
            />
          </Header>
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUpload
              uploadPhoto={handlePhotoUpload}
              loading={profileStore.uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profileStore.profile.photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <PhotoButtons photo={photo} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

const PhotoButtons = observer(function Buttons({ photo }: { photo: Photo }) {
  const { profileStore } = useStore();
  const [mainLoading, setMainLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <>
      {profileStore.isCurrentUser && (
        <Button.Group fluid widths={2}>
          <Button
            loading={mainLoading}
            basic
            positive
            content="Main"
            style={{ borderTopLeftRadius: 0, borderTop: "none" }}
            onClick={() => {
              setMainLoading(true);
              profileStore
                .setMainPhoto(photo)
                .finally(() => setMainLoading(false));
            }}
            disabled={photo.isMain}
          />
          <Button
            loading={deleteLoading}
            disabled={photo.isMain}
            basic
            icon="trash"
            negative
            style={{ borderTopRightRadius: 0 }}
            onClick={() => {
              setDeleteLoading(true);
              profileStore
                .deletePhoto(photo)
                .finally(() => setDeleteLoading(false));
            }}
          />
        </Button.Group>
      )}
    </>
  );
});

export default observer(ProfilePhotos);
