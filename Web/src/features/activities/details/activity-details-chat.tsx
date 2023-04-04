import { observer } from "mobx-react-lite";
import { Button, Comment, Form, Header, Segment } from "semantic-ui-react";

import userImage from "../../../assets/user.png";

function ActivityDetailsChat() {
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="blue"
        secondary
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={userImage} />
            <Comment.Content>
              <Comment.Author as="a">Bran</Comment.Author>
              <Comment.Metadata>
                <div>Today at 2:41PM</div>
              </Comment.Metadata>
              <Comment.Text>Yay, so interesting!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src={userImage} />
            <Comment.Content>
              <Comment.Author as="a">Andy Willow</Comment.Author>
              <Comment.Metadata>
                <div>2 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Thank you so much! 🤗</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
}

export default observer(ActivityDetailsChat);
