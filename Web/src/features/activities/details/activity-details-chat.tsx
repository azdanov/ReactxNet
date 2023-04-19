import { formatDistanceToNow } from "date-fns";
import { Field, FieldProps, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Comment,
  Form,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react";
import * as Yup from "yup";

import user from "../../../assets/user.png";
import { useStore } from "../../../stores/store";

interface Props {
  activityId: string;
}

function ActivityDetailsChat({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.stopHubConnection();
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required("Comment is required"),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Enter your comment (Enter to submit, Shift + Enter for new line)"
                      rows={2}
                      {...props.field}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          if (event.shiftKey) {
                            return;
                          } else {
                            event.preventDefault();
                            isValid && handleSubmit();
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
              <Button
                style={{ marginTop: 10, zIndex: 1 }}
                floated="right"
                type="submit"
                onClick={() => isValid && handleSubmit()}
                content="Add Reply"
                labelPosition="right"
                icon="edit"
                primary
              />
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || user} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
}

export default observer(ActivityDetailsChat);
