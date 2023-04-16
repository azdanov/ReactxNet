import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Header,
  Image,
  Menu,
} from "semantic-ui-react";

import logo from "../assets/logo-without-background.png";
import user from "../assets/user.png";
import { useStore } from "../stores/store";

function Navbar() {
  const navigate = useNavigate();
  const { userStore } = useStore();
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
          <Menu.Item position="right">
            <Image
              src={userStore.user?.image || user}
              avatar
              style={{ marginRight: "0.5em" }}
            />
            <Dropdown pointing="top left" text={userStore.user?.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={NavLink}
                  to={`/profiles/${userStore.user?.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item
                  onClick={() =>
                    userStore.logout().then(() => {
                      navigate("/");
                    })
                  }
                  text="Logout"
                  icon="power"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default observer(Navbar);
