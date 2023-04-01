import { Button, Container, Header, Image, Menu } from "semantic-ui-react";

import logo from "../assets/logo.png";
import { useStore } from "../stores";

function Navbar() {
  const { activityStore } = useStore();

  return (
    <div style={{ paddingTop: 100 }}>
      <Menu borderless inverted fixed="top">
        <Container>
          <Menu.Item header>
            <Image
              rounded
              src={logo}
              size="mini"
              alt="Surfing logo"
              style={{
                marginRight: "10px",
                backgroundImage:
                  "radial-gradient(circle, #f8fafc 20%, #f8fafc 20%, #4289c1 70%)",
              }}
            />
            <Header inverted as="h1" size="small" style={{ marginTop: 0 }}>
              ReactxNet
            </Header>
          </Menu.Item>
          <Menu.Item name="Activities" />
          <Menu.Item>
            <Button
              basic
              inverted
              content="Create Activity"
              onClick={() => activityStore.openForm()}
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default Navbar;
