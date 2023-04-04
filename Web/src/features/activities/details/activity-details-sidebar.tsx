import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";

import userImage from "../../../assets/user.png";

function ActivityDetailsSidebar() {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="blue"
      >
        3 People Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Host
            </Label>
            <Image size="tiny" src={userImage} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Anton</Link>
              </Item.Header>
              <Item.Extra style={{ color: "grey" }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="tiny" src={userImage} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Bran</Link>
              </Item.Header>
              <Item.Extra style={{ color: "grey" }}>Following</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="tiny" src={userImage} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Andy</Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </>
  );
}

export default observer(ActivityDetailsSidebar);
