import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import * as Yup from "yup";

import TextAreaInput from "../../common/form/text-area-input";
import TextInput from "../../common/form/text-input";
import { useStore } from "../../stores/store";

function ProfileAbout() {
  const { profileStore } = useStore();
  const [editMode, setEditMode] = useState(false);

  if (!profileStore.profile) return <h2>Problem loading about...</h2>;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header
            floated="left"
            icon="user"
            content={`About ${profileStore.profile.displayName}`}
          />
          {profileStore.isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditMode((previous) => !previous)}
            />
          )}
        </Grid.Column>
        <Grid.Column width="16">
          {editMode ? (
            <Formik
              initialValues={{
                displayName: profileStore.profile.displayName,
                bio: profileStore.profile.bio ?? "",
              }}
              onSubmit={(values) => {
                profileStore.updateProfile(values).then(() => {
                  setEditMode(false);
                });
              }}
              validationSchema={Yup.object({
                displayName: Yup.string().required("Display name is required"),
                bio: Yup.string(),
              })}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className="ui form">
                  <TextInput placeholder="Display name" name="displayName" />
                  <TextAreaInput rows={3} placeholder="Bio" name="bio" />
                  <Button
                    positive
                    type="submit"
                    loading={isSubmitting}
                    content="Update profile"
                    floated="right"
                    disabled={!isValid || !dirty}
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>
              {profileStore.profile.bio}
            </span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileAbout);
