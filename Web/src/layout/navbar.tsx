import { NavLink } from "react-router-dom";
import { Button, Container, Header, Image, Menu } from "semantic-ui-react";

import logo from "../assets/logo-without-background.png";

function Navbar() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Menu borderless inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" header>
            <Image
              rounded
              src={logo}
              size="mini"
              alt="Surfing logo"
              style={{
                marginRight: "10px",
              }}
            />
            <Header inverted as="h1" size="small" style={{ marginTop: 0 }}>
              ReactxNet
            </Header>
          </Menu.Item>
          <Menu.Item as={NavLink} to="/activities" name="Activities" />
          <Menu.Item as={NavLink} to="/errors" name="Errors" />
          <Menu.Item>
            <Button
              as={NavLink}
              to="/activities/create"
              basic
              inverted
              content="Create Activity"
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default Navbar;
